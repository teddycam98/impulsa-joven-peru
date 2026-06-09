import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = {
  'beca1.jpg': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  'beca4.jpg': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&q=80',
  'curso4.jpg': 'https://images.unsplash.com/photo-1517048676732-dce5ef41a3a4?w=600&q=80',
  'vol2.jpg': 'https://images.unsplash.com/photo-1515378791033-cded32affc2f?w=600&q=80',
  'vol3.jpg': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80'
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
