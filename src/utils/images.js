// Diccionario local de imágenes generadas localmente para evitar enlaces rotos de Unsplash

export const imageMap = {
  scholarships: [
    '/images/scholarships_1.png',
    '/images/scholarships_2.png',
    '/images/estudiar.jpg'
  ],
  courses: [
    '/images/courses_1.png',
    '/images/courses_2.png',
    '/images/aprender.jpg'
  ],
  jobs: [
    '/images/jobs_1.png',
    '/images/jobs_2.png',
    '/images/trabajar.jpg'
  ],
  volunteering: [
    '/images/volunteering_1.png',
    '/images/volunteering_2.png',
    '/images/voluntariado.jpg'
  ]
};

export function getUniqueImage(category, index) {
  const images = imageMap[category] || imageMap.scholarships;
  return images[index % images.length];
}
