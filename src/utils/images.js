export const keywordMap = {
  scholarship: 'university,student',
  course: 'education,technology',
  job: 'office,interview',
  volunteer: 'volunteer,community'
};

export function getUniqueImage(category, index) {
  // Using loremflickr to guarantee different images for every opportunity based on the category keywords
  const keyword = keywordMap[category] || 'business';
  return `https://loremflickr.com/400/300/${keyword}?lock=${index + 1}`;
}
