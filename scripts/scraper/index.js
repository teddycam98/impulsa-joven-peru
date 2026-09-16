/**
 * Master Scraper CLI Runner for Impulsa Joven Perú
 * 
 * Usage:
 *   node scripts/scraper/index.js                 (Runs all categories)
 *   node scripts/scraper/index.js --category=scholarship
 *   node scripts/scraper/index.js --category=course
 *   node scripts/scraper/index.js --category=internship
 *   node scripts/scraper/index.js --category=job
 *   node scripts/scraper/index.js --category=university
 *   node scripts/scraper/index.js --category=competition
 *   node scripts/scraper/index.js --category=volunteer
 */

import { scrapeScholarships } from './sources/scholarships.js';
import { scrapeCourses } from './sources/courses.js';
import { scrapeInternships } from './sources/internships.js';
import { scrapeJobs } from './sources/jobs.js';
import { scrapeUniversities } from './sources/universities.js';
import { scrapeCompetitions } from './sources/competitions.js';
import { scrapeVolunteering } from './sources/volunteering.js';
import { syncOpportunities } from './sync.js';

const sources = {
  scholarship: scrapeScholarships,
  scholarships: scrapeScholarships,
  becas: scrapeScholarships,
  
  course: scrapeCourses,
  courses: scrapeCourses,
  cursos: scrapeCourses,
  
  internship: scrapeInternships,
  internships: scrapeInternships,
  practicas: scrapeInternships,
  
  job: scrapeJobs,
  jobs: scrapeJobs,
  empleos: scrapeJobs,
  
  university: scrapeUniversities,
  universities: scrapeUniversities,
  universidades: scrapeUniversities,
  
  competition: scrapeCompetitions,
  competitions: scrapeCompetitions,
  concursos: scrapeCompetitions,
  
  volunteer: scrapeVolunteering,
  volunteering: scrapeVolunteering,
  voluntariado: scrapeVolunteering
};

async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🚀 IMPULSA JOVEN PERÚ — MOTOR DE SCRAPING MULTI-CATEGORÍA');
  console.log('═══════════════════════════════════════════════════════════════');

  const args = process.argv.slice(2);
  let targetCategory = null;

  for (const arg of args) {
    if (arg.startsWith('--category=')) {
      targetCategory = arg.split('=')[1].toLowerCase().trim();
    }
  }

  let allOpportunities = [];

  if (targetCategory && sources[targetCategory]) {
    console.log(`\n🎯 Ejecutando scraper específico para: [${targetCategory}]`);
    const results = await sources[targetCategory]();
    allOpportunities.push(...results);
  } else {
    console.log('\n🌐 Ejecutando scraper completo para TODAS las categorías...');
    const tasks = [
      scrapeScholarships(),
      scrapeCourses(),
      scrapeInternships(),
      scrapeJobs(),
      scrapeUniversities(),
      scrapeCompetitions(),
      scrapeVolunteering()
    ];

    const results = await Promise.allSettled(tasks);
    for (const res of results) {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        allOpportunities.push(...res.value);
      } else if (res.status === 'rejected') {
        console.error('⚠️ Error en fuente:', res.reason);
      }
    }
  }

  console.log(`\n✨ Se obtuvieron un total de ${allOpportunities.length} convocatorias estructuradas.`);

  // Dual synchronization
  await syncOpportunities(allOpportunities);

  console.log('\n🎉 [Scraper Finalizado con Éxito] Datos listos en plataforma.');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('❌ Error fatal en el scraper:', err);
  process.exit(1);
});
