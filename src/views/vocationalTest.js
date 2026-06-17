// Vocational Test — standalone, no external dependencies beyond Supabase (optional)

export function renderVocationalTest() {
  return `
    <div class="container inner-page" style="max-width: 700px; margin-bottom: 2rem;">
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: rgba(255,213,0,0.15); border-radius: 50%; margin-bottom: 20px;">
          <i class="ph-fill ph-compass" style="font-size: 2.5rem; color: var(--secondary-yellow);"></i>
        </div>
        <h1 style="color: white; font-size: 3rem; font-weight: 900; margin-bottom: 10px;">Test Vocacional Express</h1>
        <p class="muted" style="font-size: 1.1rem;">Responde estas breves preguntas para descubrir áreas que encajan con tus intereses.</p>
      </div>
      
      <div id="testContainer" style="background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 40px; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
        <form id="vocationalForm" style="display: flex; flex-direction: column; gap: 24px;">
          <div>
            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">1. ¿Qué actividad disfrutas más?</label>
            <select id="q1" required style="width: 100%; padding: 14px 18px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 12px; font-family: 'Outfit', sans-serif; font-size: 1rem; transition: all 0.3s ease; appearance: none; cursor: pointer;">
              <option value="">Selecciona una opción</option>
              <option value="tech">Resolver problemas con computadoras o tecnología</option>
              <option value="art">Dibujar, diseñar o crear contenido visual</option>
              <option value="biz">Organizar proyectos, liderar grupos o ventas</option>
              <option value="social">Ayudar a otras personas o enseñar</option>
            </select>
          </div>

          <div>
            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">2. ¿Cómo prefieres trabajar?</label>
            <select id="q2" required style="width: 100%; padding: 14px 18px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 12px; font-family: 'Outfit', sans-serif; font-size: 1rem; transition: all 0.3s ease; appearance: none; cursor: pointer;">
              <option value="">Selecciona una opción</option>
              <option value="solo">Solo, concentrado en mis tareas</option>
              <option value="team">En equipo, colaborando con otros</option>
              <option value="lead">Liderando y tomando decisiones</option>
              <option value="field">En el campo, conectando con personas</option>
            </select>
          </div>

          <div>
            <label style="display: block; color: rgba(255,255,255,0.7); font-size: 0.9rem; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">3. ¿Qué materia del colegio te gustaba más?</label>
            <select id="q3" required style="width: 100%; padding: 14px 18px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 12px; font-family: 'Outfit', sans-serif; font-size: 1rem; transition: all 0.3s ease; appearance: none; cursor: pointer;">
              <option value="">Selecciona una opción</option>
              <option value="math">Matemáticas y Ciencias</option>
              <option value="art">Arte, Música o Comunicación</option>
              <option value="lang">Lenguaje, Historia o Ciencias Sociales</option>
              <option value="sport">Educación Física o actividades prácticas</option>
            </select>
          </div>

          <button type="submit" class="btn btn-yellow" style="width: 100%; padding: 16px; font-size: 1.1rem; margin-top: 10px;">
            <i class="ph ph-sparkle"></i> Ver Mis Resultados
          </button>
        </form>
      </div>

      <div id="testResult" class="hidden" style="background: rgba(255,255,255,0.04); backdrop-filter: blur(20px); border: 1px solid rgba(255,213,0,0.3); border-radius: 24px; padding: 50px 40px; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; background: rgba(255,213,0,0.15); border-radius: 50%; margin-bottom: 20px;">
          <i class="ph-fill ph-trophy" style="font-size: 2.5rem; color: var(--secondary-yellow);"></i>
        </div>
        <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Tu perfil sugerido</p>
        <h2 id="resultTitle" style="color: var(--secondary-yellow); font-size: 2rem; margin-bottom: 15px; font-weight: 800;"></h2>
        <p id="resultDesc" style="color: rgba(255,255,255,0.8); font-size: 1.1rem; line-height: 1.6; max-width: 500px; margin: 0 auto 30px;"></p>
        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
          <a href="/cursos" data-link class="btn btn-yellow" style="padding: 14px 28px;">
            <i class="ph ph-book-open"></i> Ver Cursos Relacionados
          </a>
          <button class="btn btn-outline" onclick="document.getElementById('testContainer').classList.remove('hidden'); document.getElementById('testResult').classList.add('hidden');" style="padding: 14px 28px;">
            <i class="ph ph-arrow-counter-clockwise"></i> Reintentar
          </button>
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
      const q1 = document.getElementById('q1').value;
      const q2 = document.getElementById('q2').value;
      const q3 = document.getElementById('q3').value;
      
      // Simple scoring system
      const scores = { tech: 0, art: 0, biz: 0, social: 0 };
      
      // Q1 direct mapping
      if (q1) scores[q1]++;
      
      // Q2 mapping
      if (q2 === 'solo') scores.tech++;
      else if (q2 === 'team') scores.art++;
      else if (q2 === 'lead') scores.biz++;
      else if (q2 === 'field') scores.social++;
      
      // Q3 mapping
      if (q3 === 'math') scores.tech++;
      else if (q3 === 'art') scores.art++;
      else if (q3 === 'lang') scores.social++;
      else if (q3 === 'sport') scores.biz++;
      
      // Find highest
      const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      
      const profiles = {
        tech: {
          title: 'Tecnología y Programación',
          desc: 'Tienes un perfil analítico ideal para Ingeniería de Software, Ciencia de Datos o Sistemas. Tu capacidad para resolver problemas de forma lógica te posiciona como un gran candidato en el sector tecnológico.'
        },
        art: {
          title: 'Diseño y Comunicación Visual',
          desc: 'Tu creatividad es tu mayor fortaleza. Podrías destacar en Diseño Gráfico, UX/UI, Marketing Digital o Comunicación Audiovisual. El mundo necesita mentes creativas como la tuya.'
        },
        biz: {
          title: 'Negocios y Gestión',
          desc: 'El liderazgo y la organización son lo tuyo. Considera Administración de Empresas, Economía, Emprendimiento o Gestión de Proyectos. Naciste para liderar.'
        },
        social: {
          title: 'Educación y Ciencias Sociales',
          desc: 'Tu vocación de servicio te hace ideal para Psicología, Educación, Trabajo Social o Derecho. Tu empatía y deseo de ayudar pueden transformar comunidades enteras.'
        }
      };

      const result = profiles[winner];
      document.getElementById('resultTitle').textContent = result.title;
      document.getElementById('resultDesc').textContent = result.desc;
      document.getElementById('testContainer').classList.add('hidden');
      document.getElementById('testResult').classList.remove('hidden');
    });
  }
}
