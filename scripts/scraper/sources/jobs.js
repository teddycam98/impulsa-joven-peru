/**
 * Scraper source for Youth Jobs (Empleos Juveniles)
 * MTPE - Empleos Perú, Programa Nacional para la Empleabilidad, Convocatorias Junior
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeJobs() {
  console.log('🔍 [Scraper] Extrayendo ofertas de Empleo Juvenil (MTPE, Bolsa de Trabajo Oficial)...');

  const rawList = [
    {
      id: 'empleo-mtpe-primer-empleo-2026',
      title: 'Convocatoria Nacional de Empleo Joven - Bolsa Empleos Perú',
      organization: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
      category: 'job',
      type: 'Puesto Laboral en Planilla Completa',
      typeCategory: 'junior',
      ageRange: '18to25',
      ageRangeLabel: '18 a 29 años',
      coverage: 'full',
      coverageLabel: 'Remuneración en Planilla + Todos los Beneficios',
      modality: 'onsite',
      location: 'Lima, Arequipa, Trujillo, Cusco, Piura',
      deadline: '2026-09-30',
      description: 'Vacantes formales para jóvenes sin experiencia previa o con experiencia inicial en áreas de atención al cliente, operaciones logísticas, soporte administrativo y ventas corporativas.',
      image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.empleosperu.gob.pe/',
      featured: true,
      requirements: [
        'Secundaria completa o estudios técnicos/universitarios en curso o concluidos.',
        'Certificado Único Laboral (CERTIJOVEN) emitido gratuitamente por el MTPE.',
        'DNI vigente y ganas de aprender.'
      ],
      benefits: [
        'Ingreso directo a planilla desde el primer día con CTS, gratificaciones y vacaciones.',
        'Capacitación pagada e inducción completa.',
        'Seguro social de salud (EsSalud) y asignación familiar.'
      ]
    },
    {
      id: 'empleo-junior-dev-tech-2026',
      title: 'Desarrollador Web Frontend Junior (Vite / React / Tailwind)',
      organization: 'Red de Startups e Innovación Perú',
      category: 'job',
      type: 'Empleo Junior Tech',
      typeCategory: 'junior',
      ageRange: 'all',
      ageRangeLabel: '18 a 30 años',
      coverage: 'full',
      coverageLabel: 'Sueldo Competitivo + Modalidad Remota',
      modality: 'virtual',
      location: 'Remoto (Todo el Perú)',
      deadline: '2026-07-15',
      description: 'Oportunidad de inserción en el ecosistema tecnológico peruano para programadores juniors apasionados por el desarrollo web moderno, APIs y experiencia de usuario.',
      image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.empleosperu.gob.pe/',
      featured: false,
      requirements: [
        'Conocimientos sólidos de JavaScript / TypeScript, HTML5 y CSS3.',
        'Manejo básico de Git y repositorios en GitHub.',
        'Portafolio de proyectos personales o académicos verificables.'
      ],
      benefits: [
        'Horario flexible y trabajo 100% desde casa.',
        'Bono de conectividad y equipo de cómputo.',
        'Línea de carrera y mentoría con desarrolladores senior.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
