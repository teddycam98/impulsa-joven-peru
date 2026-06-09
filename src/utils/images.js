// Deterministic and Stable Image Assignment Engine
// Absolutely NO random assignment or stateful sets.

const exactMatches = {
  // BECAS
  "beca excelencia académica bcp": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=350&fit=crop", // estudiante destacado
  "beca presidente de la república": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&h=350&fit=crop", // universidad prestigiosa
  "beca generación del bicentenario": "https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?w=500&h=350&fit=crop", // estudiantes internacionales
  "beca continuidad de estudios": "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&h=350&fit=crop", // estudiante biblioteca
  "programa reto excelencia": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop", // profesional estudios
  "beca alianza del pacífico": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=350&fit=crop", // intercambio estudiantil
  "becas fundación carolina": "https://images.unsplash.com/photo-1555436169-20e8303010b9?w=500&h=350&fit=crop", // universidad española
  "beca fulbright": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&h=350&fit=crop", // universidad estadounidense
  "becas mujeres en stem": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&h=350&fit=crop", // mujer trabajando tecnología
  "becas oea – oportunidades académicas": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=350&fit=crop", // entorno académico laptop
  "becas oea - oportunidades académicas": "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=500&h=350&fit=crop",

  // EMPLEOS Y PRÁCTICAS
  "desarrollador full stack junior": "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&h=350&fit=crop", // programador múltiples pantallas
  "analista de datos trainee": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop", // dashboards
  "asistente de marketing": "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=500&h=350&fit=crop", // marketing digital
  "ejecutivo de ventas corporativas": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=350&fit=crop", // negociación
  "practicante profesional de rrhh": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=350&fit=crop", // entrevista
  "diseñador gráfico junior": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop", // branding
  "asistente administrativo": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=350&fit=crop", // oficina moderna
  "ingeniero civil junior": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&h=350&fit=crop", // construcción
  "redactor creativo": "https://images.unsplash.com/photo-1455390582262-044cdead27d2?w=500&h=350&fit=crop", // creación contenido
  "especialista en ciberseguridad": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=350&fit=crop", // hacking ético

  // VOLUNTARIADO
  "voluntariado bicentenario": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop", // jóvenes actividad cívica / manos juntas
  "enseñanza de matemáticas": "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&h=350&fit=crop", // enseñando a niños
  "reforestación en la amazonía": "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=350&fit=crop", // plantación árboles
  "rescate de animales": "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&h=350&fit=crop", // cuidando animales
  "construcción de viviendas": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&h=350&fit=crop", // construcción comunitaria
  "campaña de donación de sangre": "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=500&h=350&fit=crop", // voluntarios salud
  "acompañamiento a adultos mayores": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=350&fit=crop", // acompañando adulto mayor
  "educación ambiental": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=350&fit=crop", // aprendiendo medio ambiente
  "voluntariado digital": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=350&fit=crop", // laptop impacto social
  "apoyo en comedores": "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=350&fit=crop" // ayuda alimentaria
};

// Fallback Catalogs (Only used if the title does not perfectly match the exact array)
const fallbackCatalogs = {
  scholarship: [
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1546410531-bea4edad646a?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=350&fit=crop'
  ],
  course: [
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=350&fit=crop'
  ],
  job: [
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=500&h=350&fit=crop'
  ],
  volunteer: [
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1593113589914-00ef4e562f79?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&h=350&fit=crop'
  ],
  default: [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=350&fit=crop'
  ]
};

// Generates a deterministic, repeatable integer based on a string
function getDeterministicHash(str) {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export function getUniqueImage(opp) {
  if (!opp) return fallbackCatalogs.default[0];
  
  const title = (opp.title || '').trim();
  const normalizedTitle = title.toLowerCase();
  
  // 1. EXACT DETERMINISTIC MATCHING
  // This guarantees that the user's specific items ALWAYS get the EXACT designated image permanently.
  const matchedKey = Object.keys(exactMatches).find(key => normalizedTitle.includes(key));
  if (matchedKey) {
    return exactMatches[matchedKey];
  }

  // 2. FALLBACK DETERMINISTIC HASHING
  // For any new item not in the exact matches, we guarantee it never changes on reload by mapping its ID to an array index.
  const category = opp.category || 'scholarship';
  const targetArray = fallbackCatalogs[category] || fallbackCatalogs.default;
  
  // Hash the unique ID to mathematically lock the image index
  const uniqueKey = opp.id || normalizedTitle || "default";
  const hash = getDeterministicHash(uniqueKey);
  const stableIndex = hash % targetArray.length;
  
  return targetArray[stableIndex];
}
