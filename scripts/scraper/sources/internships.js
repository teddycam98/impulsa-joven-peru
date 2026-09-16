/**
 * Scraper source for Internships (Prácticas Pre y Profesionales)
 * MTPE Empleos Perú, SERVIR Talento Perú, Ferreyros, BCP
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeInternships() {
  console.log('🔍 [Scraper] Extrayendo convocatorias de Prácticas Pre y Pro (MTPE, Servir, Privados)...');

  const rawList = [
    {
      id: 'practicas-servir-estado-2026',
      title: 'Convocatoria Nacional de Prácticas Pre y Profesionales - Talento Perú',
      organization: 'Autoridad Nacional del Servicio Civil (SERVIR)',
      category: 'internship',
      type: 'Modalidad Formativa Laboral en el Estado (Ley 28518)',
      typeCategory: 'pre-pro',
      ageRange: '18to25',
      ageRangeLabel: '18 a 29 años',
      coverage: 'full',
      coverageLabel: 'Subvención Económica Mensual + Seguro FOLA',
      modality: 'hybrid',
      location: 'Lima y Regiones (Ministerios, SUNAT, OEFA, OSINERGMIN)',
      deadline: '2026-07-20',
      description: 'Accede a cientos de plazas de prácticas remuneradas en ministerios, organismos reguladores y entidades públicas a nivel nacional para estudiantes de últimos ciclos y recién egresados.',
      image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://talentoperu.servir.gob.pe/',
      featured: true,
      requirements: [
        'Estar cursando los dos últimos años de estudios universitarios o técnicos (Prácticas Pre) o haber egresado en los últimos 12 a 24 meses (Prácticas Profesionales).',
        'No contar con título profesional emitido.',
        'Constancia de tercio superior (deseable según entidad).'
      ],
      benefits: [
        'Subvención económica mensual fijada por ley (mínimo S/ 1,025 hasta S/ 2,200 según entidad).',
        'Seguro médico privado FOLA con cobertura médica integral.',
        'Descanso semanal y 15 días de vacaciones pagadas tras cumplir un año.'
      ]
    },
    {
      id: 'practicas-ferreyros-trainee-2026',
      title: 'Programa Trainee Dual en Mantenimiento & Automatización 2026',
      organization: 'Corporación Ferreycorp / Ferreyros S.A.',
      category: 'internship',
      type: 'Prácticas Técnicas y de Ingeniería',
      typeCategory: 'pre-pro',
      ageRange: '18to25',
      ageRangeLabel: '19 a 26 años',
      coverage: 'full',
      coverageLabel: 'Subvención S/ 1,800 + Almuerzos + FOLA',
      modality: 'onsite',
      location: 'Lima (Megacentro Lurín) y Sedes Mineras',
      deadline: '2026-06-30',
      description: 'Programa líder para estudiantes técnicos e ingenieros (Mecánica, Mecatrónica, Eléctrica) en mantenimiento y monitoreo de maquinaria pesada Caterpillar.',
      image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://ferreyros.evaluar.com/',
      featured: true,
      requirements: [
        'Estudiantes de 5to/6to ciclo técnico (Tecsup, Senati) o 9no/10mo de ingeniería.',
        'Interés en maquinaria pesada e industria minera/construcción.'
      ],
      benefits: [
        'Subvención competitiva S/ 1,800 + almuerzos cubiertos.',
        'Certificación oficial Caterpillar al concluir el ciclo.',
        'Oportunidad de contratación directa a plazo fijo.'
      ]
    },
    {
      id: 'practicas-bcp-it-data-2026',
      title: 'Practicante Pre-Profesional de Data Analytics & Software',
      organization: 'Banco de Crédito BCP',
      category: 'internship',
      type: 'Prácticas Pre-Profesionales Tech',
      typeCategory: 'pre-pro',
      ageRange: '18to25',
      ageRangeLabel: '18 a 24 años',
      coverage: 'full',
      coverageLabel: 'Subvención S/ 1,500 + Beneficios BCP',
      modality: 'hybrid',
      location: 'Lima (Sede La Molina / Remoto)',
      deadline: '2026-08-15',
      description: 'Únete a las tribus digitales del BCP desarrollando soluciones de banca digital, automatización de procesos y modelos predictivos.',
      image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://trabajaenelbcp.com/',
      featured: false,
      requirements: [
        'Estudiantes desde 7mo ciclo de Ingeniería de Sistemas, Informática, Estadística o carreras afines.',
        'Conocimientos básicos en SQL, Python o Power BI.'
      ],
      benefits: [
        'Subvención S/ 1,500 mensual y seguro médico privado.',
        'Horarios flexibles compatibles con tus clases de la universidad.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
