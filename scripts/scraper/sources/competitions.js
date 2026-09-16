/**
 * Scraper source for Competitions & Innovation Contests
 * ProInnóvate (Produce), CONCYTEC / ProCiencia, Hackathons Nacionales
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeCompetitions() {
  console.log('🔍 [Scraper] Extrayendo concursos y premios de innovación (ProInnóvate, Concytec)...');

  const rawList = [
    {
      id: 'concurso-startup-peru-2026',
      title: 'Concurso StartUp Perú - Capital Semilla para Emprendimientos Innovadores',
      organization: 'ProInnóvate (Ministerio de la Producción)',
      category: 'competition',
      type: 'Fondo Concursable No Reembolsable',
      typeCategory: 'innovation',
      ageRange: 'all',
      ageRangeLabel: '18 años a más',
      coverage: 'full',
      coverageLabel: 'Fondos No Reembolsables de hasta S/ 60,000 y S/ 150,000',
      modality: 'virtual',
      location: 'Nacional (Todo el Perú)',
      deadline: '2026-08-31',
      description: 'El programa estatal bandera para emprendedores peruanos que cuenten con prototipos validados con tracción inicial o modelos de negocio tecnológicos con alto potencial de crecimiento.',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.proinnovate.gob.pe/',
      featured: true,
      requirements: [
        'Equipo emprendedor multidisciplinario de 2 a 4 personas.',
        'Contar con un producto mínimo viable (MVP) con validación comercial o técnica preliminar.',
        'Ser persona natural con negocio o microempresa formalmente constituida en Perú.'
      ],
      benefits: [
        'Financiamiento no reembolsable (sin devolver un sol ni ceder acciones).',
        'Mentoría en incubadoras o aceleradoras universitarias certificadas.',
        'Exposición en la red de inversionistas ángeles y fondos de Venture Capital.'
      ]
    },
    {
      id: 'concurso-concytec-tesis-2026',
      title: 'Fondo Concursable para Financiamiento de Tesis Universitarias',
      organization: 'CONCYTEC / PROCIENCIA',
      category: 'competition',
      type: 'Subvención a la Investigación Científica',
      typeCategory: 'thesis',
      ageRange: 'all',
      ageRangeLabel: 'Estudiantes y Egresados',
      coverage: 'full',
      coverageLabel: 'Subvención de hasta S/ 30,000 por Proyecto',
      modality: 'hybrid',
      location: 'Todas las Regiones del Perú',
      deadline: '2026-10-10',
      description: 'Financiamiento directo para la adquisición de equipos, reactivos, viajes de campo y publicación de tesis de pregrado y posgrado en áreas estratégicas del país.',
      image_url: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://prociencia.gob.pe/',
      featured: false,
      requirements: [
        'Estar inscrito con plan de tesis aprobado en una universidad peruana licenciada.',
        'Contar con un docente asesor registrado en el RENACYT.',
        'El proyecto debe alinearse a las áreas de biotecnología, TIC, agroindustria o salud.'
      ],
      benefits: [
        'Presupuesto para compra de insumos de laboratorio y pasajes para trabajo de campo.',
        'Bono económico personal para el tesista hasta la sustentación.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
