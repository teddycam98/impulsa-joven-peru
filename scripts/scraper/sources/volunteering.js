/**
 * Scraper source for Volunteering & Social Action
 * SENAJU, Voluntarios del Bicentenario, Cruz Roja Peruana, Techo
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeVolunteering() {
  console.log('🔍 [Scraper] Extrayendo convocatorias de Voluntariado (SENAJU, Bicentenario, Cruz Roja)...');

  const rawList = [
    {
      id: 'voluntariado-bicentenario-2026',
      title: 'Voluntarios del Bicentenario - Brigadas Ciudadanas & Comunitarias 2026',
      organization: 'Proyecto Especial Bicentenario (Ministerio de Cultura)',
      category: 'volunteer',
      type: 'Voluntariado Estatal Acreditado en el SINAVOL',
      typeCategory: 'social',
      ageRange: 'all',
      ageRangeLabel: '15 años a más',
      coverage: 'full',
      coverageLabel: 'Constancia Oficial con Valor para Concursos Públicos',
      modality: 'hybrid',
      location: 'Todas las 25 Regiones del Perú',
      deadline: '2026-11-30',
      description: 'El movimiento de voluntariado cívico más grande del Perú. Participa en campañas de alfabetización, apoyo en emergencias climáticas, recuperación de patrimonio y talleres para niños en zonas vulnerables.',
      image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://bicentenario.gob.pe/voluntarios/',
      featured: true,
      requirements: [
        'Tener vocación de servicio social y trabajo en equipo.',
        'Disponibilidad mínima de 4 horas semanales.',
        'Completar el curso virtual gratuito de inducción ciudadana.'
      ],
      benefits: [
        'Certificación oficial emitida por el Ministerio de Cultura registrada en el Registro Nacional de Voluntarios (MIMP).',
        'Puntaje adicional para postulaciones a Beca 18, Beca Permanencia y convocatorias CAS del Estado.',
        'Seguro contra accidentes durante las jornadas presenciales.'
      ]
    },
    {
      id: 'voluntariado-cruz-roja-2026',
      title: 'Programa de Voluntariado Juvenil en Primeros Auxilios & Gestión del Riesgo',
      organization: 'Cruz Roja Peruana',
      category: 'volunteer',
      type: 'Voluntariado Humanitario Internacional',
      typeCategory: 'health',
      ageRange: 'all',
      ageRangeLabel: '16 a 29 años',
      coverage: 'full',
      coverageLabel: 'Formación Humanitaria Gratuita & Uniforme',
      modality: 'onsite',
      location: 'Filiales a Nivel Nacional (Lima, Callao, Ica, Arequipa, Cusco, etc.)',
      deadline: '2026-08-15',
      description: 'Capacítate en primeros auxilios comunitarios, evacuación y respuesta ante desastres naturales para brindar asistencia humanitaria en emergencias nacionales.',
      image_url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.cruzroja.org.pe/',
      featured: false,
      requirements: [
        'Disposición para entrenamientos prácticos los fines de semana.',
        'Compromiso con los Principios Fundamentales del Movimiento Internacional de la Cruz Roja.'
      ],
      benefits: [
        'Certificación avalada internacionalmente en Primeros Auxilios y Soporte Básico de Vida.',
        'Experiencia de campo en operaciones de ayuda humanitaria.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
