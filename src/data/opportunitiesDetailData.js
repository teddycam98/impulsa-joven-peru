export const opportunitiesDetailData = [
  // ──────────────────────────────────────────────
  // BECAS
  // ──────────────────────────────────────────────
  {
    id: 'beca-18',
    title: 'Beca 18 - Convocatoria 2026',
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
    description: 'La beca educativa más importante del Perú. Dirigida a escolares de 5to de secundaria y egresados de alto rendimiento académico en condición de pobreza o vulnerabilidad.',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://www.pronabec.gob.pe/beca-18/',
    featured: true,
    requirements: [
      'Tener nacionalidad peruana.',
      'Tener menos de 22 años a la fecha de postulación (sin límite para comunidades nativas o personas con discapacidad).',
      'Estar cursando o haber culminado la educación secundaria con alto rendimiento académico (tercio o medio superior).',
      'Acreditar condición de pobreza o pobreza extrema según el Sistema de Focalización de Hogares (SISFOH).'
    ],
    benefits: [
      'Costo de examen de admisión y matrícula 100% cubierto.',
      'Pensión de estudios completa durante toda la carrera universitaria o técnica.',
      'Alimentación diaria, movilidad local y materiales de estudio.',
      'Laptop de última generación para uso académico personal.',
      'Acompañamiento socioemocional y académico continuo.'
    ],
    steps: [
      'Revisar las bases oficiales en el portal de Pronabec.',
      'Inscribirte virtualmente al Examen Nacional de Preselección (ENP) en el Módulo de Postulación de Beca 18.',
      'Rendir el Examen Nacional de Preselección en la sede asignada.',
      'Si eres preseleccionado, postular y ser admitido en una universidad o instituto elegible.',
      'Completar la postulación final cargando tu constancia de ingreso.'
    ]
  },
  {
    id: 'beca-bcp',
    title: 'Beca Patronato BCP - Carreras Universitarias',
    organization: 'Banco de Crédito del Perú (BCP)',
    category: 'scholarship',
    type: 'Pregrado Universitario',
    typeCategory: 'undergraduate',
    ageRange: 'under18',
    ageRangeLabel: '16 a 21 años',
    coverage: 'full',
    coverageLabel: '100% Cobertura Integral',
    modality: 'onsite',
    location: 'Lima / Arequipa / Piura',
    deadline: '2026-11-15',
    description: 'Beca de excelencia para talentos jóvenes con dificultades económicas que deseen estudiar en las mejores universidades privadas del país (PUCP, Universidad del Pacífico, UTEC, UDEP, UPCH).',
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://www.viabcp.com/becas-bcp',
    featured: true,
    requirements: [
      'Nacionalidad peruana o residencia permanente.',
      'Estar en 5to de secundaria o haber egresado con rendimiento académico de tercio superior.',
      'Acreditar necesidad socioeconómica demostrable.',
      'Interés comprobado en carreras de ingeniería, ciencias de la computación, economía o administración.'
    ],
    benefits: [
      'Financiamiento del 100% de la pensión y matrícula universitaria.',
      'Estipendio mensual para manutención y transporte.',
      'Cursos de inglés completos hasta nivel avanzado certificado.',
      'Mentoría profesional personalizada por ejecutivos líderes del BCP.',
      'Inserción prioritaria en programas de prácticas pre-profesionales.'
    ],
    steps: [
      'Ingresar al portal oficial del Patronato BCP y registrarte.',
      'Rendir la prueba psicométrica y de competencias en línea.',
      'Presentar la documentación de notas y sustento socioeconómico.',
      'Aprobar la entrevista personal con el comité de selección.',
      'Ser admitido en una de las universidades del convenio BCP.'
    ]
  },
  {
    id: 'beca-la-pontificia',
    title: 'Beca Talento y Excelencia La Pontificia',
    organization: 'Escuela Superior La Pontificia',
    category: 'scholarship',
    type: 'Carreras Técnicas / Institutos',
    typeCategory: 'technical',
    ageRange: '18to25',
    ageRangeLabel: '16 a 25 años',
    coverage: 'partial',
    coverageLabel: 'Cobertura del 70% al 100%',
    modality: 'hybrid',
    location: 'Ayacucho / Huancayo / Lima',
    deadline: '2026-09-30',
    description: 'Beca de formación técnica profesional para jóvenes con vocación tecnológica y de negocios. Convenios de rápida inserción laboral y titulación oficial a nombre de la Nación.',
    image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://lapontificia.edu.pe',
    featured: true,
    requirements: [
      'Haber culminado la educación secundaria completa.',
      'Residir en las regiones de Ayacucho, Junín o Lima Metropolitana.',
      'Vocación demostrada en tecnologías de la información, administración o contabilidad.',
      'Rendir la evaluación vocacional de ingreso institucional.'
    ],
    benefits: [
      'Exoneración de matrícula y pensión reducida subvencionada hasta el 100%.',
      'Acceso a laboratorios de cómputo y aulas virtuales modernas.',
      'Bolsa de trabajo exclusiva con empresas aliadas de la región centro y Lima.',
      'Certificaciones intermedias por módulos completados.'
    ],
    steps: [
      'Completar el formulario de postulación en la web de La Pontificia.',
      'Adjuntar certificado de estudios secundarios y DNI vigente.',
      'Asistir a la entrevista vocacional (presencial o vía Zoom).',
      'Publicación de resultados de asignación de beca.'
    ]
  },
  {
    id: 'beca-permanencia',
    title: 'Beca Permanencia Académica - Pronabec',
    organization: 'PRONABEC',
    category: 'scholarship',
    type: 'Pregrado Universitario',
    typeCategory: 'undergraduate',
    ageRange: '18to25',
    ageRangeLabel: 'Sin límite de edad',
    coverage: 'full',
    coverageLabel: '100% Integral Manutención',
    modality: 'onsite',
    location: 'Universidades Públicas del Perú',
    deadline: '2026-08-30',
    description: 'Subvención económica mensual otorgada por el Estado peruano a estudiantes con excelencia académica en universidades públicas licenciadas para asegurar la culminación oportuna de sus carreras.',
    image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://www.pronabec.gob.pe/beca-permanencia/',
    featured: false,
    requirements: [
      'Estar matriculado en una universidad pública peruana licenciada.',
      'Haber aprobado el segundo año de estudios o un mínimo de 40 créditos.',
      'Pertenecer como mínimo al tercio superior de la facultad o carrera.',
      'No registrar antecedentes penales ni policiales.'
    ],
    benefits: [
      'Subvención económica mensual para alimentación y transporte.',
      'Asignación para materiales de escritorio y libros académicos.',
      'Seguro médico durante el período de vigencia de la beca.'
    ],
    steps: [
      'Verificar que tu universidad pública figure en la lista de elegibles.',
      'Obtener constancia de tercio superior emitida por tu facultad.',
      'Postular en línea a través de la plataforma SIBEC de Pronabec.',
      'Publicación oficial de la lista de becarios seleccionados.'
    ]
  },
  {
    id: 'beca-fundacion-carolina',
    title: 'Becas Fundación Carolina - Maestrías en España',
    organization: 'Fundación Carolina (España)',
    category: 'scholarship',
    type: 'Maestrías y Posgrados',
    typeCategory: 'postgraduate',
    ageRange: 'over25',
    ageRangeLabel: '22 años a más',
    coverage: 'full',
    coverageLabel: 'Cobertura Completa + Vuelos',
    modality: 'onsite',
    location: 'España (Europa)',
    deadline: '2026-12-15',
    description: 'Convocatoria internacional de becas para cursar maestrías oficiales en universidades españolas en áreas de innovación, ciencia, sostenibilidad y políticas públicas.',
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://gestion.fundacioncarolina.es/programas',
    featured: true,
    requirements: [
      'Tener grado de bachiller o título universitario culminado.',
      'Excelente expediente académico con notas destacadas.',
      'Cumplir con los requisitos específicos del máster elegido en España.',
      'Carta de motivación y plan de retorno e impacto en el Perú.'
    ],
    benefits: [
      '100% de la matrícula del máster en la universidad española.',
      'Boleto aéreo de ida y vuelta Lima - Madrid.',
      'Seguro médico internacional durante toda la estancia.',
      'Estipendio mensual en euros para alojamiento y manutención.'
    ],
    steps: [
      'Crear tu perfil de usuario en la plataforma de Fundación Carolina.',
      'Elegir hasta 3 programas de maestría afines a tu carrera.',
      'Llenar el formulario con tus méritos académicos y laborales.',
      'Fase de preselección y entrevistas telemáticas con el jurado español.'
    ]
  },

  // ──────────────────────────────────────────────
  // CURSOS GRATUITOS
  // ──────────────────────────────────────────────
  {
    id: 'curso-google-soporte',
    title: 'Certificado Profesional en Soporte de TI de Google',
    organization: 'Google Career Certificates',
    category: 'course',
    type: 'Certificación Profesional',
    typeCategory: 'tecnologia',
    ageRange: 'all',
    ageRangeLabel: 'Todas las edades',
    coverage: 'full',
    coverageLabel: '100% Gratuito',
    modality: 'remote',
    location: '100% Virtual (A tu ritmo)',
    deadline: '2026-12-31',
    description: 'Programa oficial de Google diseñado para prepararte en los fundamentos del soporte técnico, redes de computadoras, sistemas operativos Linux/Windows y seguridad de TI en menos de 6 meses.',
    image_url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://grow.google/certificates/it-support/',
    featured: true,
    requirements: [
      'No se requiere experiencia técnica previa ni título universitario.',
      'Dispositivo con acceso a internet (computadora o tablet).',
      'Compromiso de 5 a 10 horas semanales de estudio autodidacta.'
    ],
    benefits: [
      'Certificado digital oficial emitido y avalado directamente por Google.',
      'Insignia digital para compartir en LinkedIn.',
      'Acceso a la bolsa de empleo para egresados de certificados Google.'
    ],
    steps: [
      'Ingresar al portal de Google Career Certificates o Coursera.',
      'Registrarte con tu cuenta de correo.',
      'Completar los 5 módulos interactivos con laboratorios prácticos.',
      'Obtener tu certificado final de aprobación.'
    ]
  },
  {
    id: 'curso-cisco-cyber',
    title: 'Cisco Skills for All: Introducción a la Ciberseguridad',
    organization: 'Cisco Networking Academy',
    category: 'course',
    type: 'Curso con Insignia Digital',
    typeCategory: 'tecnologia',
    ageRange: 'all',
    ageRangeLabel: 'Todas las edades',
    coverage: 'full',
    coverageLabel: '100% Gratuito',
    modality: 'remote',
    location: 'Virtual Asincrónico',
    deadline: '2026-12-31',
    description: 'Aprende a proteger tus datos personales, entender cómo operan los ciberataques y las oportunidades de carrera en el campo de mayor demanda tecnológica.',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://skillsforall.com/course/introduction-to-cybersecurity?courseLang=es-XL',
    featured: true,
    requirements: [
      'Conocimientos básicos de navegación en internet.',
      'Ganas de aprender sobre protección digital y privacidad.'
    ],
    benefits: [
      'Contenido interactivo en español desarrollado por ingenieros de Cisco.',
      'Insignia digital oficial de Cisco verificable en Credly.',
      'Acceso directo a la ruta formativa de analista de ciberseguridad junior.'
    ],
    steps: [
      'Abrir el enlace de Cisco Skills for All.',
      'Iniciar sesión con cuenta de Google o Cisco ID.',
      'Realizar los laboratorios de simulación.',
      'Aprobar el cuestionario final con nota mínima de 70%.'
    ]
  },
  {
    id: 'curso-freecodecamp-web',
    title: 'Desarrollo Web Responsivo y Frontend',
    organization: 'freeCodeCamp Org',
    category: 'course',
    type: 'Certificación Práctica',
    typeCategory: 'tecnologia',
    ageRange: 'all',
    ageRangeLabel: 'Todas las edades',
    coverage: 'full',
    coverageLabel: '100% Gratuito y Open Source',
    modality: 'remote',
    location: '100% Online',
    deadline: '2026-12-31',
    description: 'Aprende HTML5 semántico, CSS moderno, Flexbox, Grid y diseño web responsivo creando proyectos reales para tu portafolio.',
    image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://www.freecodecamp.org/espanol/learn/2022/responsive-web-design/',
    featured: false,
    requirements: [
      'Computadora con navegador moderno (Chrome, Edge o Firefox).',
      'No se necesitan conocimientos previos de programación.'
    ],
    benefits: [
      'Certificación oficial gratuita tras completar 5 proyectos evaluados.',
      'Código propio para subir a tu perfil de GitHub.',
      'Comunidad de estudiantes y mentores en español.'
    ],
    steps: [
      'Entrar a freeCodeCamp en español.',
      'Completar los ejercicios interactivos en el editor en línea.',
      'Construir los 5 proyectos obligatorios (Página tributo, formulario, portafolio).',
      'Reclamar tu certificado verificado.'
    ]
  },

  // ──────────────────────────────────────────────
  // PRÁCTICAS (PRE Y PRO)
  // ──────────────────────────────────────────────
  {
    id: 'practica-interbank-ti',
    title: 'Practicante Pre-Profesional de Desarrollo Frontend / Cloud',
    organization: 'Interbank Perú',
    category: 'internship',
    type: 'Prácticas Pre-profesionales',
    typeCategory: 'pre-profesional',
    ageRange: '18to25',
    ageRangeLabel: '19 a 24 años',
    coverage: 'full',
    coverageLabel: 'Remuneración de Ley + Beneficios',
    modality: 'hybrid',
    location: 'Lima (Sede San Borja / Híbrido)',
    deadline: '2026-10-15',
    description: 'Únete al equipo de banca digital de Interbank. Participarás en la construcción y mejora continua de la App Interbank y la plataforma web con metodologías ágiles.',
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://interbank.pe/trabaja-con-nosotros',
    featured: true,
    requirements: [
      'Estudiante de 7mo a 9no ciclo de Ingeniería de Sistemas, Software o afines.',
      'Conocimientos básicos en JavaScript, React o desarrollo web.',
      'Nivel de inglés intermedio (deseable).',
      'Disponibilidad para convenio de prácticas de 30 horas semanales.'
    ],
    benefits: [
      'Subvención económica acorde al mercado por encima del mínimo legal.',
      'Seguro médico FOLA cubierto al 100%.',
      'Modalidad de trabajo híbrida (2 días presencial, 3 días remoto).',
      'Línea de carrera y pase a contratación junior al egresar.'
    ],
    steps: [
      'Postular a través del portal de atracción de talento Interbank.',
      'Evaluación de lógica y pruebas de habilidades blandas.',
      'Entrevista técnica con el líder del equipo tecnológico.',
      'Firma de convenio de prácticas pre-profesionales.'
    ]
  },
  {
    id: 'practica-alicorp-marketing',
    title: 'Practicante Profesional de Marketing Digital y Growth',
    organization: 'Alicorp',
    category: 'internship',
    type: 'Prácticas Profesionales',
    typeCategory: 'profesional',
    ageRange: '18to25',
    ageRangeLabel: '21 a 26 años',
    coverage: 'full',
    coverageLabel: 'Remuneración Competitiva + Almuerzo',
    modality: 'hybrid',
    location: 'Lima (Miraflores / Remoto)',
    deadline: '2026-10-20',
    description: 'Forma parte del equipo de marcas de consumo masivo más grande del Perú. Liderarás iniciativas de contenido, pauta digital y analítica web para marcas líderes.',
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://alicorp.com.pe/pe/es/trabaja-con-nosotros/',
    featured: true,
    requirements: [
      'Egresado o bachiller (2025 o 2026) de Marketing, Administración o Ciencias de la Comunicación.',
      'Manejo de herramientas de analítica (Google Analytics, Meta Business Suite).',
      'Excel intermedio o avanzado.',
      'Disponibilidad a tiempo completo (48 horas semanales).'
    ],
    benefits: [
      'Subvención mensual competitiva para egresados universitarios.',
      'Seguro FOLA y media subvención cada seis meses.',
      'Descuentos corporativos en productos Alicorp.',
      'Capacitación continua en liderazgo y analítica.'
    ],
    steps: [
      'Cargar tu CV en el portal de empleo de Alicorp.',
      'Pruebas de razonamiento online.',
      'Dinámica grupal virtual de resolución de casos de negocio.',
      'Entrevista final con la gerencia de marketing.'
    ]
  },
  {
    id: 'practica-pontificia-gestion',
    title: 'Practicante Pre-Profesional de Gestión y Soporte Académico',
    organization: 'Escuela Superior La Pontificia',
    category: 'internship',
    type: 'Prácticas Pre-profesionales',
    typeCategory: 'pre-profesional',
    ageRange: '18to25',
    ageRangeLabel: '18 a 24 años',
    coverage: 'full',
    coverageLabel: 'Convenio de Prácticas + Certificación',
    modality: 'hybrid',
    location: 'Ayacucho (Presencial / Híbrido)',
    deadline: '2026-10-10',
    description: 'Oportunidad de prácticas para jóvenes estudiantes interesados en administración educativa, gestión de plataformas virtuales y atención al estudiante.',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://lapontificia.edu.pe',
    featured: false,
    requirements: [
      'Estudiante de últimos ciclos de Administración, Contabilidad o Sistemas.',
      'Manejo de herramientas ofimáticas (Word, Excel, Google Docs).',
      'Excelente trato interpersonal y vocación de servicio.'
    ],
    benefits: [
      'Subvención económica puntual según normativa.',
      'Convenio avalado oficialmente para convalidación de prácticas.',
      'Capacitación en gestión de entornos educativos digitales.'
    ],
    steps: [
      'Enviar tu CV actualizado al portal de convocatorias de La Pontificia.',
      'Evaluación de competencias básicas.',
      'Entrevista presencial en la sede institucional.'
    ]
  },

  // ──────────────────────────────────────────────
  // EMPLEOS
  // ──────────────────────────────────────────────
  {
    id: 'empleo-analista-bbva',
    title: 'Analista Junior de Datos y Métricas Financieras',
    organization: 'BBVA Perú',
    category: 'job',
    type: 'Tiempo Completo (Junior)',
    typeCategory: 'junior',
    ageRange: '18to25',
    ageRangeLabel: '20 a 28 años',
    coverage: 'full',
    coverageLabel: 'Planilla Completa',
    modality: 'hybrid',
    location: 'Lima (San Isidro / Híbrido)',
    deadline: '2026-11-10',
    description: 'Responsable de la extracción, procesamiento y visualización de datos comerciales utilizando SQL y Power BI para soportar la toma de decisiones del banco.',
    image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://www.bbva.pe/personas/trabaja-con-nosotros.html',
    featured: true,
    requirements: [
      'Bachiller o titulado de Ingeniería de Sistemas, Estadística, Economía o Ingeniería Industrial.',
      'Experiencia previa de 6 meses a 1 año en análisis de datos (prácticas válidas).',
      'Dominio de SQL y Power BI.',
      'Capacidad de trabajo en equipo y orientación al logro.'
    ],
    benefits: [
      'Ingreso a planilla con todos los beneficios de ley (gratificaciones, CTS, utilidades).',
      'EPS cubierta al 85% para titular y dependientes.',
      'Bono anual por desempeño institucional.',
      'Modalidad de trabajo híbrida flexible.'
    ],
    steps: [
      'Postular a la vacante en el portal de empleo de BBVA.',
      'Prueba técnica de consultas SQL y lógica analítica.',
      'Entrevista con el equipo de People & Culture.',
      'Entrevista técnica con el líder del área de Analytics.'
    ]
  },
  {
    id: 'empleo-frontend-jr',
    title: 'Desarrollador Web Frontend Junior (React / JavaScript)',
    organization: 'Crehana',
    category: 'job',
    type: 'Tiempo Completo (100% Remoto)',
    typeCategory: 'remoto',
    ageRange: 'all',
    ageRangeLabel: '18 años a más',
    coverage: 'full',
    coverageLabel: 'Remuneración en USD / Planilla',
    modality: 'remote',
    location: '100% Remoto (Perú y Latinoamérica)',
    deadline: '2026-11-20',
    description: 'Buscamos un frontend apasionado para implementar interfaces intuitivas, rápidas y accesibles para la plataforma de educación online en constante crecimiento.',
    image_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
    external_link: 'https://www.crehana.com/trabaja-con-nosotros/',
    featured: true,
    requirements: [
      'Manejo sólido de JavaScript (ES6+), HTML5 y CSS3 responsivo.',
      'Experiencia creando interfaces con React, Next.js o frameworks modernos.',
      'Portafolio o proyectos personales verificables en GitHub.',
      'Autonomía para trabajar en entornos remotos y comunicación clara.'
    ],
    benefits: [
      'Trabajo 100% remoto desde cualquier lugar del Perú.',
      'Acceso ilimitado a todos los cursos de Crehana.',
      'Horarios flexibles por objetivos.',
      'Presupuesto para equipamiento de oficina en casa.'
    ],
    steps: [
      'Enviar tu postulación con enlace a tu GitHub y LinkedIn.',
      'Prueba técnica de código frontend para entregar en 48 horas.',
      'Revisión de código con uno de nuestros Tech Leads.',
      'Oferta laboral e incorporación al equipo.'
    ]
  }
];
