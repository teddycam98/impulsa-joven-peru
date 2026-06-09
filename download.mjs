import fs from 'fs';
import https from 'https';
import path from 'path';

const urls = {
  'estudiar.jpg': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
  'aprender.jpg': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  'trabajar.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
  'voluntariado.jpg': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
  'beca1.jpg': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4273?w=600&q=80',
  'beca2.jpg': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
  'beca3.jpg': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  'beca4.jpg': 'https://images.unsplash.com/photo-1521587760476-6c1fd14f0524?w=600&q=80',
  'beca5.jpg': 'https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=600&q=80',
  'curso1.jpg': 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
  'curso2.jpg': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80',
  'curso3.jpg': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  'curso4.jpg': 'https://images.unsplash.com/photo-1633613286848-e6f4ca2b01cc?w=600&q=80',
  'job1.jpg': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
  'job2.jpg': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80',
  'job3.jpg': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  'vol1.jpg': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80',
  'vol2.jpg': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceef7?w=600&q=80',
  'vol3.jpg': 'https://images.unsplash.com/photo-1593113565214-80afcb4a4771?w=600&q=80',
  'vol4.jpg': 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80'
};

const dir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

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
