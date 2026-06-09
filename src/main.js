import { storage } from './services/storage.js';
import { renderHome } from './views/home.js';
import { renderScholarships } from './views/scholarships.js';
import { renderCourses } from './views/courses.js';
import { renderJobs } from './views/jobs.js';
import { renderVolunteering } from './views/volunteering.js';
import { renderVocationalTest, initVocationalTest } from './views/vocationalTest.js';
import { renderAbout } from './views/about.js';
import { renderHelp, initHelpCenterLogic } from './views/help.js';
import { initVirtualAssistant } from './components/virtualAssistant.js';

const app = document.getElementById('app');

const routes = {
  '/': renderHome,
  '/becas': renderScholarships,
  '/cursos': renderCourses,
  '/empleos': renderJobs,
  '/voluntariado': renderVolunteering,
  '/vocacional': renderVocationalTest,
  '/sobre-proyecto': renderAbout,
  '/help': renderHelp
};

function initAnimations() {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        
        // Counter animation logic
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

function router() {
  let path = window.location.pathname;
  if (!routes[path]) path = '/';
  
  app.innerHTML = routes[path]();
  
  if (path === '/vocacional') {
    initVocationalTest();
  }

  if (path === '/help') {
    initHelpCenterLogic();
  }
  
  // Re-init animations after DOM change
  setTimeout(initAnimations, 100);
}

document.body.addEventListener('click', e => {
  if (e.target.closest('[data-link]')) {
    e.preventDefault();
    const href = e.target.closest('[data-link]').href;
    window.history.pushState(null, null, href);
    router();
    // Close mobile menu if open
    document.getElementById('mobileLinks').classList.add('hidden');
  }
});

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  storage.initDb();
  initVirtualAssistant();
  
  const user = storage.getUser();
  const greeting = document.getElementById('userGreeting');
  const nameDisplay = document.getElementById('userNameDisplay');
  const btnReg = document.getElementById('btnRegister');
  const modal = document.getElementById('registerModal');
  const close = document.querySelector('.close-modal');
  const form = document.getElementById('registerForm');
  
  if (user) {
    greeting.classList.remove('hidden');
    nameDisplay.textContent = user.name;
    btnReg.classList.add('hidden');
  }

  btnReg.addEventListener('click', () => modal.classList.remove('hidden'));
  close.addEventListener('click', () => modal.classList.add('hidden'));
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    storage.registerUser(name, email);
    
    greeting.classList.remove('hidden');
    nameDisplay.textContent = name;
    btnReg.classList.add('hidden');
    modal.classList.add('hidden');
    router(); 
  });

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      storage.logoutUser();
      greeting.classList.add('hidden');
      nameDisplay.textContent = '';
      btnReg.classList.remove('hidden');
      router();
    });
  }

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileLinks = document.getElementById('mobileLinks');
  mobileMenuBtn.addEventListener('click', () => {
    mobileLinks.classList.toggle('hidden');
  });

  router();
});
