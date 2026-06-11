const sharp = require('sharp');
const fs = require('fs');

async function generate() {
  const sourcePath = './public/logo.png';
  
  // Create PNGs
  await sharp(sourcePath).resize(32, 32).png().toFile('./public/favicon-32x32.png');
  await sharp(sourcePath).resize(16, 16).png().toFile('./public/favicon-16x16.png');
  await sharp(sourcePath).resize(180, 180).png().toFile('./public/apple-touch-icon.png');
  
  // Simple ICO fallback using PNG
  fs.copyFileSync('./public/favicon-32x32.png', './public/favicon.ico');
  
  // Create webmanifest
  const manifest = {
    "name": "Impulsa Joven Perú",
    "short_name": "Impulsa Joven",
    "icons": [
      {
        "src": "/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      }
    ],
    "theme_color": "#041B4D",
    "background_color": "#041B4D",
    "display": "standalone"
  };
  fs.writeFileSync('./public/site.webmanifest', JSON.stringify(manifest, null, 2));
  
  console.log('All icons and manifest generated successfully!');
}

generate().catch(console.error);
