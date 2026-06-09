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
  const t = title.toLowerCase();
  let keyword = category; // default (scholarship, course, job, volunteer)
  
  if (t.includes('tecno') || t.includes('software') || t.includes('datos') || t.includes('digital') || t.includes('ti') || t.includes('sistemas')) keyword = 'technology';
  else if (t.includes('matemática') || t.includes('ingeniería') || t.includes('ciencia')) keyword = 'engineering';
  else if (t.includes('salud') || t.includes('psicología') || t.includes('médico')) keyword = 'health';
  else if (t.includes('ambiente') || t.includes('reforestación') || t.includes('animales') || t.includes('naturaleza') || t.includes('rescate')) keyword = 'nature';
  else if (t.includes('arte') || t.includes('diseño') || t.includes('cultura')) keyword = 'art';
  else if (t.includes('negocio') || t.includes('marketing') || t.includes('finanzas') || t.includes('administración') || t.includes('banco') || t.includes('bcp')) keyword = 'business';
  else if (t.includes('enseñanza') || t.includes('educación') || t.includes('colegio') || t.includes('minedu')) keyword = 'education';
  else if (category === 'scholarship') keyword = 'university';
  else if (category === 'job') keyword = 'office,work';
  else if (category === 'course') keyword = 'study,student';
  else if (category === 'volunteer') keyword = 'volunteer,community';

  // String hash to keep images deterministic for the same opportunity, but distributed
  const str = String(seedString || Math.random());
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use a lock number between 1 and 1000 to get a unique but stable image for this keyword
  const lock = (Math.abs(hash) % 1000) + 1;
  
  return `https://loremflickr.com/500/350/${keyword}?lock=${lock}`;
}
