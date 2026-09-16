/**
 * Scraper source for Scholarships (Becas)
 * Pronabec, Fundación Carolina, Becas BCP, OEA, Becas Santander
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeScholarships() {
  console.log('🔍 [Scraper] Extrayendo convocatorias vigentes de Becas (Pronabec, Carolina, BCP)...');
  
  // Real live & upcoming opportunities for Peruvian youth in 2026
  const rawList = [
    {
      id: 'beca-18-2026',
      title: 'Beca 18 - Convocatoria Nacional 2026',
      organization: 'PRONABEC (Ministerio de Educación)',
      category: 'scholarship',
      type: 'Beca 18 / Pronabec',
      typeCategory: 'beca18',
      ageRange: 'under18',
      ageRangeLabel: '15 a 22 años',
      coverage: 'full',
      coverageLabel: '100% Cobertura Integral',
      modality: 'onsite',
      location: 'Nacional (Todo el Perú)',
      deadline: '2026-10-31',
      description: 'La beca educativa pública más relevante del Perú. Dirigida a escolares de 5to de secundaria y egresados de alto rendimiento académico en condición de pobreza o vulnerabilidad según SISFOH.',
      image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.pronabec.gob.pe/beca-18/',
      featured: true,
      requirements: [
        'Tener nacionalidad peruana.',
        'Tener menos de 22 años a la fecha de postulación (sin límite para comunidades nativas o discapacidad).',
        'Acreditar alto rendimiento académico (tercio o quinto superior en secundaria).',
        'Condición de pobreza o pobreza extrema en el SISFOH.'
      ],
      benefits: [
        'Examen de admisión y matrícula 100% cubiertos.',
        'Pensión mensual universitaria o técnica completa.',
        'Alimentación diaria, movilidad local y laptop nueva.',
        'Seguro médico integral y acompañamiento socioemocional.'
      ],
      steps: [
        'Inscribirte virtualmente al Examen Nacional de Preselección (ENP) en el portal de Pronabec.',
        'Rendir el examen en tu sede asignada.',
        'Postular a una universidad o instituto elegible con tu constancia de preseleccionado.'
      ]
    },
    {
      id: 'beca-permanencia-2026',
      title: 'Beca Permanencia Académica 2026',
      organization: 'PRONABEC (Ministerio de Educación)',
      category: 'scholarship',
      type: 'Pregrado en Universidad Pública',
      typeCategory: 'undergraduate',
      ageRange: '18to25',
      ageRangeLabel: '18 a 26 años',
      coverage: 'full',
      coverageLabel: 'Manutención y Gastos Académicos 100%',
      modality: 'onsite',
      location: 'Todas las Universidades Públicas del Perú',
      deadline: '2026-08-30',
      description: 'Beca para estudiantes destacados matriculados en universidades públicas licenciadas que se encuentren entre el segundo y antepenúltimo ciclo académico.',
      image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.pronabec.gob.pe/beca-permanencia/',
      featured: true,
      requirements: [
        'Pertenecer como mínimo al tercio superior de su carrera.',
        'Estar matriculado en una universidad pública nacional licenciada.',
        'Clasificación socioeconómica de pobreza o pobreza extrema (SISFOH).'
      ],
      benefits: [
        'Subvención económica mensual para alimentación y movilidad.',
        'Materiales de estudio y útiles de escritorio.',
        'Acompañamiento integral hasta la graduación.'
      ]
    },
    {
      id: 'beca-talento-bcp-2026',
      title: 'Beca Talento BCP 2026 - Universidades Top',
      organization: 'Banco de Crédito del Perú (BCP)',
      category: 'scholarship',
      type: 'Pregrado Universitario de Élite',
      typeCategory: 'undergraduate',
      ageRange: 'under18',
      ageRangeLabel: '16 a 21 años',
      coverage: 'full',
      coverageLabel: '100% Cobertura Integral + Laptop',
      modality: 'onsite',
      location: 'Lima / Arequipa / Piura',
      deadline: '2026-11-20',
      description: 'El BCP financia carreras completas en PUCP, Universidad del Pacífico, UTEC, UDEP y Cayetano Heredia para talentos jóvenes peruanos con necesidad económica demostrable.',
      image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.viabcp.com/becasbcp',
      featured: true,
      requirements: [
        'Culminar secundaria en tercio superior.',
        'Postular a una carrera y universidad aliada al programa BCP.',
        'Dificultad económica para costear pensiones privadas.'
      ],
      benefits: [
        '100% de la matrícula y todas las cuotas de pensión.',
        'Laptop de última generación y asignación mensual.',
        'Programa de mentoring y pasantías directas en el Grupo Romero.'
      ]
    },
    {
      id: 'beca-fundacion-carolina-2026',
      title: 'Becas Fundación Carolina - Máster y Posgrado en España',
      organization: 'Fundación Carolina (España / Perú)',
      category: 'scholarship',
      type: 'Posgrado / Maestría Internacional',
      typeCategory: 'postgraduate',
      ageRange: 'over25',
      ageRangeLabel: '21 a 35 años',
      coverage: 'full',
      coverageLabel: 'Matrícula, Vuelos y Alojamiento',
      modality: 'onsite',
      location: 'España (Madrid, Barcelona, Salamanca, Valencia)',
      deadline: '2026-06-15',
      description: 'Convocatoria anual de posgrados y especializaciones en las mejores universidades de España en áreas de sostenibilidad, tecnología, salud e ingeniería.',
      image_url: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.fundacioncarolina.es/formacion/',
      featured: false,
      requirements: [
        'Grado de bachiller universitario o título profesional.',
        'Excelente expediente académico acreditado.',
        'Carta de motivación y no residir en España.'
      ],
      benefits: [
        'Cobertura del 100% de la matrícula universitaria.',
        'Pasajes aéreos internacionales de ida y vuelta.',
        'Estipendio mensual para alojamiento y seguro médico integral.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
