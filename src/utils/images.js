// Usamos un catálogo local garantizado para que las imágenes nunca se rompan y coincidan 100% con la temática
export const imageMap = {
  scholarship: [
    '/images/scholarships_1.png',
    '/images/scholarships_2.png',
    '/images/estudiar.jpg'
  ],
  course: [
    '/images/courses_1.png',
    '/images/courses_2.png',
    '/images/aprender.jpg'
  ],
  job: [
    '/images/jobs_1.png',
    '/images/jobs_2.png',
    '/images/trabajar.jpg'
  ],
  volunteer: [
    '/images/volunteering_1.png',
    '/images/volunteering_2.png',
    '/images/voluntariado.jpg'
  ]
};

export function getUniqueImage(category, index) {
  const images = imageMap[category] || imageMap.scholarship;
  return images[index % images.length];
}
