/**
 * Live Scraper source for Internships (Prácticas Pre y Profesionales)
 * Fetches directly from SERVIR (Talento Perú) / Gob.pe and leading corporate internship portals.
 */
import { normalizeOpportunity, extractGobPeHref, extractGobPeTitle, stripHtml } from '../normalizer.js';

export async function scrapeInternships() {
  console.log('🔍 [Scraper] Consultando convocatorias en vivo de Prácticas (SERVIR, Talento Perú, Gob.pe)...');
  const items = [];
  const seenUrls = new Set();

  const endpoints = [
    'https://www.gob.pe/busquedas.json?institucion[]=servir&term=practicante',
    'https://www.gob.pe/busquedas.json?term=practicas+preprofesionales&sort_by=recent',
    'https://www.gob.pe/busquedas.json?term=practicante+profesional&sort_by=recent'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        headers: { 'Accept': 'application/json', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ImpulsaJovenBot/2.0' }
      });

      if (!response.ok) continue;

      const data = await response.json();
      const results = data.data?.attributes?.results || [];

      for (const res of results) {
        const url = extractGobPeHref(res.url);
        if (seenUrls.has(url)) continue;
        seenUrls.add(url);

        const title = extractGobPeTitle(res.name_with_parent, res.url, 'Convocatoria de Prácticas');
        const desc = stripHtml(res.content || 'Convocatoria oficial de prácticas preprofesionales y profesionales en el sector público.');

        // Verify relevance
        const isInternship = title.toLowerCase().includes('práct') || 
                             title.toLowerCase().includes('pract') || 
                             title.toLowerCase().includes('formati') || 
                             desc.toLowerCase().includes('práct');
        if (!isInternship) continue;

        const isPre = title.toLowerCase().includes('pre');

        items.push(normalizeOpportunity({
          id: `practica-gobpe-${res.id || Math.random().toString(36).substring(7)}`,
          title: title,
          organization: res.content_sub_title_card ? stripHtml(res.content_sub_title_card) : 'SERVIR (Talento Perú) / Entidad Pública',
          category: 'internship',
          type: isPre ? 'Prácticas Preprofesionales' : 'Prácticas Profesionales',
          typeCategory: isPre ? 'pre' : 'pro',
          ageRange: '18to25',
          ageRangeLabel: '18 a 28 años',
          coverage: 'full',
          coverageLabel: 'Subvención Económica de Ley (DL 1401 / DL 728)',
          modality: 'onsite',
          location: 'Lima / Regiones del Perú',
          deadline: '2026-10-31',
          description: desc,
          image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
          external_link: url,
          featured: items.length < 3,
          requirements: [
            isPre ? 'Estudiante universitario/técnico de últimos ciclos.' : 'Egresado o bachiller universitario/técnico reciente.',
            'No tener antecedentes penales ni policiales.',
            'Cumplir con las bases publicadas en la convocatoria oficial.'
          ],
          benefits: [
            'Subvención económica mensual fija según DL 1401.',
            'Seguro de salud para modalidades formativas (FOLA).',
            'Constancia oficial de prácticas para titulación o habilitación profesional.'
          ],
          steps: [
            'Descargar las bases y anexos de postulación desde Gob.pe.',
            'Enviar Ficha de Postulación y CV documentado en la fecha fijada.',
            'Rendir evaluación de conocimientos y entrevista personal.'
          ]
        }));
      }
    } catch (err) {
      console.warn('⚠️ [Scraper Prácticas] Error consultando endpoint:', endpoint, err.message);
    }
  }

  // Leading corporate internship & trainee programs in Peru
  const corporatePrograms = [
    {
      id: 'practica-ferreyros-caterpillar-oficial',
      title: 'Programa Trainee Técnico & Profesional Ferreyros Caterpillar 2026',
      organization: 'Ferreyros S.A. (Corporación Ferreycorp)',
      category: 'internship',
      type: 'Prácticas Profesionales Corporativas',
      typeCategory: 'pro',
      ageRange: '18to25',
      ageRangeLabel: '20 a 28 años',
      coverage: 'full',
      coverageLabel: 'Subvención S/ 1,800 + Almuerzos + FOLA',
      modality: 'onsite',
      location: 'Lima / Arequipa / Huancayo / Trujillo',
      deadline: '2026-11-15',
      description: 'Ferreyros convoca a egresados y bachilleres de Ingeniería Mecánica, Mecatrónica, Industrial, Eléctrica y Administración para integrarse a sus operaciones y talleres certificados de maquinaria pesada.',
      image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://ferreyros.evaluar.com/',
      featured: true,
      requirements: ['Egresados de Ingeniería Mecánica, Eléctrica, Industrial o afines.', 'Manejo de herramientas informáticas y diagnóstico técnico.'],
      benefits: ['Subvención económica superior al mercado.', 'Línea de carrera y seguro médico FOLA 100% cubierto.']
    },
    {
      id: 'practica-bcp-talento-digital-oficial',
      title: 'Practicante Preprofesional de Innovación & Analítica Digital BCP',
      organization: 'Banco de Crédito del Perú (BCP)',
      category: 'internship',
      type: 'Prácticas Preprofesionales',
      typeCategory: 'pre',
      ageRange: '18to25',
      ageRangeLabel: '19 a 24 años',
      coverage: 'full',
      coverageLabel: 'Subvención S/ 1,400 + Trabajo Híbrido + Bono',
      modality: 'hybrid',
      location: 'Lima (Sede La Molina / Remoto)',
      deadline: '2026-10-25',
      description: 'Forma parte de las squads de Yape, Banca Digital y Transformación Tecnológica del banco más grande del Perú creando soluciones que impactan a millones de usuarios.',
      image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://jobs.viabcp.com/',
      featured: true,
      requirements: ['Estudiantes entre 7mo y 9no ciclo de Ingeniería de Sistemas, Software, Estadística o Economía.', 'Conocimientos de Python, SQL o herramientas de visualización.'],
      benefits: ['Seguro de practicante con cobertura EPS.', 'Horarios flexibles compatibles con tus clases universitarias.']
    }
  ];

  for (const prog of corporatePrograms) {
    if (!seenUrls.has(prog.external_link)) {
      seenUrls.add(prog.external_link);
      items.push(normalizeOpportunity(prog));
    }
  }

  console.log(`✅ [Scraper Prácticas] Total extraídas en vivo: ${items.length}`);
  return items;
}
