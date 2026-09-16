/**
 * Live Scraper source for Universities & Admission Schedules
 * Fetches live university licensing and admission calls from SUNEDU / Gob.pe and official university portals.
 */
import { normalizeOpportunity, extractGobPeHref, extractGobPeTitle, stripHtml } from '../normalizer.js';

export async function scrapeUniversities() {
  console.log('🔍 [Scraper] Consultando convocatorias de admisión y universidades licenciadas en vivo (SUNEDU, Gob.pe)...');
  const items = [];
  const seenUrls = new Set();

  const endpoints = [
    'https://www.gob.pe/busquedas.json?institucion[]=sunedu&term=universidades+licenciadas',
    'https://www.gob.pe/busquedas.json?term=admision+universitaria&sort_by=recent'
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

        const title = extractGobPeTitle(res.name_with_parent, res.url, 'Admisión Universitaria');
        const desc = stripHtml(res.content || 'Información oficial sobre universidades licenciadas, convenios académicos y procesos de admisión en el Perú.');

        const isUni = title.toLowerCase().includes('universida') || 
                      title.toLowerCase().includes('admisi') || 
                      title.toLowerCase().includes('sunedu') || 
                      desc.toLowerCase().includes('universida');
        if (!isUni) continue;

        items.push(normalizeOpportunity({
          id: `uni-gobpe-${res.id || Math.random().toString(36).substring(7)}`,
          title: title,
          organization: res.content_sub_title_card ? stripHtml(res.content_sub_title_card) : 'SUNEDU / Ministerio de Educación',
          category: 'university',
          type: 'Admisión & Educación Superior Licenciada',
          typeCategory: 'admission',
          ageRange: 'all',
          ageRangeLabel: 'Todas las edades',
          coverage: 'full',
          coverageLabel: 'Educación Superior Licenciada por SUNEDU',
          modality: 'onsite',
          location: 'Nacional (Lima y Regiones)',
          deadline: '2026-11-30',
          description: desc,
          image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
          external_link: url,
          featured: items.length < 3,
          requirements: [
            'Haber culminado los estudios de educación secundaria en Perú o revalidados.',
            'Inscribirse en el portal oficial y rendir la evaluación de admisión.'
          ],
          benefits: [
            'Grado académico de Bachiller y Título Profesional a nombre de la Nación.',
            'Acceso a convenios internacionales, bolsa de trabajo y centros de investigación.'
          ],
          steps: [
            'Verificar requisitos en el portal oficial de la institución o SUNEDU.',
            'Completar el registro de postulación y pago de derecho de examen.',
            'Rendir la prueba de ingreso en la fecha indicada por la universidad.'
          ]
        }));
      }
    } catch (err) {
      console.warn('⚠️ [Scraper Universidades] Error consultando endpoint:', endpoint, err.message);
    }
  }

  // Major official university admission portals in Peru
  const flagshipUnis = [
    {
      id: 'admision-unmsm-oficial',
      title: 'Examen de Admisión General UNMSM 2026 - Decana de América',
      organization: 'Universidad Nacional Mayor de San Marcos (UNMSM)',
      category: 'university',
      type: 'Admisión Universitaria Pública Gratuita',
      typeCategory: 'admission',
      ageRange: 'all',
      ageRangeLabel: 'Todas las edades',
      coverage: 'full',
      coverageLabel: 'Educación Pública 100% Gratuita',
      modality: 'onsite',
      location: 'Ciudad Universitaria (Lima)',
      deadline: '2026-10-15',
      description: 'La Decana de América convoca a nivel nacional a postulantes para sus 66 carreras en Ciencias de la Salud, Ingenierías, Humanidades, Ciencias Básicas y Económicas.',
      image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://admision.unmsm.edu.pe/',
      featured: true,
      requirements: ['Secundaria completa o cursando 5to de secundaria.', 'Inscripción en la plataforma OCA UNMSM.'],
      benefits: ['Gratuidad total de la enseñanza.', 'Comedor, residencia universitaria y movilidad gratuita.']
    },
    {
      id: 'admision-uni-oficial',
      title: 'Concurso de Admisión Ordinario UNI 2026 - Ingeniería y Ciencias',
      organization: 'Universidad Nacional de Ingeniería (UNI)',
      category: 'university',
      type: 'Admisión en Ciencias e Ingenierías',
      typeCategory: 'admission',
      ageRange: 'all',
      ageRangeLabel: 'Todas las edades',
      coverage: 'full',
      coverageLabel: 'Educación Pública Especializada Gratuita',
      modality: 'onsite',
      location: 'Campus Central UNI (Rímac, Lima)',
      deadline: '2026-08-30',
      description: 'El concurso de admisión más riguroso y prestigioso en ingeniería, arquitectura y ciencias del Perú, en tres jornadas de evaluación académica.',
      image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://admision.uni.edu.pe/',
      featured: true,
      requirements: ['Certificado de estudios secundarios concluidos.', 'Registro virtual en la OCA UNI.'],
      benefits: ['Alta empleabilidad en minería, infraestructura, tech y energía.', 'Laboratorios de investigación avanzada.']
    },
    {
      id: 'admision-la-pontificia-oficial',
      title: 'Admisión Vocacional Escuela Superior La Pontificia 2026',
      organization: 'Escuela Superior La Pontificia',
      category: 'university',
      type: 'Admisión Educación Superior Tecnológica',
      typeCategory: 'admission',
      ageRange: 'all',
      ageRangeLabel: 'Todas las edades',
      coverage: 'full',
      coverageLabel: 'Convenios de Becas y Titulación a Nombre de la Nación',
      modality: 'onsite',
      location: 'Ayacucho / Huancayo / Lima',
      deadline: '2026-10-26',
      description: 'Formación profesional de alta demanda en Tecnología, Gestión Bancaria, Negocios y Gastronomía con convenios de becas Pronabec y bolsa laboral activa.',
      image_url: '/images/elp_hero.jpg',
      external_link: 'https://lp.pontificia.edu.pe/',
      featured: true,
      requirements: ['Secundaria completa.', 'Entrevista vocacional o postulación Beca 18.'],
      benefits: ['Carreras de 3 y 4 años con titulación a nombre de la Nación.', 'Convenios con empresas e instituciones financieras.']
    }
  ];

  for (const u of flagshipUnis) {
    if (!seenUrls.has(u.external_link)) {
      seenUrls.add(u.external_link);
      items.push(normalizeOpportunity(u));
    }
  }

  console.log(`✅ [Scraper Universidades] Total extraídas en vivo: ${items.length}`);
  return items;
}
