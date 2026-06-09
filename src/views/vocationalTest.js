import { storage } from '../services/storage.js';

export function renderVocationalTest() {
  storage.logImpact('tests_taken');
  
  return `
    <div class="container mb-2" style="max-width: 600px;">
      <h1 class="text-center">Test Vocacional Express</h1>
      <p class="text-center">Responde estas breves preguntas para descubrir áreas que encajan con tus intereses.</p>
      
      <div class="card mt-2" id="testContainer">
        <form id="vocationalForm">
          <div class="form-group">
            <label>1. ¿Qué actividad disfrutas más?</label>
            <select id="q1" required>
              <option value="">Selecciona una opción</option>
              <option value="tech">Resolver problemas con computadoras o tecnología</option>
              <option value="art">Dibujar, diseñar o crear contenido visual</option>
              <option value="biz">Organizar proyectos, liderar grupos o ventas</option>
              <option value="social">Ayudar a otras personas o enseñar</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary w-100">Ver Resultados</button>
        </form>
      </div>

      <div id="testResult" class="card mt-2 hidden text-center">
        <h2>Tu perfil sugerido:</h2>
        <h3 id="resultTitle" style="color: var(--primary-blue); margin: 10px 0;"></h3>
        <p id="resultDesc"></p>
        <div class="mt-2">
          <a href="/cursos" data-link class="btn btn-secondary">Ver Cursos Relacionados</a>
        </div>
      </div>
    </div>
  `;
}

export function initVocationalTest() {
  const form = document.getElementById('vocationalForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = document.getElementById('q1').value;
      let title = '';
      let desc = '';

      switch(val) {
        case 'tech': title = 'Tecnología y Programación'; desc = 'Tienes un perfil analítico ideal para Ingeniería de Software, Ciencia de Datos o Sistemas.'; break;
        case 'art': title = 'Diseño y Comunicación Visual'; desc = 'Tu creatividad es tu fuerte. Podrías destacar en Diseño Gráfico, UX/UI o Marketing Digital.'; break;
        case 'biz': title = 'Negocios y Gestión'; desc = 'El liderazgo y la organización son lo tuyo. Considera Administración, Economía o Emprendimiento.'; break;
        case 'social': title = 'Educación y Ciencias Sociales'; desc = 'Tu vocación de servicio te hace ideal para Psicología, Educación o Trabajo Social.'; break;
      }

      document.getElementById('resultTitle').textContent = title;
      document.getElementById('resultDesc').textContent = desc;
      document.getElementById('testContainer').classList.add('hidden');
      document.getElementById('testResult').classList.remove('hidden');
    });
  }
}
