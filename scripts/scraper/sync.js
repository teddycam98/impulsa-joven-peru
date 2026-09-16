/**
 * Synchronization module for scraped data.
 * Dual-syncs to Supabase DB and local opportunitiesDetailData.js.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

import crypto from 'crypto';

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

  console.log(`\n📦 [Sync] Procesando ${newItems.length} convocatorias scrapeadas...`);

  // 1. Sync with Supabase (if keys present)
  let supabaseSynced = 0;
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://oiupevzywptrvuekjuea.supabase.co';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';

  if (supabaseUrl && supabaseKey) {
    try {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const rows = newItems.map(item => ({
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

      const { data, error } = await supabase
        .from('opportunities')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        console.warn('⚠️ [Supabase Upsert Warning]:', error.message);
      } else {
        supabaseSynced = rows.length;
        console.log(`✅ [Supabase] Sincronizadas ${supabaseSynced} convocatorias exitosamente en la base de datos.`);
      }
    } catch (sbErr) {
      console.warn('⚠️ [Supabase Connection Notice]:', sbErr.message);
    }
  }

  // 2. Sync with local src/data/opportunitiesDetailData.js
  let localSynced = 0;
  const dataFilePath = path.join(rootDir, 'src', 'data', 'opportunitiesDetailData.js');

  try {
    const { opportunitiesDetailData: existingData } = await import('../../src/data/opportunitiesDetailData.js');
    const existingMap = new Map(existingData.map(item => [item.id, item]));

    for (const item of newItems) {
      existingMap.set(item.id, { ...existingMap.get(item.id), ...item });
    }

    const mergedList = Array.from(existingMap.values());
    const fileContent = `export const opportunitiesDetailData = ${JSON.stringify(mergedList, null, 2)};\n`;

    fs.writeFileSync(dataFilePath, fileContent, 'utf-8');
    localSynced = newItems.length;
    console.log(`✅ [Local Data] Actualizado src/data/opportunitiesDetailData.js con ${mergedList.length} convocatorias totales.`);
  } catch (fsErr) {
    console.error('❌ [Local File Error]:', fsErr.message);
  }

  return { supabaseSynced, localSynced };
}
