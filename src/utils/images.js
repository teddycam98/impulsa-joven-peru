// Complete local image catalog — every card gets a unique, thematic image
export const imageMap = {
  scholarship: [
    '/images/beca1.jpg', '/images/beca2.jpg', '/images/beca3.jpg', '/images/beca4.jpg', '/images/beca5.jpg',
    '/images/scholarships_1.png', '/images/scholarships_2.png'
  ],
  course: [
    '/images/curso1.jpg', '/images/curso2.jpg', '/images/curso3.jpg', '/images/curso4.jpg', '/images/curso5.jpg',
    '/images/courses_1.png', '/images/courses_2.png'
  ],
  job: [
    '/images/job1.jpg', '/images/job2.jpg', '/images/job3.jpg', '/images/job4.jpg', '/images/job5.jpg',
    '/images/jobs_1.png', '/images/jobs_2.png'
  ],
  volunteer: [
    '/images/vol1.jpg', '/images/vol2.jpg', '/images/vol3.jpg', '/images/vol4.jpg',
    '/images/volunteering_1.png', '/images/volunteering_2.png'
  ]
};

export function getUniqueImage(category, seedString, title = '') {
  // Use string hash for seed
  const str = String(seedString || Math.random());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const seed = (Math.abs(hash) % 1000) + 1;
  
  // Use Pollinations AI to generate a beautiful, highly relevant image based directly on the title!
  const promptText = title ? `${title} concept, modern, cinematic lighting, high quality` : `${category} concept, modern, cinematic lighting, high quality`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(promptText)}?width=500&height=350&nologo=true&seed=${seed}`;
}
