import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase
    .from('opportunities')
    .select('id, title, category, external_link, image_url, status')
    .eq('status', 'active')
    .order('category', { ascending: true })
    .order('title', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total active opportunities: ${data.length}\n`);
  
  let currentCat = '';
  data.forEach((opp, i) => {
    if (opp.category !== currentCat) {
      currentCat = opp.category;
      console.log(`\n=== ${currentCat.toUpperCase()} ===`);
    }
    console.log(`[${i+1}] "${opp.title}"`);
    console.log(`    ID: ${opp.id}`);
    console.log(`    Link: ${opp.external_link || '(NONE)'}`);
    console.log(`    Image: ${opp.image_url || '(NONE)'}`);
  });
}

main();
