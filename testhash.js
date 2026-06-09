import fs from 'fs';

const content = fs.readFileSync('src/utils/images.js', 'utf-8');
const urls = [];
const regex = /https:\/\/images\.unsplash\.com\/photo-[^\s'",?]+/g;
let match;
while ((match = regex.exec(content)) !== null) {
  // Normalize: strip query params for comparison
  const photoId = match[0].split('?')[0];
  urls.push({ full: match[0], id: photoId });
}

console.log(`Total image URLs found: ${urls.length}`);

const seen = {};
const dupes = [];
urls.forEach((u, i) => {
  if (seen[u.id] !== undefined) {
    dupes.push({ id: u.id, firstIndex: seen[u.id], secondIndex: i });
  } else {
    seen[u.id] = i;
  }
});

if (dupes.length === 0) {
  console.log('✅ ZERO duplicates! Every image is unique.');
} else {
  console.log(`❌ Found ${dupes.length} duplicates:`);
  dupes.forEach(d => {
    console.log(`  ${d.id} (line indices ${d.firstIndex} and ${d.secondIndex})`);
  });
}

// Count by section
const idMapUrls = urls.slice(0, 40);
const fallbackUrls = urls.slice(40);
console.log(`\nID-mapped images: ${idMapUrls.length}`);
console.log(`Fallback images: ${fallbackUrls.length}`);
