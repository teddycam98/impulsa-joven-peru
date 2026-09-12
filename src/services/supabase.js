import { createClient } from '@supabase/supabase-js';
import { opportunitiesDetailData } from '../data/opportunitiesDetailData.js';
import { enrichOpportunity } from '../utils/enrichment.js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const dbService = {
  async getOpportunities(params = {}) {
    let { category, limit = 12, page = 0, search = '', featured, active = true } = params;
    
    // Check local rich dataset matching category
    let localItems = opportunitiesDetailData.filter(item => {
      if (category && item.category !== category) return false;
      if (featured !== undefined && item.featured !== featured) return false;
      if (search) {
        const q = search.toLowerCase();
        const match = item.title.toLowerCase().includes(q) || 
                      item.organization.toLowerCase().includes(q) ||
                      item.description.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });

    try {
      let query = supabase.from('opportunities').select('*');
      if (category) query = query.eq('category', category);
      if (active !== undefined) query = query.eq('status', active ? 'active' : 'expired');
      if (featured !== undefined) query = query.eq('featured', featured);
      if (search) {
        query = query.or(`title.ilike.%${search}%,organization.ilike.%${search}%`);
      }
      
      const from = page * limit;
      const to = from + limit - 1;
      query = query.range(from, to).order('created_at', { ascending: false });
      
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        // Merge without duplicating IDs
        const existingIds = new Set(data.map(d => d.id));
        const nonDuplicateLocals = localItems.filter(l => !existingIds.has(l.id));
        return [...data, ...nonDuplicateLocals].map(enrichOpportunity);
      }
    } catch (e) {
      console.warn('Supabase query fallback to local dataset:', e);
    }
    
    return localItems.map(enrichOpportunity);
  },

  async getOpportunityById(id) {
    const local = opportunitiesDetailData.find(item => item.id === id);
    if (local) return enrichOpportunity(local);

    try {
      const { data, error } = await supabase.from('opportunities').select('*').eq('id', id).single();
      if (!error && data) return enrichOpportunity(data);
    } catch (e) {
      console.warn('Error fetching opp by id from Supabase:', e);
    }
    return null;
  },

  async getStats() {
    try {
      const [scholarships, courses, jobs, internships, competitions, volunteering, users] = await Promise.all([
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'scholarship').eq('status', 'active'),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'course').eq('status', 'active'),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'job').eq('status', 'active'),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'internship').eq('status', 'active'),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'competition').eq('status', 'active'),
        supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'volunteer').eq('status', 'active'),
        supabase.from('users').select('*', { count: 'exact', head: true })
      ]);
      return {
        scholarshipsCount: (scholarships && scholarships.count) || 45,
        coursesCount: (courses && courses.count) || 80,
        internshipsCount: (internships && internships.count) || 65,
        jobsCount: (jobs && jobs.count) || 120,
        universitiesCount: 24,
        competitionsCount: (competitions && competitions.count) || 28,
        volunteeringCount: (volunteering && volunteering.count) || 35,
        usersCount: (users && users.count) || 1540
      };
    } catch (e) {
      return {
        scholarshipsCount: 45,
        coursesCount: 80,
        internshipsCount: 65,
        jobsCount: 120,
        universitiesCount: 24,
        competitionsCount: 28,
        volunteeringCount: 35,
        usersCount: 1540
      };
    }
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
      avatar_url: userRecord?.avatar_url || session.user.user_metadata?.avatar_url,
      created_at: userRecord?.created_at || session.user.created_at
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
            avatar_url: session.user.user_metadata?.avatar_url,
            email: session.user.email
          }]);
        }
      }
      callback(event, session);
    });
  },
  
  // Favorites
  async toggleFavorite(opportunityId, category) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Debes iniciar sesión para guardar favoritos');
    
    // Check if exists
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', session.user.id)
      .eq('opportunity_id', opportunityId)
      .eq('category', category)
      .single();
      
    if (existing) {
      // Remove
      await supabase.from('favorites').delete().eq('id', existing.id);
      return false; // Not favorited anymore
    } else {
      // Add
      await supabase.from('favorites').insert([{
        user_id: session.user.id,
        opportunity_id: opportunityId,
        category: category
      }]);
      return true; // Favorited
    }
  },
  
  async getFavoriteIds() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];
    
    const { data } = await supabase.from('favorites').select('opportunity_id').eq('user_id', session.user.id);
    return data ? data.map(d => d.opportunity_id) : [];
  },
  
  async getFavoritesCount() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return 0;
    
    const { count } = await supabase.from('favorites').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id);
    return count || 0;
  },
  
  async getFavorites(userId) {
    const { data: favs } = await supabase.from('favorites').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (!favs || favs.length === 0) return [];
    
    const oppIds = favs.map(f => f.opportunity_id);
    const { data: items } = await supabase.from('opportunities').select('*').in('id', oppIds);
    
    if (!items) return [];
    
    // Map items back to favorites for consistent ordering
    const enriched = favs.map(fav => {
      return { ...fav, opportunity_data: items.find(i => i.id === fav.opportunity_id) };
    });
    
    return enriched.filter(f => f.opportunity_data);
  },
  
  // Admin Methods
  async createOpportunity(data) {
    const { data: res, error } = await supabase.from('opportunities').insert([data]);
    if (error) throw error;
    return res;
  },
  async updateOpportunity(id, data) {
    const { data: res, error } = await supabase.from('opportunities').update(data).eq('id', id);
    if (error) throw error;
    return res;
  },
  async deleteOpportunity(id) {
    const { data: res, error } = await supabase.from('opportunities').delete().eq('id', id);
    if (error) throw error;
    return res;
  }
};
