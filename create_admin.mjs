import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin.impulsa.test@gmail.com',
    password: 'AdminPassword123!',
    options: {
      data: { full_name: 'Administrador' }
    }
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('User created:', data.user.email);
    console.log('Confirmed?', data.user.email_confirmed_at != null);
  }
}

createAdmin();
