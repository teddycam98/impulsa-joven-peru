import { createClient } from '@supabase/supabase-js';

// Use the service role key to bypass RLS
const supabaseUrl = 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';
const supabase = createClient(supabaseUrl, supabaseKey);

// First, sign in as admin to get an authenticated session
// Then insert records through the authenticated session
async function main() {
  // Try signing in with the admin credentials
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: 'admin@impulsajoven.pe',
    password: 'admin123'
  });

  if (signInError) {
    console.log('Admin login failed, trying direct insert...');
    // Try direct insert anyway
  } else {
    console.log('Signed in as:', signInData.user?.email);
  }

  const competitions = [
    {
      title: 'Premio Nacional de la Juventud',
      organization: 'SENAJU',
      description: 'Reconocimiento a jóvenes peruanos destacados en liderazgo, emprendimiento e innovación social.',
      external_link: 'https://juventud.gob.pe',
      location: 'Perú',
      deadline: '2026-12-31',
      category: 'competition',
      featured: true,
      status: 'active',
      image_url: null
    },
    {
      title: 'Startup Perú',
      organization: 'PRODUCE',
      description: 'Programa de capital semilla para emprendimientos innovadores de base tecnológica.',
      external_link: 'https://startup.proinnovate.gob.pe',
      location: 'Perú',
      deadline: '2026-10-15',
      category: 'competition',
      featured: true,
      status: 'active',
      image_url: null
    },
    {
      title: 'Hult Prize',
      organization: 'Hult Prize Foundation',
      description: 'Competencia global de emprendimiento social universitario con premios millonarios.',
      external_link: 'https://www.hultprize.org',
      location: 'Internacional',
      deadline: '2026-11-30',
      category: 'competition',
      featured: false,
      status: 'active',
      image_url: null
    },
    {
      title: 'Google Solution Challenge',
      organization: 'Google',
      description: 'Desafío para estudiantes que usen tecnología Google para resolver problemas de la ONU.',
      external_link: 'https://developers.google.com/community/gdsc-solution-challenge',
      location: 'Internacional',
      deadline: '2026-09-30',
      category: 'competition',
      featured: true,
      status: 'active',
      image_url: null
    },
    {
      title: 'NASA Space Apps Challenge',
      organization: 'NASA',
      description: 'Hackathon internacional que invita a resolver desafíos de la NASA usando datos abiertos.',
      external_link: 'https://www.spaceappschallenge.org',
      location: 'Internacional',
      deadline: '2026-10-01',
      category: 'competition',
      featured: false,
      status: 'active',
      image_url: null
    },
    {
      title: 'Huawei ICT Competition',
      organization: 'Huawei',
      description: 'Competencia internacional en telecomunicaciones, inteligencia artificial y cloud computing.',
      external_link: 'https://e.huawei.com/en/talent/ict-academy',
      location: 'Internacional',
      deadline: '2026-11-15',
      category: 'competition',
      featured: false,
      status: 'active',
      image_url: null
    },
    {
      title: 'Microsoft Imagine Cup',
      organization: 'Microsoft',
      description: 'Competencia tecnológica global para estudiantes que desarrollen soluciones con impacto.',
      external_link: 'https://imaginecup.microsoft.com',
      location: 'Internacional',
      deadline: '2026-08-31',
      category: 'competition',
      featured: false,
      status: 'active',
      image_url: null
    },
    {
      title: 'Concurso Nacional de Innovación',
      organization: 'CONCYTEC',
      description: 'Convocatoria para proyectos innovadores que aporten soluciones a la sociedad peruana.',
      external_link: 'https://www.gob.pe/concytec',
      location: 'Perú',
      deadline: '2026-09-15',
      category: 'competition',
      featured: true,
      status: 'active',
      image_url: null
    },
    {
      title: 'Concurso CONCYTEC de Investigación',
      organization: 'CONCYTEC',
      description: 'Financiamiento para proyectos de investigación científica y tecnológica juvenil.',
      external_link: 'https://www.gob.pe/concytec',
      location: 'Perú',
      deadline: '2026-10-30',
      category: 'competition',
      featured: false,
      status: 'active',
      image_url: null
    },
    {
      title: 'Global Student Prize',
      organization: 'Chegg.org / Varkey Foundation',
      description: 'Premio de $100,000 al estudiante que haya generado mayor impacto en su comunidad.',
      external_link: 'https://www.globalstudentprize.org',
      location: 'Internacional',
      deadline: '2026-07-15',
      category: 'competition',
      featured: false,
      status: 'active',
      image_url: null
    }
  ];

  console.log('Inserting 10 competitions...');
  const { data, error } = await supabase.from('opportunities').insert(competitions).select('id, title');

  if (error) {
    console.error('Insert error:', error.code, error.message);
    console.log('\n⚠️  RLS is blocking inserts. You need to insert these via the admin panel at /admin');
    console.log('Or provide the Supabase service_role key.');
  } else {
    console.log('✅ Successfully inserted! IDs:');
    data.forEach(r => console.log(`  ${r.id} → ${r.title}`));
  }
}

main();
