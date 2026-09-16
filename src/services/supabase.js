import { createClient } from '@supabase/supabase-js';
import { opportunitiesDetailData } from '../data/opportunitiesDetailData.js';
import { enrichOpportunity } from '../utils/enrichment.js';

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};
const supabaseUrl = env.VITE_SUPABASE_URL || 'https://oiupevzywptrvuekjuea.supabase.co';
const supabaseKey = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_YNzJoRqjVlZV0Xu3BEWhPw_eNMtt6lX';

export const supabase = createClient(supabaseUrl, supabaseKey);

// In-memory performance cache for 0ms instant UI responses
let _currentUserCache = null;
let _cachedFavIds = null;
const _oppsMemoryCache = new Map();


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

export const INITIAL_COMPANY_PROPOSALS = [
  {
    id: 'prop-bcp-beca-2026',
    title: 'Beca Talento BCP 2026 - Convocatoria de Pregrado Universitario',
    category: 'scholarship',
    organization: 'Banco de Crédito BCP',
    company_email: 'empresa@impulsajoven.pe',
    company_phone: '+51 987 654 321',
    contact_name: 'Lic. Mariana Valdez (Gerencia de Sostenibilidad BCP)',
    modality: 'Presencial / Semipresencial',
    location: 'Lima y Principales Regiones (Perú)',
    deadline: '2026-05-30',
    description: 'El BCP abre su convocatoria anual Beca Talento BCP para estudiantes destacados de colegios públicos y privados con necesidad económica. Cubre el 100% de la matrícula y todas las pensiones académicas durante la carrera universitaria en instituciones asociadas (PUCP, UP, UDEP, Cayetano Heredia), además de otorgar una laptop nueva de última generación, asignación monetaria mensual para transporte y alimentación, seguro de salud privado y acceso al exclusivo programa de liderazgo y pasantías laborales en el banco.',
    requirements: [
      'Haber culminado la secundaria en el tercio o quinto superior.',
      'Acreditar situación de vulnerabilidad o necesidad económica mediante SISFOH o sustento socioeconómico.',
      'Haber ingresado a una universidad aliada (PUCP, UP, UDEP o UPCH) o estar en proceso de admisión 2026.',
      'Tener nacionalidad peruana y hasta 22 años de edad.'
    ],
    benefits: [
      '100% Cobertura de Matrícula y Pensiones Universitarias durante toda la carrera',
      'Laptop de última generación entregada al inicio de clases',
      'Asignación mensual de manutención (alimentación, útiles, transporte)',
      'Programa de Mentoría Ejecutiva con líderes y gerentes del BCP',
      'Ingreso preferente al programa de Prácticas Pre-Profesionales en el banco'
    ],
    skills: 'Rendimiento académico sobresaliente, Liderazgo social, Compromiso de retribución',
    coverage: '100% Cobertura Integral + Laptop + Manutención Mensual',
    external_link: 'https://www.viabcp.com/becasbcp',
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    status: 'pending', // 'pending' | 'approved' | 'rejected'
    created_at: '2026-03-12T16:45:00.000Z'
  },
  {
    id: 'prop-ferreyros-inter-2026',
    title: 'Programa Trainee de Automatización & Mantenimiento Dual',
    category: 'internship',
    organization: 'Corporación Ferreycorp / Ferreyros S.A.',
    company_email: 'talento@ferreycorp.com.pe',
    company_phone: '+51 912 345 678',
    contact_name: 'Ing. Carlos Zambrano (Gestión de Talento Humano)',
    modality: 'Presencial (Talleres Megacentro)',
    location: 'Lima (Lurín / La Marina)',
    deadline: '2026-04-25',
    description: 'Ferreyros convoca a estudiantes de últimos ciclos de carreras técnicas (Tecsup, Senati) e ingeniería mecánica/mecatrónica para su programa élite de entrenamiento y línea de carrera en maquinaria pesada Caterpillar.',
    requirements: [
      'Estudiantes de 5to o 6to ciclo técnico o 9no/10mo de ingeniería.',
      'Disponibilidad para realizar prácticas pre-profesionales en Lima.'
    ],
    benefits: [
      'Subvención económica superior al mercado',
      'Seguro FOLA y alimentación cubierta',
      'Certificación oficial Caterpillar al término'
    ],
    skills: 'Mecatrónica, Diagnóstico electrónico, Hidráulica, Seguridad industrial',
    coverage: 'Remuneración S/ 1,800 + Almuerzos + Seguro Médico',
    external_link: 'https://ferreyros.evaluar.com/',
    image_url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
    status: 'pending',
    created_at: '2026-03-11T10:15:00.000Z'
  }
];

export const dbService = {
  async getOpportunities(params = {}) {
    let { category, limit = 12, page = 0, search = '', featured, active = true } = params;
    const cacheKey = `${category || 'all'}_${limit}_${page}_${search}_${featured}_${active}`;

    // 1. Quick in-memory cache check
    if (_oppsMemoryCache.has(cacheKey)) {
      return _oppsMemoryCache.get(cacheKey);
    }

    // 2. Compute local rich dataset matching query (instant 0ms execution)
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

    const from = page * limit;
    const paged = localItems.slice(from, from + limit).map(enrichOpportunity);
    _oppsMemoryCache.set(cacheKey, paged);

    // 3. Stale-While-Revalidate: fetch remote Supabase silently in background
    (async () => {
      try {
        let query = supabase.from('opportunities').select('*');
        if (category) query = query.eq('category', category);
        if (active !== undefined) query = query.eq('status', active ? 'active' : 'expired');
        if (featured !== undefined) query = query.eq('featured', featured);
        if (search) {
          query = query.or(`title.ilike.%${search}%,organization.ilike.%${search}%`);
        }
        const to = from + limit - 1;
        query = query.range(from, to).order('created_at', { ascending: false });

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          const existingIds = new Set(data.map(d => d.id));
          const nonDuplicateLocals = localItems.slice(from, from + limit).filter(l => !existingIds.has(l.id));
          const merged = [...data, ...nonDuplicateLocals].map(enrichOpportunity);
          _oppsMemoryCache.set(cacheKey, merged);
          window.dispatchEvent(new CustomEvent('opportunitiesUpdated', { detail: { category, items: merged } }));
        }
      } catch (e) {
        // Silent background fallback
      }
    })();

    return paged;
  },

  async getOpportunityById(id) {
    const local = opportunitiesDetailData.find(item => item.id === id);
    if (local) return enrichOpportunity(local);

    try {
      const { data, error } = await supabase.from('opportunities').select('*').eq('id', id).single();
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
    return this.getCachedStats();
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
        _currentUserCache = demo;
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
    if (data?.user) {
      _currentUserCache = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
        avatar_url: data.user.user_metadata?.avatar_url,
        role: 'user',
        roleLabel: 'Estudiante',
        created_at: data.user.created_at
      };
      sessionStorage.setItem('ij_sb_user', JSON.stringify(_currentUserCache));
    }
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
    _currentUserCache = null;
    _cachedFavIds = null;
    localStorage.removeItem('ij_demo_user');
    sessionStorage.removeItem('ij_sb_user');
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { event: 'SIGNED_OUT', user: null } }));
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout warning:', e);
    }
  },

  async getCurrentUser() {
    if (_currentUserCache) return _currentUserCache;

    const stored = localStorage.getItem('ij_demo_user');
    if (stored) {
      try {
        _currentUserCache = JSON.parse(stored);
        return _currentUserCache;
      } catch (e) {
        localStorage.removeItem('ij_demo_user');
      }
    }

    const cachedSessionUser = sessionStorage.getItem('ij_sb_user');
    if (cachedSessionUser) {
      try {
        _currentUserCache = JSON.parse(cachedSessionUser);
        return _currentUserCache;
      } catch (e) {
        sessionStorage.removeItem('ij_sb_user');
      }
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      
      // Fetch user details from public.users table
      const { data: userRecord } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      const userObj = {
        id: session.user.id,
        email: session.user.email,
        name: userRecord?.full_name || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
        avatar_url: userRecord?.avatar_url || session.user.user_metadata?.avatar_url,
        role: userRecord?.role || 'user',
        roleLabel: userRecord?.role === 'admin' ? 'Administrador' : (userRecord?.role === 'company' ? 'Empresa' : 'Estudiante'),
        created_at: userRecord?.created_at || session.user.created_at
      };
      _currentUserCache = userObj;
      sessionStorage.setItem('ij_sb_user', JSON.stringify(userObj));
      return userObj;
    } catch (e) {
      return null;
    }
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
        _cachedFavIds = null;
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
        _cachedFavIds = null;
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
      
    _cachedFavIds = null;
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
    if (_cachedFavIds) return _cachedFavIds;
    const user = await this.getCurrentUser();
    if (!user) return [];

    if (user.id && user.id.startsWith('demo-')) {
      const key = `ij_demo_favs_${user.id}`;
      try {
        const favs = JSON.parse(localStorage.getItem(key) || '[]');
        _cachedFavIds = favs.map(f => f.opportunity_id);
        return _cachedFavIds;
      } catch (e) {
        return [];
      }
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];
      
      const { data } = await supabase.from('favorites').select('opportunity_id').eq('user_id', session.user.id);
      _cachedFavIds = data ? data.map(d => d.opportunity_id) : [];
      return _cachedFavIds;
    } catch (e) {
      return [];
    }
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
  },

  // Company Proposals Management (Review & Approval Flow)
  async getCompanyProposals() {
    try {
      const stored = localStorage.getItem('ij_company_proposals');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Local proposals parse error:', e);
    }
    localStorage.setItem('ij_company_proposals', JSON.stringify(INITIAL_COMPANY_PROPOSALS));
    return [...INITIAL_COMPANY_PROPOSALS];
  },

  async submitCompanyProposal(proposalData) {
    const proposals = await this.getCompanyProposals();
    const newProposal = {
      id: 'prop-' + Date.now(),
      status: 'pending',
      created_at: new Date().toISOString(),
      ...proposalData
    };
    proposals.unshift(newProposal);
    localStorage.setItem('ij_company_proposals', JSON.stringify(proposals));
    return newProposal;
  },

  async approveCompanyProposal(id) {
    const proposals = await this.getCompanyProposals();
    const target = proposals.find(p => p.id === id);
    if (!target) throw new Error('Propuesta no encontrada');

    target.status = 'approved';
    target.approved_at = new Date().toISOString();
    localStorage.setItem('ij_company_proposals', JSON.stringify(proposals));

    // Convert proposal to live active opportunity in platform
    const newOpp = {
      id: 'opp-' + target.id,
      title: target.title,
      description: target.description,
      category: target.category || 'scholarship',
      organization: target.organization,
      external_link: target.external_link || 'https://impulsajoven.pe',
      location: target.location || 'Perú',
      deadline: target.deadline,
      coverage: target.coverage || '100% Cobertura',
      modality: target.modality || 'Presencial',
      featured: true,
      status: 'active',
      image_url: target.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      requirements: target.requirements || [
        'Alto rendimiento académico y ganas de superación.',
        'Postulación documentada vía portal web oficial de la empresa.'
      ],
      benefits: target.benefits || [
        'Financiamiento integral o subvención garantizada.',
        'Acompañamiento profesional y mentoría.'
      ],
      steps: [
        'Revisar los requisitos detallados en la convocatoria.',
        'Ingresar al enlace oficial de la empresa convocante.',
        'Completar el formulario de postulación antes de la fecha límite.'
      ]
    };

    // Prepend to local opportunities dataset so it appears live immediately in Becas/etc.
    const existingIndex = opportunitiesDetailData.findIndex(o => o.id === newOpp.id);
    if (existingIndex >= 0) {
      opportunitiesDetailData[existingIndex] = newOpp;
    } else {
      opportunitiesDetailData.unshift(newOpp);
    }

    try {
      await supabase.from('opportunities').insert([{
        title: newOpp.title,
        description: newOpp.description,
        category: newOpp.category,
        organization: newOpp.organization,
        external_link: newOpp.external_link,
        location: newOpp.location,
        deadline: newOpp.deadline,
        featured: newOpp.featured,
        status: 'active'
      }]);
    } catch (e) {
      console.warn('Supabase sync warning for approved proposal:', e);
    }

    return target;
  },

  async rejectCompanyProposal(id, reason = '') {
    const proposals = await this.getCompanyProposals();
    const target = proposals.find(p => p.id === id);
    if (!target) throw new Error('Propuesta no encontrada');

    target.status = 'rejected';
    target.rejection_reason = reason || 'No cumple con las políticas de postulación pública de Impulsa Joven Perú.';
    target.rejected_at = new Date().toISOString();
    localStorage.setItem('ij_company_proposals', JSON.stringify(proposals));
    return target;
  }
};
