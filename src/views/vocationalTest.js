// Test Vocacional de Impulsa Joven Perú
// Basado en el modelo tipológico RIASEC y la Clasificación Nacional de Ocupaciones (CNO - Perú / MTPE / PRONABEC)

const questions = [
  {
    id: 1,
    category: 'Intereses Espontáneos',
    title: '¿Qué tipo de actividades despiertan tu curiosidad de manera natural?',
    subtitle: 'Elige la opción que más disfrutes realizar en tus tiempos libres o proyectos personales.',
    options: [
      {
        archetype: 'tech',
        icon: 'ph-code',
        title: 'Tecnología & Programación',
        desc: 'Aprender código, crear videojuegos, probar Inteligencias Artificiales o configurar computadoras.'
      },
      {
        archetype: 'eng',
        icon: 'ph-gear-fine',
        title: 'Mecánica, Minas & Construcción',
        desc: 'Desarmar aparatos, construir maquetas, entender maquinarias y optimizar procesos físicos.'
      },
      {
        archetype: 'health',
        icon: 'ph-heartbeat',
        title: 'Salud, Biología & Cuidado Humano',
        desc: 'Aprender cómo funciona el cuerpo humano, primeros auxilios, bienestar físico y nutrición.'
      },
      {
        archetype: 'biz',
        icon: 'ph-trend-up',
        title: 'Emprendimiento, Ventas & Finanzas',
        desc: 'Idear negocios, organizar presupuestos, vender productos o liderar equipos hacia metas.'
      },
      {
        archetype: 'creative',
        icon: 'ph-paint-brush-broad',
        title: 'Arte, Diseño & Medios Visuales',
        desc: 'Dibujar, ilustrar digitalmente, editar videos, tomar fotografías o crear contenido para redes.'
      },
      {
        archetype: 'social',
        icon: 'ph-scales',
        title: 'Justicia, Debate & Transformación Social',
        desc: 'Defender derechos, enseñar a otros, debatir problemas del país o hacer voluntariado solidario.'
      }
    ]
  },
  {
    id: 2,
    category: 'Resolución de Problemas',
    title: 'Ante un problema complejo en tu comunidad o colegio, ¿cuál es tu reacción inmediata?',
    subtitle: 'Piensa en cómo abordas los retos cuando nadie te dice exactamente qué hacer.',
    options: [
      {
        archetype: 'tech',
        icon: 'ph-laptop',
        title: 'Desarrollar una solución digital',
        desc: 'Diseñar una página web, un bot o una base de datos automatizada que simplifique el problema.'
      },
      {
        archetype: 'eng',
        icon: 'ph-wrench',
        title: 'Evaluar recursos y planificar la obra física',
        desc: 'Calcular materiales, diseñar un plano técnico y construir una solución práctica y duradera.'
      },
      {
        archetype: 'health',
        icon: 'ph-first-aid',
        title: 'Atender el bienestar físico y emocional',
        desc: 'Evaluar a las personas más vulnerables, brindar contención, salud y apoyo directo.'
      },
      {
        archetype: 'biz',
        icon: 'ph-briefcase',
        title: 'Conseguir financiamiento y coordinar el equipo',
        desc: 'Armar una propuesta económica, buscar patrocinadores y delegar tareas con metas claras.'
      },
      {
        archetype: 'creative',
        icon: 'ph-megaphone',
        title: 'Crear una campaña comunicacional impactante',
        desc: 'Diseñar afiches, spots de video y piezas visuales que sensibilicen a la opinión pública.'
      },
      {
        archetype: 'social',
        icon: 'ph-users-three',
        title: 'Organizar asambleas y mediar entre las partes',
        desc: 'Escuchar todas las voces, redactar acuerdos justos y exigir apoyo a las autoridades correspondientes.'
      }
    ]
  },
  {
    id: 3,
    category: 'Ambiente Profesional Ideal',
    title: '¿En qué tipo de entorno te visualizas trabajando dentro de 5 años?',
    subtitle: 'Visualiza tu jornada laboral ideal en el futuro profesional que sueñas.',
    options: [
      {
        archetype: 'tech',
        icon: 'ph-cpu',
        title: 'Empresa tecnológica o remoto global',
        desc: 'Espacios ágiles con pantallas múltiples, flexibilidad de trabajo remoto o nómada digital con código.'
      },
      {
        archetype: 'eng',
        icon: 'ph-hard-hat',
        title: 'Obras de infraestructura, plantas o minería',
        desc: 'En campo abierto, fábricas automatizadas, campamentos mineros o laboratorios de robótica.'
      },
      {
        archetype: 'health',
        icon: 'ph-hospital',
        title: 'Hospitales, clínicas o centros de investigación',
        desc: 'Consultorios médicos, laboratorios biomédicos, salas de emergencia o centros de salud comunitaria.'
      },
      {
        archetype: 'biz',
        icon: 'ph-buildings',
        title: 'Oficinas corporativas o tu propia empresa',
        desc: 'Salas de juntas, centros financieros, startups en expansión o dirigiendo tu propia marca.'
      },
      {
        archetype: 'creative',
        icon: 'ph-palette',
        title: 'Estudios de diseño, agencias o productoras',
        desc: 'Espacios creativos, sets de filmación, talleres de arquitectura o tu propio estudio freelance.'
      },
      {
        archetype: 'social',
        icon: 'ph-chalkboard-teacher',
        title: 'Aulas, juzgados, ONGs o instituciones públicas',
        desc: 'Salas de audiencia, colegios/universidades, organismos de derechos humanos o ministerios del Estado.'
      }
    ]
  },
  {
    id: 4,
    category: 'Afinidad de Materias Escolares',
    title: '¿Qué materias o asignaturas te resultaban más apasionantes en el colegio?',
    subtitle: 'Aquellas en las que las horas pasaban volando y no te costaba prestar atención.',
    options: [
      {
        archetype: 'tech',
        icon: 'ph-terminal-window',
        title: 'Computación, Lógica & Razonamiento Matemático',
        desc: 'Algoritmos, diagramas de flujo, matemáticas discretas y proyectos de informática.'
      },
      {
        archetype: 'eng',
        icon: 'ph-compass-tool',
        title: 'Física aplicada, Dibujo Técnico & Trigonometría',
        desc: 'Leyes del movimiento, cálculo de fuerzas, vectores y geometría del espacio.'
      },
      {
        archetype: 'health',
        icon: 'ph-dna',
        title: 'Biología, Anatomía, Química & Ciencias Naturales',
        desc: 'La célula, genética, sistemas del cuerpo humano, reacciones químicas y botánica.'
      },
      {
        archetype: 'biz',
        icon: 'ph-currency-circle-dollar',
        title: 'Educación Financiera, Economía & Aritmética',
        desc: 'Porcentajes, presupuestos, comercio, historia económica y proyectos de microemprendimiento.'
      },
      {
        archetype: 'creative',
        icon: 'ph-feather',
        title: 'Arte, Literatura, Comunicación Visual & Música',
        desc: 'Expresión artística, redacción creativa, teatro, análisis de imágenes y talleres culturales.'
      },
      {
        archetype: 'social',
        icon: 'ph-book-bookmark',
        title: 'Historia del Perú, Filosofía & Ciencias Sociales',
        desc: 'Civismo, derechos humanos, realidad nacional, debates de actualidad y sociología.'
      }
    ]
  },
  {
    id: 5,
    category: 'Impacto en el País',
    title: 'Si tuvieras los recursos para liderar una transformación en el Perú, ¿en qué te enfocarías?',
    subtitle: 'Elige la misión que más sentido le daría a tu esfuerzo diario.',
    options: [
      {
        archetype: 'tech',
        icon: 'ph-broadcast',
        title: 'Cerrar la brecha digital y automatizar el país',
        desc: 'Llevar conectividad de alta velocidad a zonas andinas y amazónicas con software e inteligencia artificial.'
      },
      {
        archetype: 'eng',
        icon: 'ph-bridge',
        title: 'Modernizar la infraestructura y energía sostenible',
        desc: 'Construir carreteras seguras, trenes modernos, puertos y plantas de energía solar o eólica.'
      },
      {
        archetype: 'health',
        icon: 'ph-shield-check',
        title: 'Garantizar salud digna y medicina preventiva universal',
        desc: 'Equipar postas médicas en regiones alejadas y reducir la anemia y desnutrición infantil.'
      },
      {
        archetype: 'biz',
        icon: 'ph-chart-line-up',
        title: 'Fortalecer a microempresarios y exportar al mundo',
        desc: 'Generar miles de empleos formales, capacitar en finanzas e impulsar productos peruanos en el extranjero.'
      },
      {
        archetype: 'creative',
        icon: 'ph-film-strip',
        title: 'Potenciar la cultura, el turismo y la identidad nacional',
        desc: 'Producir películas, videojuegos de historia peruana, festivales de arte y diseño de marca país.'
      },
      {
        archetype: 'social',
        icon: 'ph-hand-fist',
        title: 'Erradicar la corrupción y reformar la educación pública',
        desc: 'Hacer que las leyes se cumplan con justicia transparente y que cada niño tenga maestros de excelencia.'
      }
    ]
  },
  {
    id: 6,
    category: 'Superpoder Personal',
    title: '¿Cuál consideras que es tu mayor fortaleza o habilidad innata?',
    subtitle: 'Aquella cualidad que tus amigos, profesores o familiares reconocen en ti.',
    options: [
      {
        archetype: 'tech',
        icon: 'ph-lightning',
        title: 'Pensamiento lógico y curiosidad digital',
        desc: 'Capacidad de aprender cualquier herramienta de software rápidamente y resolver acertijos complejos.'
      },
      {
        archetype: 'eng',
        icon: 'ph-arrows-in-cardinal',
        title: 'Sentido práctico y visión espacial',
        desc: 'Facilidad para entender cómo encajan las cosas, resolver problemas manuales y medir con precisión.'
      },
      {
        archetype: 'health',
        icon: 'ph-hand-heart',
        title: 'Empatía profunda y vocación de servicio',
        desc: 'Sensibilidad para escuchar el dolor ajeno, paciencia infinita y templanza ante situaciones críticas.'
      },
      {
        archetype: 'biz',
        icon: 'ph-chats-teardrop',
        title: 'Liderazgo persuasivo y visión comercial',
        desc: 'Facilidad de palabra para convencer, entusiasmo para motivar a grupos y olfato para oportunidades.'
      },
      {
        archetype: 'creative',
        icon: 'ph-sparkle',
        title: 'Imaginación desbordante y buen gusto estético',
        desc: 'Habilidad para combinar colores, composiciones visuales, inventar historias y crear belleza.'
      },
      {
        archetype: 'social',
        icon: 'ph-scales',
        title: 'Sentido de justicia y oratoria convincente',
        desc: 'Valentía para decir la verdad, defender al desprotegido y argumentar posturas éticas con firmeza.'
      }
    ]
  }
];

const archetypes = {
  tech: {
    id: 'tech',
    title: 'Tecnología, Software e Inteligencia Artificial',
    slogan: 'El Arquitecto del Futuro Digital',
    icon: 'ph-cpu',
    color: '#00E5FF',
    desc: 'Posees un pensamiento lógico, analítico y deductivo altamente desarrollado. Tu curiosidad te lleva a querer saber cómo funcionan las tecnologías por dentro. Eres autodidacta por naturaleza, disfrutas resolver problemas abstractos y tienes el potencial para liderar la revolución de la Inteligencia Artificial y la computación en el Perú y el mundo.',
    strengths: [
      'Resolución sistemática de algoritmos complejos',
      'Curiosidad insaciable y aprendizaje técnico acelerado',
      'Pensamiento deductivo e hipotético',
      'Orientación a la automatización y eficiencia'
    ],
    careers: [
      { name: 'Ingeniería de Sistemas y Computación', type: 'Universitaria', duration: '5 años', demand: 'Demanda Crítica Internacional' },
      { name: 'Ciencia de Datos e Inteligencia Artificial', type: 'Universitaria', duration: '5 años', demand: 'Mayor crecimiento salarial en Perú' },
      { name: 'Desarrollo de Software y Cloud Computing', type: 'Técnica Superior', duration: '3 años', demand: '96% de inserción laboral inmediata' },
      { name: 'Ciberseguridad y Redes Empresariales', type: 'Técnica/Univ.', duration: '3-5 años', demand: 'Alta demanda en banca y minería' },
      { name: 'Diseño UX/UI & Producto Digital', type: 'Especialidad', duration: '2-3 años', demand: 'Conexión entre humano y tecnología' }
    ],
    institutions: [
      { name: 'Universidad Nacional de Ingeniería (UNI)', acronym: 'UNI', img: '/images/universities/uni.jpg', link: '/universidades' },
      { name: 'UTEC (Ingeniería y Tecnología)', acronym: 'UTEC', img: '/images/universities/utec.jpg', link: '/universidades' },
      { name: 'TECSUP Instituto Superior', acronym: 'TECSUP', img: '/images/universities/tecsup.jpg', link: '/universidades' },
      { name: 'CIBERTEC Tecnología Digital', acronym: 'CIBERTEC', img: '/images/universities/cibertec.jpg', link: '/universidades' },
      { name: 'UNMSM (San Marcos)', acronym: 'UNMSM', img: '/images/universities/unmsm.jpg', link: '/universidades' }
    ],
    scholarships: [
      { title: 'Beca 18 (Modalidad Talento STEM)', desc: 'Financia el 100% de la carrera, laptop y manutención mensual.' },
      { title: 'Beca Continuidad de Estudios', desc: 'Apoyo económico para mantener tu rendimiento en instituciones licenciadas.' },
      { title: 'Beca Alianza del Pacífico', desc: 'Pasantías e intercambios académicos en tecnologías avanzadas.' }
    ]
  },
  eng: {
    id: 'eng',
    title: 'Ingeniería, Industria, Minas y Operaciones',
    slogan: 'El Constructor del Progreso Físico',
    icon: 'ph-gear-fine',
    color: '#FF9100',
    desc: 'Tu mente opera de manera sumamente práctica, tridimensional y orientada a resultados tangibles. Disfrutas ver cómo las cosas se construyen, cómo se mueven las maquinarias y cómo se optimizan las operaciones industriales. Tienes gran potencial para transformar recursos naturales en infraestructura sostenible para el Perú.',
    strengths: [
      'Visión espacial tridimensional y precisión matemática',
      'Habilidad para optimizar procesos y reducir costos',
      'Pragmatismo y orientación a la seguridad operativa',
      'Capacidad de trabajo en campo y plantas industriales'
    ],
    careers: [
      { name: 'Ingeniería Civil y de Infraestructura', type: 'Universitaria', duration: '5 años', demand: 'Pilar de carreteras, puentes y puertos' },
      { name: 'Ingeniería de Minas y Metalúrgica', type: 'Universitaria', duration: '5 años', demand: 'Los sueldos más altos del mercado peruano' },
      { name: 'Ingeniería Mecatrónica y Robótica', type: 'Universitaria', duration: '5 años', demand: 'Automatización de plantas industriales' },
      { name: 'Mantenimiento de Maquinaria Pesada', type: 'Técnica Superior', duration: '3 años', demand: 'Empleabilidad superior al 95%' },
      { name: 'Ingeniería Industrial y Cadena de Suministro', type: 'Universitaria', duration: '5 años', demand: 'Dirección logística en todo sector' }
    ],
    institutions: [
      { name: 'Universidad Nacional de Ingeniería (UNI)', acronym: 'UNI', img: '/images/universities/uni.jpg', link: '/universidades' },
      { name: 'TECSUP Instituto Superior', acronym: 'TECSUP', img: '/images/universities/tecsup.jpg', link: '/universidades' },
      { name: 'SENATI Formación Profesional', acronym: 'SENATI', img: '/images/universities/senati.jpg', link: '/universidades' },
      { name: 'UNSA (Arequipa - Zona Minera)', acronym: 'UNSA', img: '/images/universities/unsa.jpg', link: '/universidades' },
      { name: 'UNCP (Huancayo - Centro Metalúrgico)', acronym: 'UNCP', img: '/images/universities/uncp.jpg', link: '/universidades' }
    ],
    scholarships: [
      { title: 'Beca 18 (Carreras Técnicas e Industriales)', desc: 'Pensión 100%, materiales de taller, seguro médico y estipendio.' },
      { title: 'Beca Canon Minero Regional', desc: 'Financiada por fondos regionales en Arequipa, Moquegua, Cusco y Áncash.' }
    ]
  },
  health: {
    id: 'health',
    title: 'Ciencias de la Salud y Bienestar Humano',
    slogan: 'El Defensor de la Vida y la Salud',
    icon: 'ph-heartbeat',
    color: '#00E676',
    desc: 'Tu vocación primordial es el servicio y el cuidado incondicional de la vida. Posees una sensibilidad especial ante el dolor de las personas combinada con rigor científico y templanza para actuar en emergencias. Tienes la disciplina para sumergirte en los misterios de la biología y la medicina para salvar vidas.',
    strengths: [
      'Empatía clínica y escucha activa profunda',
      'Resiliencia emocional bajo situaciones de estrés',
      'Rigor científico y observación de detalles biológicos',
      'Compromiso ético inquebrantable con la comunidad'
    ],
    careers: [
      { name: 'Medicina Humana', type: 'Universitaria', duration: '7 años', demand: 'Máxima vocación diagnóstica y hospitalaria' },
      { name: 'Enfermería y Cuidados Especializados', type: 'Universitaria/Téc.', duration: '3-5 años', demand: 'Columna vertebral del sistema de salud' },
      { name: 'Psicología Clínica y de la Salud', type: 'Universitaria', duration: '5 años', demand: 'Demanda exponencial en salud mental' },
      { name: 'Tecnología Médica (Terapia / Laboratorio)', type: 'Universitaria', duration: '5 años', demand: 'Diagnóstico biomédico avanzado' },
      { name: 'Farmacia y Bioquímica', type: 'Universitaria', duration: '5 años', demand: 'Investigación farmacológica e inmunología' }
    ],
    institutions: [
      { name: 'UNMSM (Facultad de Medicina San Fernando)', acronym: 'UNMSM', img: '/images/universities/unmsm.jpg', link: '/universidades' },
      { name: 'UPCH (Cayetano Heredia)', acronym: 'UPCH', img: '/images/universities/upch.jpg', link: '/universidades' },
      { name: 'UCSM (Arequipa)', acronym: 'UCSM', img: '/images/universities/ucsm.jpg', link: '/universidades' },
      { name: 'USMP (Facultad de Medicina)', acronym: 'USMP', img: '/images/universities/usmp.jpg', link: '/universidades' }
    ],
    scholarships: [
      { title: 'Beca 18 (Medicina y Ciencias de la Salud)', desc: 'Cubre el internado médico completo, seguro y subvención alimentaria.' },
      { title: 'Beca Vocación en Salud Comunitaria', desc: 'Estudios enfocados en fortalecer la salud primaria en regiones.' }
    ]
  },
  biz: {
    id: 'biz',
    title: 'Negocios, Finanzas y Emprendimiento',
    slogan: 'El Estratega del Crecimiento y la Innovación',
    icon: 'ph-trend-up',
    color: '#FFD600',
    desc: 'Posees visión estratégica, olfato comercial y energía para movilizar personas y recursos hacia metas ambiciosas. Donde otros ven obstáculos, tú ves modelos de negocio escalables. Disfrutas el liderazgo de proyectos, el análisis de mercados y la creación de valor económico y social.',
    strengths: [
      'Liderazgo inspirador y delegación estratégica',
      'Negociación persuasiva y habilidades comerciales',
      'Pensamiento financiero y análisis de rentabilidad',
      'Agilidad para adaptarse a tendencias del mercado'
    ],
    careers: [
      { name: 'Administración de Empresas y Dirección', type: 'Universitaria', duration: '5 años', demand: 'Versatilidad para liderar cualquier organización' },
      { name: 'Finanzas Corporativas y Mercado de Capitales', type: 'Universitaria', duration: '5 años', demand: 'Alta demanda en banca e inversiones' },
      { name: 'Marketing Digital y Growth Hacking', type: 'Universitaria/Téc.', duration: '3-5 años', demand: 'Adquisición de clientes y marcas digitales' },
      { name: 'Negocios Internacionales y Comercio Exterior', type: 'Universitaria', duration: '5 años', demand: 'Exportación agroindustrial y logística global' },
      { name: 'Gestión Comercial y Ventas Consultivas', type: 'Técnica Superior', duration: '3 años', demand: 'Inserción rápida con comisiones competitivas' }
    ],
    institutions: [
      { name: 'Universidad de Lima (ULIMA)', acronym: 'ULIMA', img: '/images/universities/ulima.jpg', link: '/universidades' },
      { name: 'Escuela Superior La Pontificia (ELP)', acronym: 'ELP', img: '/images/elp_card.jpg', link: '/universidades' },
      { name: 'UPC (Negocios y Finanzas)', acronym: 'UPC', img: '/images/universities/upc.jpg', link: '/universidades' },
      { name: 'USIL (Emprendimiento Internacional)', acronym: 'USIL', img: '/images/universities/usil.jpg', link: '/universidades' },
      { name: 'UNMSM (Facultad de Ciencias Administrativas)', acronym: 'UNMSM', img: '/images/universities/unmsm.jpg', link: '/universidades' }
    ],
    scholarships: [
      { title: 'Beca 18 (Administración y Finanzas)', desc: 'Estudios 100% financiados en las escuelas de negocios líderes del país.' },
      { title: 'Beca Bicentenario de Innovación', desc: 'Financiamiento para jóvenes con vocación emprendedora y de impacto social.' }
    ]
  },
  creative: {
    id: 'creative',
    title: 'Diseño, Creatividad, Medios y Arte',
    slogan: 'El Creador de Experiencias Visuales y Cultura',
    icon: 'ph-paint-brush-broad',
    color: '#E040FB',
    desc: 'Tienes una sensibilidad estética excepcional y un pensamiento lateral que genera ideas disruptivas. Comunican emociones mediante imágenes, formas, colores y relatos cautivadores. Tienes el talento para convertir la riqueza cultural y visual del Perú en productos creativos con impacto mundial.',
    strengths: [
      'Pensamiento divergente e imaginación visual',
      'Sensibilidad estética, composición y colorimetría',
      'Narrativa audiovisual y storytelling de marcas',
      'Dominio de software creativo y producción digital'
    ],
    careers: [
      { name: 'Diseño Gráfico Publicitario y Branding', type: 'Universitaria/Téc.', duration: '3-5 años', demand: 'Identidad visual para marcas y startups' },
      { name: 'Comunicación Audiovisual y Cine', type: 'Universitaria', duration: '5 años', demand: 'Producción de video, streaming y cine' },
      { name: 'Animación Digital y Efectos Visuales (VFX)', type: 'Técnica/Univ.', duration: '3-5 años', demand: 'Industria del videojuego y entretenimiento' },
      { name: 'Arquitectura y Urbanismo Sostenible', type: 'Universitaria', duration: '5 años', demand: 'Diseño de espacios armónicos con el entorno' },
      { name: 'Diseño de Moda y Gestión Textil', type: 'Técnica/Univ.', duration: '3-5 años', demand: 'Valor agregado a fibras peruanas de alpaca/algodón' }
    ],
    institutions: [
      { name: 'PUCP (Facultad de Arte y Diseño)', acronym: 'PUCP', img: '/images/universities/pucp.jpg', link: '/universidades' },
      { name: 'UPC (Comunicaciones y Diseño)', acronym: 'UPC', img: '/images/universities/upc.jpg', link: '/universidades' },
      { name: 'Escuela Superior La Pontificia (ELP)', acronym: 'ELP', img: '/images/elp_card.jpg', link: '/universidades' },
      { name: 'CIBERTEC (Diseño y Animación Digital)', acronym: 'CIBERTEC', img: '/images/universities/cibertec.jpg', link: '/universidades' }
    ],
    scholarships: [
      { title: 'Beca 18 (Modalidad Talento Escolar)', desc: 'Financia carreras creativas y de diseño en institutos y universidades licenciadas.' },
      { title: 'Beca Hijos de Docentes', desc: 'Cobertura total de matrícula, mensualidad y materiales para proyectos de grado.' }
    ]
  },
  social: {
    id: 'social',
    title: 'Sociedad, Derecho, Educación y Gobernanza',
    slogan: 'El Defensor de la Justicia y el Desarrollo Humano',
    icon: 'ph-scales',
    color: '#2979FF',
    desc: 'Tu principal motivación es la justicia social, la defensa de los derechos fundamentales y la transformación de la sociedad a través de la educación y las leyes. Posees una oratoria natural, pensamiento crítico y convicción ética para liderar cambios en tu comunidad y en el Estado.',
    strengths: [
      'Argumentación lógica y oratoria persuasiva',
      'Pensamiento crítico sobre la realidad nacional',
      'Mediación de conflictos y concertación ciudadana',
      'Vocación formativa y compromiso con la equidad'
    ],
    careers: [
      { name: 'Derecho y Ciencias Políticas', type: 'Universitaria', duration: '6 años', demand: 'Defensa constitucional, penal, civil y corporativa' },
      { name: 'Educación Inicial, Primaria o Secundaria', type: 'Universitaria', duration: '5 años', demand: 'Formación de las futuras generaciones del Perú' },
      { name: 'Relaciones Internacionales y Diplomacia', type: 'Universitaria', duration: '5 años', demand: 'Representación del Perú en foros globales' },
      { name: 'Trabajo Social y Gestión Comunitaria', type: 'Universitaria', duration: '5 años', demand: 'Intervención en comunidades y proyectos sociales' },
      { name: 'Economía Pública y Políticas Sociales', type: 'Universitaria', duration: '5 años', demand: 'Diseño de programas para reducir la pobreza' }
    ],
    institutions: [
      { name: 'UNMSM (Derecho y Educación)', acronym: 'UNMSM', img: '/images/universities/unmsm.jpg', link: '/universidades' },
      { name: 'PUCP (Derecho y Ciencias Sociales)', acronym: 'PUCP', img: '/images/universities/pucp.jpg', link: '/universidades' },
      { name: 'UNSCH (Universidad de Huamanga Ayacucho)', acronym: 'UNSCH', img: '/images/universities/unsch.jpg', link: '/universidades' },
      { name: 'UNT (Universidad Nacional de Trujillo)', acronym: 'UNT', img: '/images/universities/unt.jpg', link: '/universidades' },
      { name: 'Escuela Superior La Pontificia', acronym: 'ELP', img: '/images/elp_card.jpg', link: '/universidades' }
    ],
    scholarships: [
      { title: 'Beca Vocación de Maestro', desc: '100% financiada por PRONABEC para las mejores universidades pedagógicas del país.' },
      { title: 'Beca 18 (Modalidad Ordinaria y Comunidades Nativas)', desc: 'Cubre vivienda, alimentación, materiales y titulación.' }
    ]
  }
};

let currentStep = 0;
let userSelections = {};

export function renderVocationalTest() {
  currentStep = 0;
  userSelections = {};

  return `
    <div class="inner-page" style="padding-top: 110px; padding-bottom: 70px;">
      <div class="container" style="max-width: 900px; margin: 0 auto; padding: 0 20px;">
        
        <!-- Header Section -->
        <div class="v-header-block animate-on-scroll">
          <div class="v-badge-pill">
            <i class="ph-fill ph-compass text-yellow"></i>
            <span>ORIENTACIÓN VOCACIONAL GRATUITA</span>
          </div>
          <h1 class="v-main-title">
            Descubre tu <span class="text-yellow">Vocación Profesional</span>
          </h1>
          <p class="v-subtitle">
            Responde 6 preguntas situacionales adaptadas a la realidad del Perú. Descubrirás tus arquetipos predominantes, las carreras más demandadas, universidades aliadas y becas oficiales para financiar tus estudios.
          </p>
        </div>

        <!-- Wizard Container Card -->
        <div id="vWizardContainer" class="v-wizard-card">
          
          <!-- Top Progress Section -->
          <div class="v-progress-header">
            <div class="v-progress-meta">
              <span class="v-step-badge" id="vStepBadge">Pregunta 1 de 6</span>
              <span class="v-category-tag" id="vCategoryTag">Intereses Espontáneos</span>
            </div>
            <div class="v-progress-bar-track">
              <div id="vProgressBarFill" class="v-progress-bar-fill" style="width: 16.66%;"></div>
            </div>
          </div>

          <!-- Active Question Area -->
          <div id="vQuestionContent" class="v-question-area">
            <!-- Dynamically populated -->
          </div>

          <!-- Bottom Nav Controls -->
          <div class="v-wizard-footer">
            <button id="vPrevBtn" class="btn-wizard-prev" style="visibility: hidden;">
              <i class="ph ph-arrow-left"></i> Anterior
            </button>
            <div class="v-wizard-status-text" id="vSelectionHint">
              Selecciona una opción para avanzar
            </div>
            <button id="vNextBtn" class="btn-wizard-next" disabled>
              <span id="vNextBtnLabel">Siguiente</span> <i class="ph ph-arrow-right"></i>
            </button>
          </div>

        </div>

        <!-- Results Dashboard Container (Hidden Initially) -->
        <div id="vResultsDashboard" class="v-results-dashboard hidden">
          <!-- Dynamically populated when test completes -->
        </div>

      </div>
    </div>
  `;
}

function renderCurrentQuestion() {
  const q = questions[currentStep];
  if (!q) return;

  const percent = Math.round(((currentStep + 1) / questions.length) * 100);
  const progressBar = document.getElementById('vProgressBarFill');
  const stepBadge = document.getElementById('vStepBadge');
  const categoryTag = document.getElementById('vCategoryTag');
  const prevBtn = document.getElementById('vPrevBtn');
  const nextBtn = document.getElementById('vNextBtn');
  const nextBtnLabel = document.getElementById('vNextBtnLabel');
  const hint = document.getElementById('vSelectionHint');

  if (progressBar) progressBar.style.width = `${percent}%`;
  if (stepBadge) stepBadge.textContent = `Pregunta ${currentStep + 1} de ${questions.length}`;
  if (categoryTag) categoryTag.textContent = q.category;

  if (prevBtn) {
    prevBtn.style.visibility = currentStep > 0 ? 'visible' : 'hidden';
  }

  const selectedArch = userSelections[q.id];

  if (nextBtn) {
    nextBtn.disabled = !selectedArch;
    if (nextBtnLabel) {
      nextBtnLabel.textContent = currentStep === questions.length - 1 ? 'Ver Mi Perfil Vocacional' : 'Siguiente';
    }
  }

  if (hint) {
    hint.textContent = selectedArch ? 'Opción guardada. Haz clic en siguiente para continuar.' : 'Selecciona una opción para continuar.';
  }

  const questionArea = document.getElementById('vQuestionContent');
  if (!questionArea) return;

  questionArea.innerHTML = `
    <div class="v-question-header">
      <h2 class="v-q-title">${q.title}</h2>
      <p class="v-q-subtitle">${q.subtitle}</p>
    </div>

    <div class="v-options-grid">
      ${q.options.map((opt) => {
        const isSelected = selectedArch === opt.archetype;
        return `
          <div class="v-option-card ${isSelected ? 'selected' : ''}" data-archetype="${opt.archetype}">
            <div class="v-opt-icon-box">
              <i class="ph-fill ${opt.icon}"></i>
            </div>
            <div class="v-opt-text">
              <h3 class="v-opt-title">${opt.title}</h3>
              <p class="v-opt-desc">${opt.desc}</p>
            </div>
            <div class="v-opt-radio">
              <i class="ph-fill ${isSelected ? 'ph-check-circle' : 'ph-circle'}"></i>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  questionArea.querySelectorAll('.v-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const arch = card.getAttribute('data-archetype');
      userSelections[q.id] = arch;

      questionArea.querySelectorAll('.v-option-card').forEach(c => {
        c.classList.remove('selected');
        const icon = c.querySelector('.v-opt-radio i');
        if (icon) {
          icon.className = 'ph-fill ph-circle';
        }
      });

      card.classList.add('selected');
      const activeIcon = card.querySelector('.v-opt-radio i');
      if (activeIcon) {
        activeIcon.className = 'ph-fill ph-check-circle';
      }

      if (nextBtn) nextBtn.disabled = false;
      if (hint) hint.textContent = '¡Opción seleccionada!';

      if (currentStep < questions.length - 1) {
        setTimeout(() => {
          if (userSelections[q.id] === arch) {
            currentStep++;
            renderCurrentQuestion();
          }
        }, 320);
      }
    });
  });
}

function calculateAndShowResults() {
  const scores = { tech: 0, eng: 0, health: 0, biz: 0, creative: 0, social: 0 };

  Object.values(userSelections).forEach(arch => {
    if (scores[arch] !== undefined) {
      scores[arch]++;
    }
  });

  const sortedArchetypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryKey = sortedArchetypes[0][0];
  const secondaryKey = sortedArchetypes[1][0];

  const primary = archetypes[primaryKey] || archetypes.tech;
  const secondary = archetypes[secondaryKey] || archetypes.biz;

  const topScore = sortedArchetypes[0][1];
  const secondScore = sortedArchetypes[1][1];

  const matchPercent = Math.min(99, Math.round(84 + (topScore / 6) * 15));
  const secondaryPercent = Math.min(90, Math.round(65 + (secondScore / 6) * 20));

  const wizardContainer = document.getElementById('vWizardContainer');
  const resultsDashboard = document.getElementById('vResultsDashboard');

  if (wizardContainer) wizardContainer.classList.add('hidden');
  if (resultsDashboard) {
    resultsDashboard.classList.remove('hidden');
    resultsDashboard.innerHTML = `
      <!-- Trophy & Result Header -->
      <div class="v-result-hero animate-on-scroll">
        <div class="v-trophy-circle" style="border-color: ${primary.color}; box-shadow: 0 0 35px ${primary.color}44;">
          <i class="ph-fill ${primary.icon}" style="color: ${primary.color}; font-size: 2.8rem;"></i>
        </div>
        <div class="v-result-eyebrow">TU PERFIL VOCACIONAL PREDOMINANTE</div>
        <h2 class="v-result-archetype-title" style="color: ${primary.color};">
          ${primary.title}
        </h2>
        <div class="v-result-slogan">"${primary.slogan}"</div>

        <div class="v-match-capsule">
          <span class="v-match-score">${matchPercent}%</span>
          <span class="v-match-label">Afinidad Vocacional Directa</span>
        </div>

        <p class="v-result-summary">${primary.desc}</p>
      </div>

      <!-- Strengths & Work Style Grid -->
      <div class="v-details-grid">
        <div class="v-detail-card">
          <div class="v-card-badge"><i class="ph-fill ph-lightning text-yellow"></i> TUS FORTALEZAS CLAVE</div>
          <ul class="v-features-list">
            ${primary.strengths.map(s => `<li><i class="ph-fill ph-check-circle"></i> <span>${s}</span></li>`).join('')}
          </ul>
        </div>

        <div class="v-detail-card">
          <div class="v-card-badge"><i class="ph-fill ph-circles-three text-yellow"></i> PERFIL SECUNDARIO (COMPLEMENTARIO)</div>
          <div class="v-secondary-pill">
            <i class="ph-fill ${secondary.icon}"></i>
            <strong>${secondary.title}</strong>
            <span class="v-sec-percent">${secondaryPercent}% afinidad</span>
          </div>
          <p class="v-sec-desc">${secondary.desc.substring(0, 220)}...</p>
        </div>
      </div>

      <!-- Recommended Careers in Peru -->
      <div class="v-careers-section">
        <div class="v-section-header">
          <i class="ph-fill ph-graduation-cap text-yellow"></i>
          <h3>Carreras Recomendadas de Mayor Demanda en el Perú</h3>
        </div>
        <div class="v-careers-grid">
          ${primary.careers.map(c => `
            <div class="v-career-item">
              <div class="v-career-top">
                <span class="v-career-type">${c.type}</span>
                <span class="v-career-duration"><i class="ph ph-clock"></i> ${c.duration}</span>
              </div>
              <h4 class="v-career-name">${c.name}</h4>
              <div class="v-career-demand">
                <i class="ph-fill ph-trend-up"></i> ${c.demand}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Recommended Universities in Peru -->
      <div class="v-unis-section">
        <div class="v-section-header">
          <i class="ph-fill ph-buildings text-yellow"></i>
          <h3>Dónde Estudiar en el Perú (Instituciones Aliadas)</h3>
        </div>
        <div class="v-unis-grid">
          ${primary.institutions.map(u => `
            <a href="${u.link}" data-link class="v-uni-card">
              <div class="v-uni-img-wrapper">
                <img src="${u.img}" alt="${u.name}" class="v-uni-cover" />
                <div class="v-uni-tag">${u.acronym}</div>
              </div>
              <div class="v-uni-info">
                <h4>${u.name}</h4>
                <span class="v-uni-link-text">Ver perfil institucional <i class="ph ph-arrow-right"></i></span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Recommended Official Scholarships -->
      <div class="v-scholarships-section">
        <div class="v-section-header">
          <i class="ph-fill ph-award text-yellow"></i>
          <h3>Becas y Financiamiento Oficial Compatible</h3>
        </div>
        <div class="v-scholarships-grid">
          ${primary.scholarships.map(b => `
            <div class="v-scholarship-card">
              <div class="v-scholarship-icon"><i class="ph-fill ph-sparkle"></i></div>
              <div class="v-scholarship-content">
                <h4>${b.title}</h4>
                <p>${b.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Action Buttons Row -->
      <div class="v-result-actions">
        <a href="/universidades" data-link class="btn btn-yellow" style="padding: 16px 30px; font-weight: 800;">
          <i class="ph-fill ph-buildings"></i> Explorar Universidades
        </a>
        <a href="/becas" data-link class="btn btn-outline" style="padding: 16px 28px;">
          <i class="ph-fill ph-graduation-cap"></i> Ver Becas Vigentes
        </a>
        <button id="vShareBtn" class="btn btn-outline" style="padding: 16px 24px;">
          <i class="ph-fill ph-share-network"></i> Compartir Resultado
        </button>
        <button id="vRetryBtn" class="btn btn-outline" style="padding: 16px 24px; color: rgba(255,255,255,0.7);">
          <i class="ph ph-arrow-counter-clockwise"></i> Repetir Test
        </button>
      </div>

      <!-- Feedback Toast -->
      <div id="vToast" class="v-toast hidden">
        <i class="ph-fill ph-check-circle"></i> ¡Resumen de perfil copiado al portapapeles!
      </div>
    `;

    const shareBtn = document.getElementById('vShareBtn');
    const toast = document.getElementById('vToast');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const textToShare = `¡Descubrí mi perfil vocacional en Impulsa Joven Perú!\n🎯 Perfil: ${primary.title} (${primary.slogan})\n📊 Compatibilidad: ${matchPercent}%\nCarreras sugeridas: ${primary.careers.map(c => c.name).join(', ')}.\nHaz tu test gratuito en: https://impulsa-joven-peru.vercel.app/vocacional`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(textToShare).then(() => {
            if (toast) {
              toast.classList.remove('hidden');
              setTimeout(() => toast.classList.add('hidden'), 3500);
            }
          });
        }
      });
    }

    const retryBtn = document.getElementById('vRetryBtn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        currentStep = 0;
        userSelections = {};
        if (resultsDashboard) resultsDashboard.classList.add('hidden');
        if (wizardContainer) wizardContainer.classList.remove('hidden');
        renderCurrentQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function initVocationalTest() {
  currentStep = 0;
  userSelections = {};

  const prevBtn = document.getElementById('vPrevBtn');
  const nextBtn = document.getElementById('vNextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 0) {
        currentStep--;
        renderCurrentQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const q = questions[currentStep];
      if (!userSelections[q.id]) return;

      if (currentStep < questions.length - 1) {
        currentStep++;
        renderCurrentQuestion();
      } else {
        calculateAndShowResults();
      }
    });
  }

  renderCurrentQuestion();
}
