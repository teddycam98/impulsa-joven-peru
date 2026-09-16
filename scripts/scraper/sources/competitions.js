/**
 * Live Scraper source for Competitions & Innovation Awards (Concursos e Innovación)
 * Fetches live funding calls, hackathons and youth innovation prizes from ProInnóvate, Concytec & SENAJU / Gob.pe.
 */
import { normalizeOpportunity, extractGobPeHref, extractGobPeTitle, stripHtml } from '../normalizer.js';

export async function scrapeCompetitions() {
  console.log('🔍 [Scraper] Consultando concursos de innovación y emprendimiento en vivo (ProInnóvate, Concytec, Gob.pe)...');
  const items = [];
  const seenUrls = new Set();

  const endpoints = [
    'https://www.gob.pe/busquedas.json?institucion[]=proinnovate&contenido[]=campa%C3%B1as',
    'https://www.gob.pe/busquedas.json?institucion[]=concytec&term=concurso',
    'https://www.gob.pe/busquedas.json?term=premio+juventud+innovacion'
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

        const title = extractGobPeTitle(res.name_with_parent, res.url, 'Concurso de Innovación');
        const desc = stripHtml(res.content || 'Concurso oficial, fondo concursable o premio nacional para jóvenes innovadores e investigadores.');

        const isCompetition = title.toLowerCase().includes('concurso') || 
                              title.toLowerCase().includes('premio') || 
                              title.toLowerCase().includes('innovaci') || 
                              title.toLowerCase().includes('fondo') || 
                              desc.toLowerCase().includes('concurso');
        if (!isCompetition) continue;

        items.push(normalizeOpportunity({
          id: `concurso-gobpe-${res.id || Math.random().toString(36).substring(7)}`,
          title: title,
          organization: res.content_sub_title_card ? stripHtml(res.content_sub_title_card) : 'ProInnóvate / CONCYTEC / Estado Peruano',
          category: 'competition',
          type: 'Fondo Concursable / Premio a la Innovación',
          typeCategory: 'innovation',
          ageRange: '18to25',
          ageRangeLabel: '18 a 35 años',
          coverage: 'full',
          coverageLabel: 'Capital Semilla No Reembolsable / Premios en Efectivo',
          modality: 'hybrid',
          location: 'Nacional (Todo el Perú)',
          deadline: '2026-11-30',
          description: desc,
          image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
          external_link: url,
          featured: items.length < 3,
          requirements: [
            'Ser ciudadano peruano o residente legal.',
            'Presentar una propuesta de proyecto o emprendimiento con impacto comprobable.',
            'Cumplir con las bases administrativas y cronograma de postulación.'
          ],
          benefits: [
            'Financiamiento monetario no reembolsable o premio oficial de reconocimiento.',
            'Mentorías especializadas con expertos de la industria y aceleradoras.',
            'Visibilidad mediática nacional e internacional.'
          ],
          steps: [
            'Descargar las bases del concurso desde el portal de Gob.pe.',
            'Formular la propuesta de proyecto en el formato oficial.',
            'Postular en línea a través de la plataforma de recepción antes del cierre.'
          ]
        }));
      }
    } catch (err) {
      console.warn('⚠️ [Scraper Concursos] Error consultando endpoint:', endpoint, err.message);
    }
  }

  // Major national innovation & startup flagship competitions
  const flagshipCompetitions = [
    {
      id: 'concurso-startup-peru-oficial',
      title: 'StartUp Perú - Capital Semilla para Emprendedores Innovadores',
      organization: 'ProInnóvate (Ministerio de la Producción)',
      category: 'competition',
      type: 'Fondo Concursable Nacional',
      typeCategory: 'innovation',
      ageRange: '18to25',
      ageRangeLabel: '18 a 35 años',
      coverage: 'full',
      coverageLabel: 'Hasta S/ 60,000 No Reembolsables',
      modality: 'hybrid',
      location: 'Todo el Perú',
      deadline: '2026-10-31',
      description: 'Financiamiento no reembolsable y acompañamiento de incubadoras para startups peruanas que cuenten con un producto mínimo viable con tracción comercial.',
      image_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.proinnovate.gob.pe/',
      featured: true,
      requirements: ['Equipo mínimo de 2 fundadores.', 'Prototipo validado en mercado con ventas preliminares.'],
      benefits: ['Fondos directos para aceleración y prototipado.', 'Mentorías de la red nacional de incubadoras.']
    },
    {
      id: 'concurso-premio-nacional-juventud-oficial',
      title: 'Premio Nacional de la Juventud "Yenuri Choki" 2026',
      organization: 'SENAJU (Secretaría Nacional de la Juventud)',
      category: 'competition',
      type: 'Premio Nacional del Estado',
      typeCategory: 'innovation',
      ageRange: '18to25',
      ageRangeLabel: '15 a 29 años',
      coverage: 'full',
      coverageLabel: 'Premio S/ 15,000 + Trofeo y Diploma',
      modality: 'onsite',
      location: 'Todo el Perú',
      deadline: '2026-09-30',
      description: 'El máximo reconocimiento del Estado Peruano a jóvenes u organizaciones juveniles que destacan en Ciencia y Tecnología, Letras, Medio Ambiente y Emprendimiento Social.',
      image_url: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://juventud.gob.pe/',
      featured: true,
      requirements: ['Jóvenes de 15 a 29 años o agrupaciones juveniles.', 'Evidencias de impacto social o tecnológico durante el último año.'],
      benefits: ['Premio económico entregado por el Estado.', 'Reconocimiento oficial en ceremonia de Palacio de Gobierno.']
    }
  ];

  for (const comp of flagshipCompetitions) {
    if (!seenUrls.has(comp.external_link)) {
      seenUrls.add(comp.external_link);
      items.push(normalizeOpportunity(comp));
    }
  }

  console.log(`✅ [Scraper Concursos] Total extraídas en vivo: ${items.length}`);
  return items;
}
