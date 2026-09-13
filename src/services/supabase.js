import { createClient } from '@supabase/supabase-js';
import { opportunitiesDetailData } from '../data/opportunitiesDetailData.js';
import { enrichOpportunity } from '../utils/enrichment.js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const DEMO_ACCOUNTS = {
  'admin@impulsajoven.pe': {
    id: 'demo-admin-id',
    email: 'admin@impulsajoven.pe',
    password: 'Admin123!',
    name: 'Administrador General',
    role: 'admin',
    roleLabel: 'Administrador',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-01-15T10:00:00.000Z'
  },
  'empresa@impulsajoven.pe': {
    id: 'demo-company-id',
    email: 'empresa@impulsajoven.pe',
    password: 'Empresa123!',
    name: 'Banco de Crédito BCP (Empresa)',
    role: 'company',
    roleLabel: 'Empresa / Reclutador',
    avatar_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-02-20T10:00:00.000Z'
  },
  'usuario@impulsajoven.pe': {
    id: 'demo-user-id',
    email: 'usuario@impulsajoven.pe',
    password: 'Usuario123!',
    name: 'Carlos Mendoza (Estudiante)',
    role: 'user',
    roleLabel: 'Estudiante / Postulante',
    avatar_url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    created_at: '2026-03-01T10:00:00.000Z'
  }
};

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
      
      // Add a 2s timeout so slow Supabase responses do not block the UI
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000));
      const { data, error } = await Promise.race([query, timeoutPromise]);
      if (!error && data && data.length > 0) {
        // Merge without duplicating IDs
        const existingIds = new Set(data.map(d => d.id));
        const nonDuplicateLocals = localItems.filter(l => !existingIds.has(l.id));
        return [...data, ...nonDuplicateLocals].map(enrichOpportunity);
      }
    } catch (e) {
      console.warn('Supabase query fallback to local dataset:', e.message || e);
    }
    
    return localItems.map(enrichOpportunity);
  },

  async getOpportunityById(id) {
    const local = opportunitiesDetailData.find(item => item.id === id);
    if (local) return enrichOpportunity(local);

    try {
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000));
      const { data, error } = await Promise.race([
        supabase.from('opportunities').select('*').eq('id', id).single(),
        timeoutPromise
      ]);
      if (!error && data) return enrichOpportunity(data);
    } catch (e) {
      console.warn('Error fetching opp by id from Supabase:', e.message || e);
    }
    return null;
  },

  getCachedStats() {
    return {
      scholarshipsCount: 45,
      coursesCount: 80,
      internshipsCount: 65,
      jobsCount: 120,
      universitiesCount: 24,
      competitionsCount: 28,
      volunteeringCount: 35,
      usersCount: 5420
    };
  },

  async getStats() {
    if (this._statsPromise) return this._statsPromise;
    this._statsPromise = (async () => {
      try {
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000));
        const fetchPromise = Promise.all([
          supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'scholarship').eq('status', 'active'),
          supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'course').eq('status', 'active'),
          supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'job').eq('status', 'active'),
          supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'internship').eq('status', 'active'),
          supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'competition').eq('status', 'active'),
          supabase.from('opportunities').select('*', { count: 'exact', head: true }).eq('category', 'volunteer').eq('status', 'active'),
          supabase.from('users').select('*', { count: 'exact', head: true })
        ]);
        const [scholarships, courses, jobs, internships, competitions, volunteering, users] = await Promise.race([fetchPromise, timeoutPromise]);
        return {
          scholarshipsCount: (scholarships && scholarships.count) || 45,
          coursesCount: (courses && courses.count) || 80,
          internshipsCount: (internships && internships.count) || 65,
          jobsCount: (jobs && jobs.count) || 120,
          universitiesCount: 24,
          competitionsCount: (competitions && competitions.count) || 28,
          volunteeringCount: (volunteering && volunteering.count) || 35,
          usersCount: (users && users.count) || 5420
        };
      } catch (e) {
        return this.getCachedStats();
      }
    })();
    return this._statsPromise;
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
    const cleanEmail = email ? email.toLowerCase().trim() : '';
    const demo = DEMO_ACCOUNTS[cleanEmail];
    if (demo) {
      if (password === demo.password) {
        localStorage.setItem('ij_demo_user', JSON.stringify(demo));
        window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { event: 'SIGNED_IN', user: demo } }));
        return { user: demo, session: { user: demo, access_token: 'demo-token' } };
      } else {
        throw new Error('Credenciales incorrectas');
      }
    }

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
    localStorage.removeItem('ij_demo_user');
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { event: 'SIGNED_OUT', user: null } }));
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout warning:', e);
    }
  },

  async getCurrentUser() {
    const stored = localStorage.getItem('ij_demo_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        localStorage.removeItem('ij_demo_user');
      }
    }

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
      role: userRecord?.role || 'user',
      roleLabel: userRecord?.role === 'admin' ? 'Administrador' : (userRecord?.role === 'company' ? 'Empresa' : 'Estudiante'),
      created_at: userRecord?.created_at || session.user.created_at
    };
  },

  onAuthStateChange(callback) {
    window.addEventListener('authStateChanged', (e) => {
      callback(e.detail.event, e.detail.user ? { user: e.detail.user } : null);
    });

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
    const user = await this.getCurrentUser();
    if (!user) throw new Error('Debes iniciar sesión para guardar favoritos');
    
    if (user.id && user.id.startsWith('demo-')) {
      const key = `ij_demo_favs_${user.id}`;
      let favs = [];
      try {
        favs = JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        favs = [];
      }
      const idx = favs.findIndex(f => f.opportunity_id === opportunityId);
      if (idx >= 0) {
        favs.splice(idx, 1);
        localStorage.setItem(key, JSON.stringify(favs));
        return false;
      } else {
        favs.unshift({
          id: 'fav-' + Date.now(),
          user_id: user.id,
          opportunity_id: opportunityId,
          category: category || 'scholarship',
          created_at: new Date().toISOString()
        });
        localStorage.setItem(key, JSON.stringify(favs));
        return true;
      }
    }

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
    const user = await this.getCurrentUser();
    if (!user) return [];

    if (user.id && user.id.startsWith('demo-')) {
      const key = `ij_demo_favs_${user.id}`;
      try {
        const favs = JSON.parse(localStorage.getItem(key) || '[]');
        return favs.map(f => f.opportunity_id);
      } catch (e) {
        return [];
      }
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];
    
    const { data } = await supabase.from('favorites').select('opportunity_id').eq('user_id', session.user.id);
    return data ? data.map(d => d.opportunity_id) : [];
  },
  
  async getFavoritesCount() {
    const ids = await this.getFavoriteIds();
    return ids.length;
  },
  
  async getFavorites(userId) {
    const user = await this.getCurrentUser();
    if (user && user.id && user.id.startsWith('demo-')) {
      const key = `ij_demo_favs_${user.id}`;
      let favs = [];
      try {
        favs = JSON.parse(localStorage.getItem(key) || '[]');
      } catch (e) {
        favs = [];
      }
      // Seed if empty for demo users so they have immediate interactive data
      if (favs.length === 0) {
        favs = opportunitiesDetailData.slice(0, 3).map(item => ({
          id: 'fav-seed-' + item.id,
          user_id: user.id,
          opportunity_id: item.id,
          category: item.category,
          created_at: new Date().toISOString()
        }));
        localStorage.setItem(key, JSON.stringify(favs));
      }
      return favs.map(fav => ({
        ...fav,
        opportunity_data: opportunitiesDetailData.find(i => i.id === fav.opportunity_id)
      })).filter(f => f.opportunity_data);
    }

    const { data: favs } = await supabase.from('favorites').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    if (!favs || favs.length === 0) return [];
    
    const oppIds = favs.map(f => f.opportunity_id);
    const { data: items } = await supabase.from('opportunities').select('*').in('id', oppIds);
    
    if (!items) return [];
    
    // Map items back to favorites for consistent ordering
    const enriched = favs.map(fav => {
      return { ...fav, opportunity_data: items.find(i => i.id === fav.opportunity_id) || opportunitiesDetailData.find(i => i.id === fav.opportunity_id) };
    });
    
    return enriched.filter(f => f.opportunity_data);
  },
  
  // Admin Methods
  async createOpportunity(data) {
    try {
      const { data: res, error } = await supabase.from('opportunities').insert([data]);
      if (error) throw error;
      return res;
    } catch (err) {
      console.warn('Supabase create fallback to local:', err.message);
      const newOpp = { id: 'opp-demo-' + Date.now(), ...data, created_at: new Date().toISOString() };
      opportunitiesDetailData.unshift(newOpp);
      return [newOpp];
    }
  },
  async updateOpportunity(id, data) {
    try {
      const { data: res, error } = await supabase.from('opportunities').update(data).eq('id', id);
      if (error) throw error;
      return res;
    } catch (err) {
      console.warn('Supabase update fallback to local:', err.message);
      const idx = opportunitiesDetailData.findIndex(o => o.id === id);
      if (idx >= 0) opportunitiesDetailData[idx] = { ...opportunitiesDetailData[idx], ...data };
      return [opportunitiesDetailData[idx]];
    }
  },
  async deleteOpportunity(id) {
    try {
      const { data: res, error } = await supabase.from('opportunities').delete().eq('id', id);
      if (error) throw error;
      return res;
    } catch (err) {
      console.warn('Supabase delete fallback to local:', err.message);
      const idx = opportunitiesDetailData.findIndex(o => o.id === id);
      if (idx >= 0) opportunitiesDetailData.splice(idx, 1);
      return true;
    }
  }
};
