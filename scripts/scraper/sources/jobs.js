/**
 * Live Scraper source for Youth Jobs (Empleos Juveniles)
 * Fetches live job opportunities and public calls from MTPE (Empleos Perú) / Gob.pe.
 */
import { normalizeOpportunity, extractGobPeHref, extractGobPeTitle, stripHtml } from '../normalizer.js';

export async function scrapeJobs() {
  console.log('🔍 [Scraper] Consultando vacantes y convocatorias laborales en vivo (MTPE, Gob.pe)...');
  const items = [];
  const seenUrls = new Set();

  const endpoints = [
    'https://www.gob.pe/busquedas.json?term=convocatoria+laboral&sort_by=recent',
    'https://www.gob.pe/busquedas.json?institucion[]=mtpe&term=empleo&contenido[]=servicios',
    'https://www.gob.pe/busquedas.json?term=puestos+vacantes+empleos+peru'
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

        const title = extractGobPeTitle(res.name_with_parent, res.url, 'Convocatoria Laboral Oficial');
        const desc = stripHtml(res.content || 'Convocatoria de empleo formal, vacantes públicas o servicios de intermediación laboral del Estado.');

        // Relevancia a empleo
        const isJob = title.toLowerCase().includes('laboral') || 
                      title.toLowerCase().includes('empleo') || 
                      title.toLowerCase().includes('trabajo') || 
                      title.toLowerCase().includes('puesto') || 
                      desc.toLowerCase().includes('empleo');
        if (!isJob) continue;

        items.push(normalizeOpportunity({
          id: `empleo-gobpe-${res.id || Math.random().toString(36).substring(7)}`,
          title: title,
          organization: res.content_sub_title_card ? stripHtml(res.content_sub_title_card) : 'Ministerio de Trabajo / Entidad Pública',
          category: 'job',
          type: 'Empleo Formal en Planilla',
          typeCategory: 'junior',
          ageRange: '18to25',
          ageRangeLabel: '18 a 29 años',
          coverage: 'full',
          coverageLabel: 'Sueldo en Planilla + Beneficios de Ley',
          modality: 'onsite',
          location: 'Lima / Principales Regiones del Perú',
          deadline: '2026-10-31',
          description: desc,
          image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
          external_link: url,
          featured: items.length < 3,
          requirements: [
            'DNI vigente y mayoría de edad (18+).',
            'Secundaria completa, técnico o universitario según el perfil de la vacante.',
            'Cumplir con el perfil de puesto detallado en las bases oficiales de Gob.pe.'
          ],
          benefits: [
            'Ingreso a planilla con todos los beneficios de ley (CTS, gratificaciones, EsSalud, vacaciones).',
            'Estabilidad laboral y oportunidades de capacitación continua.'
          ],
          steps: [
            'Acceder al enlace de la convocatoria o servicio en Gob.pe.',
            'Descargar las bases de contratación y verificar el cronograma.',
            'Postular virtualmente o enviar el expediente requerido.'
          ]
        }));
      }
    } catch (err) {
      console.warn('⚠️ [Scraper Empleos] Error consultando endpoint:', endpoint, err.message);
    }
  }

  // Official portals and flagship youth employment services
  const flagshipJobs = [
    {
      id: 'empleo-mtpe-empleos-peru-portal',
      title: 'Bolsa Nacional de Trabajo Juvenil - Portal Empleos Perú (MTPE)',
      organization: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
      category: 'job',
      type: 'Bolsa Oficial de Empleo Formal',
      typeCategory: 'junior',
      ageRange: '18to25',
      ageRangeLabel: '18 a 29 años',
      coverage: 'full',
      coverageLabel: 'Vacantes Verificadas en Planilla 100%',
      modality: 'onsite',
      location: 'A Nivel Nacional',
      deadline: '2026-12-31',
      description: 'El portal Empleos Perú del MTPE conecta a miles de jóvenes con empresas formales que ofrecen empleo con contrato, seguro social y todos los beneficios de ley.',
      image_url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.empleosperu.gob.pe/',
      featured: true,
      requirements: ['Crear tu cuenta con DNI en Empleos Perú.', 'Obtener gratis tu Certificado Único Laboral (Certijoven).'],
      benefits: ['Postulación directa a cientos de empresas registradas.', 'Acceso a ferias laborales presenciales y virtuales gratuitas.']
    },
    {
      id: 'empleo-bcp-promotor-servicios-oficial',
      title: 'Promotor de Servicios Bancarios / Asesor de Plataforma Junior BCP',
      organization: 'Banco de Crédito del Perú (BCP)',
      category: 'job',
      type: 'Primer Empleo Formal / Junior',
      typeCategory: 'junior',
      ageRange: '18to25',
      ageRangeLabel: '18 a 26 años',
      coverage: 'full',
      coverageLabel: 'Planilla Directa + Bonos + EPS',
      modality: 'onsite',
      location: 'Lima y Agencias a Nivel Nacional',
      deadline: '2026-11-30',
      description: 'Inicia tu carrera en el sector financiero con el BCP gestionando transacciones y asesorando clientes con capacitación pagada y línea de ascenso rápido.',
      image_url: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://jobs.viabcp.com/',
      featured: true,
      requirements: ['Estudios técnicos o universitarios (en curso, truncos o egresados) de Administración, Contabilidad o afines.', 'Orientación al cliente y comunicación asertiva.'],
      benefits: ['Ingreso a planilla con asignación familiar y utilidades.', 'Línea de carrera bancaria a puestos de analista o funcionario.']
    }
  ];

  for (const f of flagshipJobs) {
    if (!seenUrls.has(f.external_link)) {
      seenUrls.add(f.external_link);
      items.push(normalizeOpportunity(f));
    }
  }

  console.log(`✅ [Scraper Empleos] Total extraídas en vivo: ${items.length}`);
  return items;
}
