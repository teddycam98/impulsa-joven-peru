// Thematic Unsplash Image Catalogs (High Quality, Fast Loading)
const unsplashCatalogs = {
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=350&fit=crop'
  ],
  engineering: [
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=500&h=350&fit=crop'
  ],
  health: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500&h=350&fit=crop'
  ],
  nature: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?w=500&h=350&fit=crop'
  ],
  business: [
    'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=350&fit=crop'
  ],
  art: [
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=500&h=350&fit=crop'
  ],
  education: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=350&fit=crop'
  ],
  volunteer: [
    'https://images.unsplash.com/photo-1593113589914-00ef4e562f79?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1526976663112-00d1b51c5f72?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=350&fit=crop',
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=350&fit=crop'
  ]
};

// Global tracker to force uniqueness across sequential renders
let globalIndex = 0;

export function getUniqueImage(category, seedString, title = '') {
  const t = title.toLowerCase();
  let keyword = category;
  
  if (t.includes('tecno') || t.includes('software') || t.includes('datos') || t.includes('digital') || t.includes('ti') || t.includes('sistemas') || t.includes('programación') || t.includes('python') || t.includes('react') || t.includes('frontend')) keyword = 'technology';
  else if (t.includes('matemática') || t.includes('ingeniería') || t.includes('ciencia')) keyword = 'engineering';
  else if (t.includes('salud') || t.includes('psicología') || t.includes('médico')) keyword = 'health';
  else if (t.includes('ambiente') || t.includes('reforestación') || t.includes('animales') || t.includes('naturaleza') || t.includes('rescate')) keyword = 'nature';
  else if (t.includes('arte') || t.includes('diseño') || t.includes('cultura')) keyword = 'art';
  else if (t.includes('negocio') || t.includes('marketing') || t.includes('finanzas') || t.includes('administración') || t.includes('banco') || t.includes('bcp')) keyword = 'business';
  else if (t.includes('enseñanza') || t.includes('educación') || t.includes('colegio') || t.includes('minedu')) keyword = 'education';
  
  // Resolve array
  let array = unsplashCatalogs[keyword] || unsplashCatalogs[category] || unsplashCatalogs['education'];
  
  if (!array || array.length === 0) {
    array = unsplashCatalogs['education'];
  }
  
  // Iterate globally to ensure 100% uniqueness until array wraps around
  const img = array[globalIndex % array.length];
  globalIndex++;
  
  return img;
}
