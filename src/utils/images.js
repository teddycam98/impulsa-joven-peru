export const keywordMap = {
  scholarship: '1',
  course: '2',
  job: '3',
  volunteer: '4'
};

export function getUniqueImage(category, index) {
  const seedId = keywordMap[category] || '5';
  return `https://picsum.photos/seed/${seedId}${index + 1}/400/300`;
}
