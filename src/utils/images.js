// Diccionario local de imágenes únicas de alta calidad de Unsplash

export const imageMap = {
  scholarships: [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    'https://images.unsplash.com/photo-1510511459019-5efa3702469d?w=800&q=80',
    'https://images.unsplash.com/photo-1532612825000-848e04b4c465?w=800&q=80',
    'https://images.unsplash.com/photo-1546410531-bea5aadcb6ce?w=800&q=80',
    'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=80',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80'
  ],
  courses: [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80'
  ],
  jobs: [
    'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    'https://images.unsplash.com/photo-1497032205567-50458a802978?w=800&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80'
  ],
  volunteering: [
    'https://images.unsplash.com/photo-1593113580332-ceb47bf28cb3?w=800&q=80',
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
    'https://images.unsplash.com/photo-1526976663112-00a52520c4d4?w=800&q=80',
    'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
    'https://images.unsplash.com/photo-1531206715517-5c0ba140b4b8?w=800&q=80'
  ]
};

export function getUniqueImage(category, index) {
  const images = imageMap[category] || imageMap.scholarships;
  return images[index % images.length];
}
