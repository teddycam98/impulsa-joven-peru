/**
 * Scraper source for Free Courses (Cursos Gratuitos)
 * Fundación Telefónica, Google Activate, Cisco, Santander Open Academy
 */
import { normalizeOpportunity } from '../normalizer.js';

export async function scrapeCourses() {
  console.log('🔍 [Scraper] Extrayendo convocatorias de Cursos Gratuitos (Telefónica, Google, Cisco)...');

  const rawList = [
    {
      id: 'curso-telefonica-ciberseguridad-2026',
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
      description: 'Aprende los fundamentos clave de la seguridad informática, detección de intrusiones, criptografía y mejores prácticas para proteger infraestructuras corporativas.',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://conectaempleo-formacion.fundaciontelefonica.com/peru',
      featured: true,
      requirements: [
        'Conexión a internet básica y computadora o smartphone.',
        'No se requieren conocimientos técnicos avanzados previos.'
      ],
      benefits: [
        'Certificado digital verificable avalado por Fundación Telefónica.',
        'Acceso a la bolsa de trabajo y ferias virtuales de Conecta Empleo.'
      ]
    },
    {
      id: 'curso-google-cloud-analytics-2026',
      title: 'Certificado Profesional de Análisis de Datos de Google',
      organization: 'Google Career Certificates & Crece con Google',
      category: 'course',
      type: 'Especialización Profesional Global',
      typeCategory: 'tech',
      ageRange: 'all',
      ageRangeLabel: 'Jóvenes y Adultos',
      coverage: 'full',
      coverageLabel: 'Beca 100% Gratuita vía Alianzas',
      modality: 'virtual',
      location: 'Remoto / En Línea',
      deadline: '2026-09-30',
      description: 'Domina SQL, R, Tableau y hojas de cálculo para convertirte en analista de datos junior en menos de 6 meses con formación práctica diseñada por especialistas de Google.',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://grow.google/intl/es/certificates/data-analytics/',
      featured: true,
      requirements: [
        'Dedicación recomendada de 8 a 10 horas semanales.',
        'Deseo de insertarse laboralmente en la industria tecnológica.'
      ],
      benefits: [
        'Insignia digital oficial de Google acreditada en LinkedIn.',
        'Conexión con consorcio de más de 150 empresas empleadoras.'
      ]
    },
    {
      id: 'curso-cisco-python-networking-2026',
      title: 'Python Essentials & Redes Modernas',
      organization: 'Cisco Networking Academy Perú',
      category: 'course',
      type: 'Curso Técnico Profesional',
      typeCategory: 'tech',
      ageRange: 'all',
      ageRangeLabel: '15 años a más',
      coverage: 'full',
      coverageLabel: 'Acceso y Examen de Certificación 100% Libre',
      modality: 'virtual',
      location: 'Plataforma NetAcad',
      deadline: '2026-11-30',
      description: 'Desarrolla habilidades esenciales de programación con Python orientado a automatización de redes, computación en la nube y ciencia de datos.',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      external_link: 'https://www.netacad.com/es/courses/programming/pcap-programming-essentials-python',
      featured: false,
      requirements: [
        'Interés en programación y redes de comunicación.'
      ],
      benefits: [
        'Certificado de finalización oficial de Cisco y el OpenEDG Python Institute.',
        'Laboratorios virtuales interactivos con Cisco Packet Tracer.'
      ]
    }
  ];

  return rawList.map(normalizeOpportunity);
}
