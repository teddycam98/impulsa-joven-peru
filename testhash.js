// Script to detect duplicate image URLs across the entire images.js system

const exactMatches = {
  "beca excelencia académica bcp": "photo-1523050854058-8df90110c9f1",
  "beca presidente de la república": "photo-1541339907198-e08756dedf3f",
  "beca generación del bicentenario": "photo-1522202176988-66273c2fd55f",
  "beca continuidad de estudios": "photo-1513258496099-48168024aec0",
  "programa reto excelencia": "photo-1517245386807-bb43f82c33c4",
  "beca alianza del pacífico": "photo-1523240795612-9a054b0db644",
  "becas fundación carolina": "photo-1555436169-20e8303010b9",
  "beca fulbright": "photo-1501504905252-473c47e087f8",
  "becas mujeres en stem": "photo-1573164713988-8665fc963095",
  "becas oea": "photo-1516321497487-e288fb19713f",
  "desarrollador full stack junior": "photo-1605379399642-870262d3d051",
  "analista de datos trainee": "photo-1551288049-bebda4e38f71",
  "asistente de marketing": "photo-1556761175-5973dc0f32d7",
  "ejecutivo de ventas corporativas": "photo-1556761175-4b46a572b786",
  "practicante profesional de rrhh": "photo-1573496359142-b8d87734a5a2",
  "diseñador gráfico junior": "photo-1561070791-2526d30994b5",
  "asistente administrativo": "photo-1497215728101-856f4ea42174",
  "ingeniero civil junior": "photo-1503387762-592deb58ef4e",
  "redactor creativo": "photo-1455390582262-044cdead27d2",
  "especialista en ciberseguridad": "photo-1550751827-4bd374c3f58b",
  "voluntariado bicentenario": "photo-1552664730-d307ca884978",
  "enseñanza de matemáticas": "photo-1577896851231-70ef18881754",
  "reforestación en la amazonía": "photo-1542601906990-b4d3fb778b09",
  "rescate de animales": "photo-1548199973-03cce0bbc87b",
  "construcción de viviendas": "photo-1589939705384-5185137a7f0f",
  "campaña de donación de sangre": "photo-1615461066841-6116e61058f4",
  "acompañamiento a adultos mayores": "photo-1573497019940-1c28c88b4f3e",
  "educación ambiental": "photo-1500382017468-9049fed747ef",
  "voluntariado digital": "photo-1593642632823-8f785ba67e45",
  "apoyo en comedores": "photo-1469571486292-0ba58a3f068b"
};

const fallbackScholarship = [
  'photo-1427504494785-3a9ca7044f45',
  'photo-1497633762265-9d179a990aa6',
  'photo-1503676260728-1c00da094a0b',
  'photo-1543269865-cbf427effbad',
  'photo-1511629091441-ee46146481b6',
  'photo-1546410531-bea4edad646a',
  'photo-1518063319789-7217e6706b04',
  'photo-1509062522246-3755977927d7',
  'photo-1522202176988-66273c2fd55f' // <-- DUPLICATE with "beca generación del bicentenario"
];

const fallbackCourse = [
  'photo-1434030216411-0b793f4b4173',
  'photo-1522071820081-009f0129c71c',
  'photo-1519389950473-47ba0277781c',
  'photo-1454165804606-c3d57bc86b40',
  'photo-1517245386807-bb43f82c33c4', // <-- DUPLICATE with "programa reto excelencia"
  'photo-1620712943543-bcc4688e7485',
  'photo-1555066931-4365d14bab8c',
  'photo-1546422904-90eab23c3d7e',
  'photo-1551288049-bebda4e38f71'    // <-- DUPLICATE with "analista de datos trainee"
];

const fallbackJob = [
  'photo-1497215728101-856f4ea42174', // <-- DUPLICATE with "asistente administrativo"
  'photo-1497366216548-37526070297c',
  'photo-1507679799987-c73779587ccf',
  'photo-1573804633927-bfcbcd909acd',
  'photo-1560250097-0b93528c311a',
  'photo-1611162617474-5b21e879e113',
  'photo-1593642632823-8f785ba67e45', // <-- DUPLICATE with "voluntariado digital"
  'photo-1534536281715-e28d76689b4d'
];

const fallbackVolunteer = [
  'photo-1559027615-cd4628902d4a',
  'photo-1488521787991-ed7bbaae773c',
  'photo-1593113589914-00ef4e562f79',
  'photo-1518398046578-8cca57782e17',
  'photo-1542601906990-b4d3fb778b09', // <-- DUPLICATE with "reforestación en la amazonía"
  'photo-1503676382389-4809596d5290',
  'photo-1532629345422-7515f3d16bb6'
];

// Collect all IDs
const allIds = [];
Object.entries(exactMatches).forEach(([k, v]) => allIds.push({ source: `exact:${k}`, id: v }));
fallbackScholarship.forEach((v, i) => allIds.push({ source: `fallback-scholarship[${i}]`, id: v }));
fallbackCourse.forEach((v, i) => allIds.push({ source: `fallback-course[${i}]`, id: v }));
fallbackJob.forEach((v, i) => allIds.push({ source: `fallback-job[${i}]`, id: v }));
fallbackVolunteer.forEach((v, i) => allIds.push({ source: `fallback-volunteer[${i}]`, id: v }));

// Find duplicates
const seen = {};
const dupes = [];
allIds.forEach(entry => {
  if (seen[entry.id]) {
    dupes.push({ id: entry.id, first: seen[entry.id], second: entry.source });
  } else {
    seen[entry.id] = entry.source;
  }
});

console.log(`\nTotal images: ${allIds.length}`);
console.log(`Unique images: ${Object.keys(seen).length}`);
console.log(`Duplicates found: ${dupes.length}\n`);
dupes.forEach(d => {
  console.log(`  DUPLICATE: ${d.id}`);
  console.log(`    1st: ${d.first}`);
  console.log(`    2nd: ${d.second}\n`);
});
