import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = {
  'curso5.jpg': 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80',
  'job4.jpg': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
  'job5.jpg': 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80'
};

const dir = path.join(process.cwd(), 'public', 'images');

async function download() {
  for (const [name, url] of Object.entries(urls)) {
    const dest = path.join(dir, name);
    console.log('Downloading', name);
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
          https.get(res.headers.location, (res2) => {
             const file = fs.createWriteStream(dest);
             res2.pipe(file);
             file.on('finish', () => { file.close(); resolve(); });
          });
        } else {
          const file = fs.createWriteStream(dest);
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }
      }).on('error', reject);
    });
  }
}

download().then(() => console.log('Done')).catch(console.error);
