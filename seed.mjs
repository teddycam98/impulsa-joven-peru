import { createClient } from '@supabase/supabase-js';
import { mockData } from './src/data/mock.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
  console.error('Error: Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file before seeding.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log('Seeding Supabase with mockData...');

  // 1. Scholarships
  for (const s of mockData.scholarships) {
    const { error } = await supabase.from('scholarships').insert([{
      title: s.title,
      institution: s.provider || 'Institución',
      country: s.type || 'Perú',
      deadline: s.deadline || 'Pronto',
      description: s.desc,
      application_url: s.link,
      image_url: s.imageUrl,
      active: true
    }]);
    if (error) console.error('Error inserting scholarship:', error);
  }

  // 2. Courses
  for (const c of mockData.courses) {
    const { error } = await supabase.from('courses').insert([{
      title: c.title,
      provider: c.provider,
      duration: c.duration,
      description: c.desc,
      course_url: c.link,
      image_url: c.imageUrl,
      active: true
    }]);
    if (error) console.error('Error inserting course:', error);
  }

  // 3. Jobs
  for (const j of mockData.jobs) {
    const { error } = await supabase.from('jobs').insert([{
      company: j.company,
      position: j.title,
      location: j.location,
      description: j.desc,
      application_url: j.link,
      image_url: j.imageUrl,
      active: true
    }]);
    if (error) console.error('Error inserting job:', error);
  }

  // 4. Volunteering
  for (const v of mockData.volunteering) {
    const { error } = await supabase.from('volunteer_opportunities').insert([{
      organization: v.org || 'Organización',
      title: v.title,
      description: v.desc,
      application_url: v.link,
      image_url: v.imageUrl,
      active: true
    }]);
    if (error) console.error('Error inserting volunteer opp:', error);
  }

  console.log('Seeding complete! You can now safely delete src/data/mock.js and storage.js.');
}

seed();
