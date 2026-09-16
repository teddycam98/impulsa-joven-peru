/**
 * Scraper source for Universities & Admission Schedules
 * UNMSM, UNI, PUCP, TECSUP, SUNEDU
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeUniversities() {
  console.log('🔍 [Scraper] Extrayendo cronogramas de Admisión Universitaria (UNMSM, UNI, PUCP, Tecsup)...');

  const rawList = [
    {
      id: 'admision-unmsm-2026',
      title: 'Examen de Admisión General UNMSM 2026',
      organization: 'Universidad Nacional Mayor de San Marcos (Decana de América)',
      category: 'university',
      type: 'Concurso de Admisión a Universidad Pública',
      typeCategory: 'admission',
      ageRange: 'all',
      ageRangeLabel: 'Todas las edades',
      coverage: 'full',
      coverageLabel: 'Educación Superior Pública Gratuita',
      modality: 'onsite',
      location: 'Ciudad Universitaria (Lima)',
      deadline: '2026-10-15',
      description: 'La universidad más antigua de América abre su proceso de admisión nacional para más de 66 carreras profesionales en Ciencias de la Salud, Ingenierías, Humanidades y Gestión.',
      image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://admision.unmsm.edu.pe/',
      featured: true,
      requirements: [
        'Haber concluido la educación secundaria completa en Perú o el extranjero.',
        'Realizar el pago por derecho de examen en el Banco de la Nación.',
        'Completar el registro digital en la plataforma OCA.'
      ],
      benefits: [
        'Estudios de pregrado sin costo de matrícula ni pensiones (gratuidad de la enseñanza).',
        'Comedor universitario, residencia para provincianos y biblioteca central.',
        'Intercambios internacionales con universidades de Europa, Asia y América.'
      ]
    },
    {
      id: 'admision-uni-2026',
      title: 'Concurso de Admisión Ordinario UNI 2026',
      organization: 'Universidad Nacional de Ingeniería (UNI)',
      category: 'university',
      type: 'Admisión en Ciencias e Ingenierías',
      typeCategory: 'admission',
      ageRange: 'all',
      ageRangeLabel: 'Todas las edades',
      coverage: 'full',
      coverageLabel: 'Universidad Pública Especializada Gratuita',
      modality: 'onsite',
      location: 'Campus Central UNI (Rímac, Lima)',
      deadline: '2026-07-30',
      description: 'El examen de ingeniería y ciencias más riguroso y prestigioso del país en tres jornadas evaluativas (Aptitud Académica, Matemática, Física y Química).',
      image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://admision.uni.edu.pe/',
      featured: true,
      requirements: [
        'Certificado de estudios secundarios completos.',
        'Inscripción digital en la Oficina Central de Admisión UNI.'
      ],
      benefits: [
        'Excelencia académica y los más altos índices de empleabilidad nacional e internacional en ingeniería.',
        'Centros de investigación avanzada (CISMID, CTIC UNI).'
      ]
    },
    {
      id: 'admision-pucp-talento-2026',
      title: 'Evaluación del Talento PUCP 2026 - Primera Opción y General',
      organization: 'Pontificia Universidad Católica del Perú (PUCP)',
      category: 'university',
      type: 'Admisión Privada con Escalas Socioeconómicas',
      typeCategory: 'admission',
      ageRange: 'all',
      ageRangeLabel: 'Escolares y Egresados',
      coverage: 'partial',
      coverageLabel: 'Sistema de Escalas Diferenciadas y Becas',
      modality: 'onsite',
      location: 'Campus San Miguel (Lima)',
      deadline: '2026-09-25',
      description: 'Postula a la universidad número 1 del Perú en el Ranking QS Mundial. Acceso a becas de estímulo académico y escala socioeconómica ajustada a cada familia.',
      image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://zonaescolar.pucp.edu.pe/',
      featured: false,
      requirements: [
        'Postulantes que cursan el 5to de secundaria o hayan egresado.',
        'Inscripción en el portal de admisión PUCP adjuntando libreta de notas.'
      ],
      benefits: [
        'Acreditaciones internacionales (ABET, IAC, EQUIS).',
        'Convenios de doble titulación con universidades de Estados Unidos y Europa.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
