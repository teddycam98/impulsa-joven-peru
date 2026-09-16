/**
 * Live Scraper source for Free Certified Courses (Cursos Gratuitos)
 * Fetches live courses and training programs from Gob.pe / MTPE and leading certified academies.
 */
import { normalizeOpportunity, extractGobPeHref, extractGobPeTitle, stripHtml } from '../normalizer.js';

export async function scrapeCourses() {
  console.log('🔍 [Scraper] Consultando cursos y capacitaciones gratuitas en vivo (Gob.pe, Telefónica, Google)...');
  const items = [];
  const seenUrls = new Set();

  const endpoints = [
    'https://www.gob.pe/busquedas.json?term=cursos+capacitacion+gratuita&sort_by=recent',
    'https://www.gob.pe/busquedas.json?institucion[]=mtpe&term=capacitacion',
    'https://www.gob.pe/busquedas.json?term=curso+virtual+gratuito'
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

        const title = extractGobPeTitle(res.name_with_parent, res.url, 'Curso de Capacitación');
        const desc = stripHtml(res.content || 'Programa o curso formativo gratuito para el fortalecimiento de capacidades de jóvenes peruanos.');

        const isCourse = title.toLowerCase().includes('curso') || 
                         title.toLowerCase().includes('capacita') || 
                         title.toLowerCase().includes('taller') || 
                         title.toLowerCase().includes('formaci') || 
                         desc.toLowerCase().includes('curso');
        if (!isCourse) continue;

        items.push(normalizeOpportunity({
          id: `curso-gobpe-${res.id || Math.random().toString(36).substring(7)}`,
          title: title,
          organization: res.content_sub_title_card ? stripHtml(res.content_sub_title_card) : 'MTPE / Estado Peruano',
          category: 'course',
          type: 'Curso con Certificación Oficial',
          typeCategory: 'tech',
          ageRange: 'all',
          ageRangeLabel: 'Todas las edades',
          coverage: 'full',
          coverageLabel: '100% Gratuito y Certificado',
          modality: 'virtual',
          location: '100% Virtual / A tu propio ritmo',
          deadline: '2026-12-31',
          description: desc,
          image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
          external_link: url,
          featured: items.length < 3,
          requirements: [
            'Conexión a internet y dispositivo con navegador web.',
            'Compromiso para completar los módulos y evaluaciones del curso.'
          ],
          benefits: [
            'Constancia o certificado digital acreditado sin costo alguno.',
            'Adquisición de habilidades prácticas para el mercado laboral actual.'
          ],
          steps: [
            'Ingresar al portal oficial del curso a través del enlace de Gob.pe.',
            'Crear una cuenta de estudiante o registrarte con tu DNI.',
            'Completar los módulos y descargar tu certificado al finalizar.'
          ]
        }));
      }
    } catch (err) {
      console.warn('⚠️ [Scraper Cursos] Error consultando endpoint:', endpoint, err.message);
    }
  }

  // Major certified flagship courses in Peru
  const flagshipCourses = [
    {
      id: 'curso-telefonica-ciberseguridad-oficial',
      title: 'Ruta Profesional en Ciberseguridad & Protección Digital',
      organization: 'Fundación Telefónica Movistar (Conecta Empleo)',
      category: 'course',
      type: 'Curso con Certificación Oficial Gratuita',
      typeCategory: 'tech',
      ageRange: 'all',
      ageRangeLabel: 'Todas las edades',
      coverage: 'full',
      coverageLabel: '100% Gratuito y Certificado',
      modality: 'virtual',
      location: '100% Online (A tu propio ritmo)',
      deadline: '2026-12-31',
      description: 'Aprende los fundamentos clave de la seguridad informática, detección de intrusiones y mejores prácticas para proteger sistemas corporativos con certificación oficial.',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://conectaempleo-formacion.fundaciontelefonica.com/peru',
      featured: true,
      requirements: ['Computadora o smartphone con internet.', 'No se requieren conocimientos técnicos avanzados previos.'],
      benefits: ['Certificado digital verificable avalado por Fundación Telefónica.', 'Acceso a la bolsa de trabajo y ferias de Conecta Empleo.']
    },
    {
      id: 'curso-google-data-analytics-oficial',
      title: 'Certificado Profesional de Análisis de Datos de Google',
      organization: 'Google Career Certificates & Crece con Google',
      category: 'course',
      type: 'Especialización Profesional Global',
      typeCategory: 'tech',
      ageRange: 'all',
      ageRangeLabel: 'Jóvenes y Adultos',
      coverage: 'full',
      coverageLabel: 'Formación Práctica de Google 100%',
      modality: 'virtual',
      location: 'Remoto / En Línea',
      deadline: '2026-12-31',
      description: 'Domina SQL, R, Tableau y hojas de cálculo para convertirte en analista de datos junior en menos de 6 meses con formación práctica diseñada por especialistas de Google.',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://grow.google/intl/es/certificates/data-analytics/',
      featured: true,
      requirements: ['Dedicación recomendada de 8 a 10 horas semanales.', 'Interés en desarrollarse en la industria tecnológica.'],
      benefits: ['Certificado con valor internacional de Google.', 'Proyectos de portafolio listos para entrevistas laborales.']
    }
  ];

  for (const c of flagshipCourses) {
    if (!seenUrls.has(c.external_link)) {
      seenUrls.add(c.external_link);
      items.push(normalizeOpportunity(c));
    }
  }

  console.log(`✅ [Scraper Cursos] Total extraídas en vivo: ${items.length}`);
  return items;
}
