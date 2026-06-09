import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const dbService = {
  async getScholarships() {
    const { data, error } = await supabase.from('scholarships').select('*').eq('active', true).order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
  },

  async getCourses() {
    const { data, error } = await supabase.from('courses').select('*').eq('active', true).order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
  },

  async getJobs() {
    const { data, error } = await supabase.from('jobs').select('*').eq('active', true).order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
  },

  async getVolunteering() {
    const { data, error } = await supabase.from('volunteer_opportunities').select('*').eq('active', true).order('created_at', { ascending: false });
    if (error) { console.error(error); return []; }
    return data;
  },

  async getStats() {
    const [scholarships, courses, jobs, users] = await Promise.all([
      supabase.from('scholarships').select('*', { count: 'exact', head: true }).eq('active', true),
      supabase.from('courses').select('*', { count: 'exact', head: true }).eq('active', true),
      supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('active', true),
      supabase.from('users').select('*', { count: 'exact', head: true })
    ]);
    return {
      scholarshipsCount: scholarships.count || 0,
      coursesCount: courses.count || 0,
      jobsCount: jobs.count || 0,
      usersCount: users.count || 0
    };
  },

  // Auth Methods
  async signUp(fullName, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });
    
    if (error) throw error;
    
    // Insert into public.users table if successful
    if (data.user) {
      await supabase.from('users').insert([{
        id: data.user.id,
        full_name: fullName,
        email: email
      }]);
    }
    return data;
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/perfil'
      }
    });
    if (error) throw error;
  },

  async signInWithFacebook() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: window.location.origin + '/perfil'
      }
    });
    if (error) throw error;
  },

  async resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/perfil',
    });
    if (error) throw error;
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    
    // Fetch user details from public.users table
    const { data: userRecord } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user.id)
      .single();
      
    return {
      id: session.user.id,
      email: session.user.email,
      name: userRecord?.full_name || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
      avatar_url: userRecord?.avatar_url || session.user.user_metadata?.avatar_url
    };
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        // Ensure user is synced to public.users on OAuth login
        const { data: existingUser } = await supabase.from('users').select('id').eq('id', session.user.id).single();
        if (!existingUser) {
          await supabase.from('users').insert([{
            id: session.user.id,
            full_name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            email: session.user.email,
            avatar_url: session.user.user_metadata?.avatar_url
          }]);
        }
      }
      callback(event, session);
    });
  }
};
