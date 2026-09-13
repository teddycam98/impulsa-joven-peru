import { i18n } from './utils/i18n.js';
import { dbService } from './services/supabase.js';
import { renderHome } from './views/home.js';
import { renderScholarships } from './views/scholarships.js';
import { renderCourses } from './views/courses.js';
import { renderJobs } from './views/jobs.js';
import { renderVolunteering } from './views/volunteering.js';
import { renderCompetitions } from './views/competitions.js';
import { renderVocationalTest, initVocationalTest } from './views/vocationalTest.js';
import { renderAbout } from './views/about.js';
import { renderHelp, initHelpCenterLogic } from './views/help.js';
import { renderProfile } from './views/profile.js';
import { renderFavorites } from './views/favorites.js';
import { renderPrivacy } from './views/privacy.js';
import { renderTerms } from './views/terms.js';
import { renderCookies } from './views/cookies.js';
import { renderAdmin } from './views/admin.js';
import { renderUniversities, initUniversitiesLogic } from './views/universities.js';
import { renderInternships } from './views/internships.js';
import { renderOpportunityDetail } from './views/detail.js';
import { renderCompanyPortal } from './views/companyPortal.js';
import { initEventsSlider } from './components/eventsHero.js';
import { initVirtualAssistant } from './components/virtualAssistant.js';
import { initOpportunityModal } from './components/opportunityModal.js';

const app = document.getElementById('app');

const routes = {
  '/': renderHome,
  '/becas': renderScholarships,
  '/cursos': renderCourses,
  '/practicas': renderInternships,
  '/empleos': renderJobs,
  '/voluntariado': renderVolunteering,
  '/concursos': renderCompetitions,
  '/vocacional': renderVocationalTest,
  '/sobre-proyecto': renderAbout,
  '/help': renderHelp,
  '/perfil': renderProfile,
  '/favoritos': renderFavorites,
  '/privacidad': renderPrivacy,
  '/terminos': renderTerms,
  '/cookies': renderCookies,
  '/admin': renderAdmin,
  '/universidades': renderUniversities,
  '/portal-empresa': renderCompanyPortal
};

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        if (entry.target.classList.contains('stat-number') && !entry.target.dataset.animated) {
          entry.target.dataset.animated = "true";
          const target = +entry.target.getAttribute('data-target');
          const duration = 2000; 
          const stepTime = Math.abs(Math.floor(duration / target));
          let current = 0;
          
          const timer = setInterval(() => {
            current += Math.ceil(target / 50);
            if (current >= target) {
              entry.target.innerText = "+" + target;
              clearInterval(timer);
            } else {
              entry.target.innerText = "+" + current;
            }
          }, stepTime > 0 ? stepTime : 10);
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll, .stat-number').forEach((el) => {
    observer.observe(el);
  });
}

async function router() {
  let path = window.location.pathname;
  if (!path.startsWith('/oportunidad/') && !routes[path]) {
    path = '/';
  }
  
  try {
    if (path.startsWith('/oportunidad/')) {
      const oppId = path.replace('/oportunidad/', '').trim();
      const html = await renderOpportunityDetail(oppId);
      app.innerHTML = html;
      i18n.translateDOM();
      window.scrollTo(0, 0);
      return;
    }

    const html = await routes[path]();
    app.innerHTML = html;
    i18n.translateDOM();
    window.scrollTo(0, 0);
  } catch (error) {
    console.error('Routing error:', error);
    app.innerHTML = `
      <div class="container flex-center" style="min-height: 60vh; flex-direction: column; text-align: center;">
        <h2 style="color: white; margin-bottom: 10px;">¡Ups! Algo salió mal.</h2>
        <p class="muted">No pudimos conectar con los servidores de Impulsa Joven.</p>
      </div>
    `;
  }
  
  if (path === '/vocacional') {
    initVocationalTest();
  }

  if (path === '/help') {
    initHelpCenterLogic();
  }

  if (path === '/universidades') {
    initUniversitiesLogic();
  }

  if (path === '/' || path === '/universidades') {
    initEventsSlider();
  }
  
  setTimeout(initAnimations, 100);
}

document.body.addEventListener('click', e => {
  if (e.target.closest('[data-link]')) {
    e.preventDefault();
    const href = e.target.closest('[data-link]').href;
    window.history.pushState(null, null, href);
    router();
    document.getElementById('mobileLinks').classList.add('hidden');
  }
});

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', async () => {
  i18n.init();
  
  // Language Selector Logic
  const langToggleBtn = document.getElementById('langToggleBtn');
  const langDropdown = document.getElementById('langDropdown');
  
  if (langToggleBtn && langDropdown) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
    });
    
    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang') || e.target.getAttribute('data-lang');
        if (lang) {
          i18n.setLanguage(lang);
          langDropdown.classList.add('hidden');
          router();
        }
      });
    });
    
    document.addEventListener('click', () => {
      if (!langDropdown.classList.contains('hidden')) {
        langDropdown.classList.add('hidden');
      }
    });
    
    // Set initial text
    const currentLangText = document.getElementById('currentLangText');
    if (currentLangText) {
      currentLangText.textContent = i18n.t(`nav.lang.${i18n.currentLang}`);
    }
  }

  initVirtualAssistant();
  initOpportunityModal();
  
  const greeting = document.getElementById('userGreeting');
  const btnReg = document.getElementById('btnRegister');
  const modal = document.getElementById('registerModal');
  const close = document.querySelector('.close-modal');
  
  const authForm = document.getElementById('authForm');
  const btnAuthSubmit = document.getElementById('btnAuthSubmit');
  const btnAuthText = document.getElementById('btnAuthText');
  const authSpinner = document.getElementById('authSpinner');
  const msgContainer = document.getElementById('authMessageContainer');
  
  const btnGoogleLogin = document.getElementById('btnGoogleLogin');
  
  const authToggleBtn = document.getElementById('authToggleBtn');
  const authToggleText = document.getElementById('authToggleText');
  const btnShowReset = document.getElementById('btnShowReset');
  
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  
  const nameGroup = document.getElementById('nameGroup');
  const passwordGroup = document.getElementById('passwordGroup');
  const socialGroup = document.getElementById('socialLoginGroup');
  const toggleContainer = document.getElementById('authToggleContainer');
  const forgotLink = document.getElementById('forgotPasswordLink');

  let authMode = 'login'; // 'login' | 'register' | 'reset'

  function showMessage(msg, type = 'error') {
    msgContainer.style.display = 'block';
    msgContainer.textContent = msg;
    msgContainer.style.backgroundColor = type === 'error' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)';
    msgContainer.style.color = type === 'error' ? '#ff6b6b' : '#51cf66';
    msgContainer.style.border = `1px solid ${type === 'error' ? '#ff6b6b' : '#51cf66'}`;
  }

  function hideMessage() {
    msgContainer.style.display = 'none';
  }

  // Setup Dropdown Toggle
  const dropdownTrigger = document.getElementById('userDropdownTrigger');
  const dropdownMenu = document.getElementById('userDropdownMenu');
  
  if (dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('hidden');
    });
  }
  
  document.addEventListener('click', (e) => {
    if (dropdownMenu && !dropdownMenu.classList.contains('hidden') && !e.target.closest('#userGreeting')) {
      dropdownMenu.classList.add('hidden');
    }
  });

  // Global Favorite Toggle
  window.toggleFav = async (btn, id, category) => {
    try {
      const isFav = await dbService.toggleFavorite(id, category);
      if (isFav) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    } catch (err) {
      if (err.message === 'Debes iniciar sesión para guardar favoritos') {
        document.getElementById('btnRegister').click();
      } else {
        console.error(err);
      }
    }
  };

  // Set user UI in Navbar
  function updateUserUI(user) {
    if (user) {
      greeting.classList.remove('hidden');
      const avatar = user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffcc00&color=041b4d&bold=true`;
      
      document.getElementById('userNameDisplay').innerHTML = `
        <img src="${avatar}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 2px solid var(--secondary-yellow); display: block;">
        <span style="font-size: 0.9rem; font-weight: 700; color: white;">${user.name.split(' ')[0]}</span>
      `;
      
      const dropdownHeader = document.getElementById('dropdownHeader');
      if (dropdownHeader) {
        const roleColor = user.role === 'admin' ? '#ef4444' : (user.role === 'company' ? '#3b82f6' : '#FFD600');
        const roleTextColor = user.role === 'user' ? '#041B4D' : '#ffffff';
        dropdownHeader.innerHTML = `
          <img src="${avatar}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid var(--secondary-yellow);">
          <div style="display: flex; flex-direction: column;">
            <span style="color: white; font-weight: bold; font-size: 0.95rem;">${user.name}</span>
            <span class="muted" style="font-size: 0.78rem;">${user.email}</span>
            <span style="display: inline-block; background: ${roleColor}; color: ${roleTextColor}; font-size: 0.7rem; font-weight: 800; border-radius: 4px; padding: 2px 8px; width: fit-content; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${user.roleLabel || (user.role === 'admin' ? 'Administrador' : (user.role === 'company' ? 'Empresa' : 'Estudiante'))}
            </span>
          </div>
        `;
      }

      const roleNavLinks = document.getElementById('roleNavLinks');
      if (roleNavLinks) {
        if (user.role === 'admin') {
          roleNavLinks.innerHTML = `
            <a href="/admin" data-link class="dropdown-item" style="padding: 12px 15px; color: #FFD600; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 700; background: rgba(255,214,0,0.08); transition: background 0.2s;"><i class="ph-fill ph-shield-check" style="font-size: 1.1rem; color: #ef4444;"></i> <span>Panel Admin</span></a>
            <a href="/portal-empresa" data-link class="dropdown-item" style="padding: 12px 15px; color: white; text-decoration: none; display: flex; align-items: center; gap: 10px; transition: background 0.2s;"><i class="ph-fill ph-buildings" style="font-size: 1.1rem; color: #60a5fa;"></i> <span>Portal Empresa</span></a>
          `;
        } else if (user.role === 'company') {
          roleNavLinks.innerHTML = `
            <a href="/portal-empresa" data-link class="dropdown-item" style="padding: 12px 15px; color: #FFD600; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 700; background: rgba(59,130,246,0.08); transition: background 0.2s;"><i class="ph-fill ph-buildings" style="font-size: 1.1rem; color: #60a5fa;"></i> <span>Portal Empresa / ATS</span></a>
          `;
        } else {
          roleNavLinks.innerHTML = '';
        }
      }
      
      const btnLogout = document.getElementById('btnLogout');
      if (btnLogout) {
        // Remove existing listeners to avoid duplicates
        const newBtnLogout = btnLogout.cloneNode(true);
        btnLogout.parentNode.replaceChild(newBtnLogout, btnLogout);
        
        newBtnLogout.addEventListener('click', async () => {
          dropdownMenu.classList.add('hidden');
          await dbService.logout();
          window.history.pushState(null, null, '/');
          router();
        });
      }

      btnReg.classList.add('hidden');
      modal.classList.add('hidden');
    } else {
      greeting.classList.add('hidden');
      document.getElementById('userNameDisplay').innerHTML = '';
      const roleNavLinks = document.getElementById('roleNavLinks');
      if (roleNavLinks) roleNavLinks.innerHTML = '';
      btnReg.classList.remove('hidden');
    }
  }

  // Initial check
  const currentUser = await dbService.getCurrentUser();
  updateUserUI(currentUser);

  // Auth State Listener
  dbService.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      const user = await dbService.getCurrentUser();
      updateUserUI(user);
    } else if (event === 'SIGNED_OUT') {
      updateUserUI(null);
    }
  });

  // Modal actions
  btnReg.addEventListener('click', () => {
    setAuthMode('login');
    modal.classList.remove('hidden');
  });
  close.addEventListener('click', () => modal.classList.add('hidden'));

  function setAuthMode(mode) {
    authMode = mode;
    hideMessage();
    authForm.reset();
    
    if (mode === 'login') {
      modalTitle.textContent = 'Bienvenido de vuelta';
      modalDesc.textContent = 'Ingresa para seguir impulsando tu futuro.';
      nameGroup.style.display = 'none';
      passwordGroup.style.display = 'block';
      socialGroup.style.display = 'block';
      toggleContainer.style.display = 'block';
      forgotLink.style.display = 'block';
      document.getElementById('regName').required = false;
      document.getElementById('regPassword').required = true;
      btnAuthText.textContent = 'Entrar';
      authToggleText.textContent = '¿No tienes cuenta?';
      authToggleBtn.textContent = 'Regístrate aquí';
    } else if (mode === 'register') {
      modalTitle.textContent = 'Únete a Impulsa Joven';
      modalDesc.textContent = 'Guarda tus oportunidades y despega.';
      nameGroup.style.display = 'block';
      passwordGroup.style.display = 'block';
      socialGroup.style.display = 'block';
      toggleContainer.style.display = 'block';
      forgotLink.style.display = 'none';
      document.getElementById('regName').required = true;
      document.getElementById('regPassword').required = true;
      btnAuthText.textContent = 'Crear cuenta';
      authToggleText.textContent = '¿Ya tienes cuenta?';
      authToggleBtn.textContent = 'Inicia sesión';
    } else if (mode === 'reset') {
      modalTitle.textContent = 'Recuperar Contraseña';
      modalDesc.textContent = 'Te enviaremos un enlace para restablecerla.';
      nameGroup.style.display = 'none';
      passwordGroup.style.display = 'none';
      socialGroup.style.display = 'none';
      toggleContainer.style.display = 'none';
      forgotLink.style.display = 'none';
      document.getElementById('regName').required = false;
      document.getElementById('regPassword').required = false;
      btnAuthText.textContent = 'Enviar enlace';
    }
  }

  authToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  });

  btnShowReset.addEventListener('click', (e) => {
    e.preventDefault();
    setAuthMode('reset');
  });

  // Demo 1-Click Login Helper
  window.ijDemoLogin = async (email, password) => {
    const emailInput = document.getElementById('regEmail');
    const passwordInput = document.getElementById('regPassword');
    if (emailInput) emailInput.value = email;
    if (passwordInput) passwordInput.value = password;
    hideMessage();
    btnAuthSubmit.disabled = true;
    authSpinner.classList.remove('hidden');
    try {
      const res = await dbService.signIn(email, password);
      const loggedUser = res?.user || (await dbService.getCurrentUser());
      updateUserUI(loggedUser);
      modal.classList.add('hidden');
      if (loggedUser?.role === 'admin') {
        window.history.pushState(null, null, '/admin');
      } else if (loggedUser?.role === 'company') {
        window.history.pushState(null, null, '/portal-empresa');
      } else {
        window.history.pushState(null, null, '/perfil');
      }
      router();
    } catch (err) {
      showMessage(err.message === 'Invalid login credentials' ? 'Credenciales incorrectas' : err.message);
    } finally {
      btnAuthSubmit.disabled = false;
      authSpinner.classList.add('hidden');
    }
  };

  // Social Login
  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', async (e) => {
      e.preventDefault();
      try { await dbService.signInWithGoogle(); } catch (err) { showMessage(err.message); }
    });
  }
  
  // Submit Form
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideMessage();
    btnAuthSubmit.disabled = true;
    authSpinner.classList.remove('hidden');

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
      if (authMode === 'login') {
        const res = await dbService.signIn(email, password);
        const loggedUser = res?.user || (await dbService.getCurrentUser());
        updateUserUI(loggedUser);
        modal.classList.add('hidden');
        if (loggedUser?.role === 'admin') {
          window.history.pushState(null, null, '/admin');
        } else if (loggedUser?.role === 'company') {
          window.history.pushState(null, null, '/portal-empresa');
        } else {
          window.history.pushState(null, null, '/perfil');
        }
        router();
      } else if (authMode === 'register') {
        const name = document.getElementById('regName').value;
        await dbService.signUp(name, email, password);
        showMessage('¡Cuenta creada exitosamente! Revisa tu correo.', 'success');
        setTimeout(() => setAuthMode('login'), 2000);
      } else if (authMode === 'reset') {
        await dbService.resetPassword(email);
        showMessage('Si el correo existe, te hemos enviado un enlace.', 'success');
        setTimeout(() => setAuthMode('login'), 3000);
      }
    } catch (err) {
      showMessage(err.message === 'Invalid login credentials' ? 'Credenciales incorrectas' : err.message);
    } finally {
      btnAuthSubmit.disabled = false;
      authSpinner.classList.add('hidden');
    }
  });

  // Mobile menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileLinks = document.getElementById('mobileLinks');
  mobileMenuBtn.addEventListener('click', () => {
    mobileLinks.classList.toggle('hidden');
  });

  router();
});
