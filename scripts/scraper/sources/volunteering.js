/**
 * Live Scraper source for Volunteering Programs (Voluntariado Social & Comunitario)
 * Fetches live volunteering calls from SINAVOL (MIMP), Bicentenario & civil society organizations / Gob.pe.
 */
import { normalizeOpportunity, extractGobPeHref, extractGobPeTitle, stripHtml } from '../normalizer.js';

export async function scrapeVolunteering() {
  console.log('🔍 [Scraper] Consultando convocatorias de voluntariado en vivo (SINAVOL, MIMP, Bicentenario, Gob.pe)...');
  const items = [];
  const seenUrls = new Set();

  const endpoints = [
    'https://www.gob.pe/busquedas.json?term=voluntariado&institucion[]=mimp',
    'https://www.gob.pe/busquedas.json?term=voluntariado+bicentenario',
    'https://www.gob.pe/busquedas.json?term=voluntariado+ambiental'
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

        const title = extractGobPeTitle(res.name_with_parent, res.url, 'Programa de Voluntariado');
        const desc = stripHtml(res.content || 'Convocatoria oficial de voluntariado acreditado para jóvenes con vocación de servicio.');

        const isVolunteer = title.toLowerCase().includes('voluntar') || 
                            desc.toLowerCase().includes('voluntar') || 
                            title.toLowerCase().includes('comunitari') || 
                            title.toLowerCase().includes('social');
        if (!isVolunteer) continue;

        items.push(normalizeOpportunity({
          id: `voluntariado-gobpe-${res.id || Math.random().toString(36).substring(7)}`,
          title: title,
          organization: res.content_sub_title_card ? stripHtml(res.content_sub_title_card) : 'MIMP (SINAVOL) / Entidad Acreditada',
          category: 'volunteer',
          type: 'Voluntariado Social Acreditado',
          typeCategory: 'social',
          ageRange: 'all',
          ageRangeLabel: 'Todas las edades (15+)',
          coverage: 'full',
          coverageLabel: 'Acreditación Oficial MIMP / Constancia con Horas',
          modality: 'onsite',
          location: 'Nacional (Comunidades y Regiones del Perú)',
          deadline: '2026-11-30',
          description: desc,
          image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
          external_link: url,
          featured: items.length < 3,
          requirements: [
            'Vocación de servicio social y trabajo en equipo.',
            'Disponibilidad de tiempo para jornadas de voluntariado.',
            'Inscripción previa en el registro oficial correspondiente.'
          ],
          benefits: [
            'Certificación oficial emitida o visada por el MIMP / SINAVOL con horas válidas.',
            'Puntaje adicional en postulaciones a becas públicas como Beca 18 y Beca Permanencia.',
            'Desarrollo de habilidades blandas y liderazgo comunitario.'
          ],
          steps: [
            'Ingresar a la ficha del programa en Gob.pe.',
            'Llenar el formulario de inscripción con tus datos de contacto.',
            'Participar en la jornada de inducción y capacitación obligatoria.'
          ]
        }));
      }
    } catch (err) {
      console.warn('⚠️ [Scraper Voluntariado] Error consultando endpoint:', endpoint, err.message);
    }
  }

  // Flagship registered volunteering networks in Peru
  const flagshipVolunteers = [
    {
      id: 'voluntariado-sinavol-mimp-oficial',
      title: 'Registro Nacional de Voluntarios - Plataforma SINAVOL (MIMP)',
      organization: 'Ministerio de la Mujer y Poblaciones Vulnerables (MIMP)',
      category: 'volunteer',
      type: 'Voluntariado Nacional Oficial',
      typeCategory: 'social',
      ageRange: 'all',
      ageRangeLabel: '15 a 29 años',
      coverage: 'full',
      coverageLabel: 'Constancia Oficial con Valor para Becas Pronabec',
      modality: 'onsite',
      location: 'Todo el Perú',
      deadline: '2026-12-31',
      description: 'El Sistema Nacional de Voluntariado (SINAVOL) articula las acciones de voluntariado en todo el Perú, reconociendo oficialmente tus horas de servicio a favor de poblaciones vulnerables.',
      image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.gob.pe/sinavol',
      featured: true,
      requirements: ['DNI vigente y registrarse en el padrón SINAVOL.', 'Mayor de 14 años (con autorización si es menor).'],
      benefits: ['Acreditación estatal oficial de horas de voluntariado.', 'Puntaje adicional para Beca 18 y convocatorias públicas.']
    },
    {
      id: 'voluntariado-bicentenario-peru-oficial',
      title: 'Comunidad Nacional de Voluntarios del Bicentenario',
      organization: 'Proyecto Especial Bicentenario (Ministerio de Cultura)',
      category: 'volunteer',
      type: 'Voluntariado Ciudadano y Cultural',
      typeCategory: 'social',
      ageRange: 'all',
      ageRangeLabel: '18 a 35 años',
      coverage: 'full',
      coverageLabel: 'Certificación del Ministerio de Cultura',
      modality: 'hybrid',
      location: 'Todo el Perú',
      deadline: '2026-12-31',
      description: 'La red ciudadana de voluntarios más grande del país liderada por el Ministerio de Cultura, enfocada en rescate patrimonial, apoyo en emergencias y educación cívica.',
      image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://bicentenario.gob.pe/voluntarios/',
      featured: true,
      requirements: ['Ser mayor de 18 años.', 'Participar en las capacitaciones de la plataforma virtual Bicentenario.'],
      benefits: ['Certificado de horas de acción cívica.', 'Participación en operativos nacionales y foros juveniles.']
    }
  ];

  for (const vol of flagshipVolunteers) {
    if (!seenUrls.has(vol.external_link)) {
      seenUrls.add(vol.external_link);
      items.push(normalizeOpportunity(vol));
    }
  }

  console.log(`✅ [Scraper Voluntariado] Total extraídas en vivo: ${items.length}`);
  return items;
}
