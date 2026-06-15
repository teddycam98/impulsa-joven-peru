// =============================================================================
// DETERMINISTIC IMAGE ASSIGNMENT ENGINE
// Each opportunity is mapped by its EXACT database ID to a UNIQUE image.
// This guarantees: zero repetition, zero randomness, zero change on reload.
// =============================================================================

// Direct ID → Image mapping. Every single opportunity in the database
// has its own unique, hand-picked Unsplash image that matches its content.
const imageById = {
  // ═══════════════════════════════════════════════════════════
  // COURSES (10)
  // ═══════════════════════════════════════════════════════════

  // Análisis de Datos con Python
  '00c208ae-c6fe-4119-aa54-ca007a72d38b': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=350&fit=crop',
  // Desarrollo de Habilidades Blandas
  '97ef6247-e848-4dd2-898b-5fa2e7fe3af8': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop',
  // Diseño UX/UI Avanzado
  'c651af8a-4efc-4485-ad41-3e8e1601a989': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop',
  // Finanzas Personales para Jóvenes
  '0f5d4f3b-d257-406b-9d17-df688996c064': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=350&fit=crop',
  // Fotografía Digital Profesional
  '9af12704-5459-4f00-8699-d68f1fa9183f': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=500&h=350&fit=crop',
  // Gestión de Proyectos Ágiles
  '84a68871-1f5e-4a2a-8c35-5f179c08024c': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&h=350&fit=crop',
  // Inglés para Negocios B2
  'd4ae724d-56b3-41ea-8251-24ccf7f13410': 'https://images.unsplash.com/photo-1546410531-bea4edad646a?w=500&h=350&fit=crop',
  // Inteligencia Artificial para Todos
  '4161f065-e8b4-4f88-87ca-6ead18bfb6e1': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=350&fit=crop',
  // Introducción al Marketing Digital
  '154cac21-031f-4783-bb50-1666a637fb92': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop',
  // Programación Frontend con React
  '278b2dd9-d4ee-4287-a05f-fdb2bd4ca829': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=350&fit=crop',

  // ═══════════════════════════════════════════════════════════
  // JOBS (10)
  // ═══════════════════════════════════════════════════════════

  // Analista de Datos Trainee
  'fad69055-3aef-4af6-9494-9dbdef44999d': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop',
  // Asistente Administrativo
  'e2f20128-ff83-4aa3-9f8c-b1898542e198': 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=350&fit=crop',
  // Asistente de Marketing
  '0d6ea17d-ca9b-4a4f-8135-8a157b6d3211': 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=500&h=350&fit=crop',
  // Desarrollador Full Stack Junior
  'bc9f0a04-839f-481c-8558-1874c25b6c37': 'https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&h=350&fit=crop',
  // Diseñador Gráfico Junior
  'db4836d4-f625-410c-9640-3ec21cff1adf': 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&h=350&fit=crop',
  // Ejecutivo de Ventas Corporativas
  'ca5d27a9-6b9b-4409-b48b-1d530def24f7': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=350&fit=crop',
  // Especialista en Ciberseguridad
  '5bca4e08-8a27-4d06-bf43-d1d0fe4df401': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=350&fit=crop',
  // Ingeniero Civil Junior
  '0ebaf776-38d7-41b6-8ffc-eb5b8b63df77': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=350&fit=crop',
  // Practicante Profesional de RRHH
  '099b101c-a6ca-4bf4-b3f4-76cb82914499': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=350&fit=crop',
  // Redactor Creativo
  '3d2161e9-6ef3-4772-8be8-dd876f57ff54': 'https://images.unsplash.com/photo-1455390582262-044cdead27d2?w=500&h=350&fit=crop',

  // ═══════════════════════════════════════════════════════════
  // SCHOLARSHIPS (10)
  // ═══════════════════════════════════════════════════════════

  // Beca Alianza del Pacífico
  '49a6782b-4ec7-46bf-90b0-e92941b9573e': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=350&fit=crop',
  // Beca Continuidad de Estudios
  'eca4e9d6-59a8-4116-8fe0-c455e47e1b3c': 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&h=350&fit=crop',
  // Beca Excelencia Académica BCP
  '7c7c4a3d-0191-45c4-8f09-5f671737ab57': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=350&fit=crop',
  // Beca Fulbright
  'ff892434-e7ac-401f-90a4-0058b9e16c9e': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=350&fit=crop',
  // Beca Generación del Bicentenario
  '38e2629a-d69d-45a1-859e-75e0c66fb978': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=350&fit=crop',
  // Beca Mujeres en STEM
  '08439e48-a48c-4634-b0b5-145ce8bd6845': 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&h=350&fit=crop',
  // Beca Presidente de la República
  'd6904f97-2d48-46e1-8697-62d7ab33bcb3': 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=500&h=350&fit=crop',
  // Becas Fundación Carolina
  '299d2deb-d997-4b01-96ad-e060c6f95eb8': 'https://images.unsplash.com/photo-1555436169-20e8303010b9?w=500&h=350&fit=crop',
  // Becas OEA - Oportunidades Académicas
  '62c2b6bf-cff7-4707-9d09-0d26ed630080': 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=350&fit=crop',
  // Programa Reto Excelencia
  '252daad8-573a-40cb-9e4a-48e7e44a0068': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop',

  // ═══════════════════════════════════════════════════════════
  // VOLUNTEER (10)
  // ═══════════════════════════════════════════════════════════

  // Acompañamiento a Adultos Mayores
  '3a7e5eee-178d-4f37-a56b-3cec968a7735': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&h=350&fit=crop',
  // Apoyo en Comedores Populares
  '8ed95da8-57fb-4ed6-8c1b-fcb8316f72a0': 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=350&fit=crop',
  // Campaña de Donación de Sangre
  '866c2c99-6acc-4642-86d7-15257ef454b8': 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&h=350&fit=crop',
  // Construcción de Viviendas
  'c44069f4-6416-4507-8775-670ddd3ad007': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=350&fit=crop',
  // Educación Ambiental
  '94cc5324-c095-499e-a947-5adebbae15fd': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=350&fit=crop',
  // Enseñanza de Matemáticas
  'bc1c79ce-a8de-4a54-af99-82729a9c761a': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=350&fit=crop',
  // Reforestación en la Amazonía
  '3b9469d3-bea3-4df7-80ef-fd0196e75b3a': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=350&fit=crop',
  // Rescate de Animales
  '45b23fcc-d449-436d-bd0e-f6d38ab5184a': 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=350&fit=crop',
  // Voluntariado Bicentenario
  '45182008-c8ac-47c1-95d4-f2aa693596e7': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop',
  // Voluntariado Digital
  'da77ed09-9ac0-4a1b-b8be-a96e228f5da5': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=350&fit=crop'
};

// Fallback for future opportunities added via admin panel
const fallbackByCategory = {
  scholarship: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&h=350&fit=crop'
  ],
  course: [
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=350&fit=crop'
  ],
  job: [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=500&h=350&fit=crop'
  ],
  volunteer: [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1593113589914-00ef4e562f79?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&h=350&fit=crop'
  ],
  competition: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1591115765373-5f9b24f0b3d4?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=350&fit=crop'
  ],
  default: [
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=350&fit=crop'
  ]
};

// Deterministic hash for fallback (only for NEW opportunities not in the map)
function getDeterministicHash(str) {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getUniqueImage(opp) {
  if (!opp) return fallbackByCategory.default[0];

  // 1. DIRECT ID LOOKUP — guaranteed unique per opportunity
  if (opp.id && imageById[opp.id]) {
    return imageById[opp.id];
  }

  // 2. FALLBACK for future admin-created opportunities
  const category = opp.category || 'scholarship';
  const arr = fallbackByCategory[category] || fallbackByCategory.default;
  const key = opp.id || opp.title || 'default';
  const idx = getDeterministicHash(key) % arr.length;
  return arr[idx];
}
