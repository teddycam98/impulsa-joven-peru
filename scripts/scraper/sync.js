/**
 * Synchronization module for scraped data.
 * Dual-syncs to Supabase DB and local opportunitiesDetailData.js.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

export function stringToUuid(str) {
  const hash = crypto.createHash('sha256').update(str).digest('hex');
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    '4' + hash.substring(13, 16),
    ((parseInt(hash.substring(16, 18), 16) & 0x3f) | 0x80).toString(16) + hash.substring(18, 20),
    hash.substring(20, 32)
  ].join('-');
}

export async function syncOpportunities(newItems = []) {
  if (!newItems || newItems.length === 0) {
    console.log('ℹ️ [Sync] No hay nuevas convocatorias para sincronizar.');
    return { supabaseSynced: 0, localSynced: 0 };
  }

  // Deduplicate by URL and ID
  const uniqueMap = new Map();
  for (const item of newItems) {
    const key = (item.external_link && item.external_link.length > 5) ? item.external_link.toLowerCase() : item.id;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  }
  const cleanList = Array.from(uniqueMap.values());

  console.log(`\n📦 [Sync] Procesando ${cleanList.length} convocatorias únicas extraídas en vivo por el scraper...`);

  // 1. Sync with Supabase in batches
  let supabaseSynced = 0;
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://oiupevzywptrvuekjuea.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const rows = cleanList.map(item => ({
        id: stringToUuid(item.id),
        title: item.title,
        description: item.description,
        category: item.category,
        organization: item.organization,
        image_url: item.image_url,
        external_link: item.external_link,
        location: item.location,
        deadline: item.deadline,
        featured: item.featured,
        status: item.status,
        created_at: item.created_at
      }));

      // Upsert in batches of 40 to ensure reliability
      const batchSize = 40;
      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const { error } = await supabase
          .from('opportunities')
          .upsert(batch, { onConflict: 'id' });

        if (error) {
          console.warn(`⚠️ [Supabase Upsert Warning Batch ${Math.floor(i / batchSize) + 1}]:`, error.message);
        } else {
          supabaseSynced += batch.length;
        }
      }
      console.log(`✅ [Supabase] Sincronizadas ${supabaseSynced} convocatorias reales exitosamente en la base de datos.`);
    } catch (sbErr) {
      console.warn('⚠️ [Supabase Connection Notice]:', sbErr.message);
    }
  }

  // 2. Overwrite local src/data/opportunitiesDetailData.js purely with scraped live data
  let localSynced = 0;
  const dataFilePath = path.join(rootDir, 'src', 'data', 'opportunitiesDetailData.js');

  try {
    const fileContent = `// Archivo generado automáticamente por el Motor de Scraping Multi-Categoría\n// Todas las fuentes provienen de convocatorias reales (Gob.pe, Pronabec, SERVIR, MTPE, ProInnóvate, MIMP, SUNEDU)\nexport const opportunitiesDetailData = ${JSON.stringify(cleanList, null, 2)};\n`;

    fs.writeFileSync(dataFilePath, fileContent, 'utf-8');
    localSynced = cleanList.length;
    console.log(`✅ [Local Data] Actualizado src/data/opportunitiesDetailData.js con ${localSynced} convocatorias 100% reales procedentes del scraper.`);
  } catch (fsErr) {
    console.error('❌ [Local File Error]:', fsErr.message);
  }

  return { supabaseSynced, localSynced };
}
