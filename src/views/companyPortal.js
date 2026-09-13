import { dbService } from '../services/supabase.js';
import { i18n } from '../utils/i18n.js';

export function renderCompanyPortal() {
  setTimeout(initCompanyPortalLogic, 50);

  return `
    <div class="container inner-page" style="margin-bottom: 5rem;">
      
      <!-- Top Banner -->
      <div style="background: linear-gradient(135deg, rgba(10, 40, 95, 0.9) 0%, rgba(4, 27, 77, 0.95) 100%); border: 1px solid rgba(255, 199, 0, 0.3); border-radius: 28px; padding: 40px; margin-bottom: 40px; position: relative; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.4);">
        <div style="max-width: 700px; position: relative; z-index: 2;">
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 199, 0, 0.15); border: 1px solid rgba(255, 199, 0, 0.3); color: #FFC700; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 800; margin-bottom: 15px;">
            <i class="ph-fill ph-buildings"></i> <span>Portal Exclusivo para Empresas e Instituciones</span>
          </div>
          <h1 style="color: white; font-size: 2.6rem; font-weight: 900; margin-bottom: 12px; line-height: 1.2;">
            Publica Oportunidades y Encuentra al <span style="color: #FFC700;">Mejor Talento Joven</span>
          </h1>
          <p class="muted" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 0;">
            Publica becas, cursos, empleos o prácticas. Cada publicación será revisada y aprobada por el administrador antes de ser visible al público. Accede a nuestro <strong>Bot Clasificador ATS</strong> para revisar automáticamente los 10 mejores CVs postulados.
          </p>
        </div>
      </div>

      <!-- Main Portal Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 35px; align-items: flex-start;">
        
        <!-- Left: Form to create new post -->
        <div class="glass-panel" style="background: rgba(10, 25, 60, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 35px;">
          
          <h2 style="color: white; font-size: 1.6rem; font-weight: 800; margin-bottom: 8px; display: flex; align-items: center; gap: 10px;">
            <i class="ph-fill ph-plus-circle" style="color: #FFC700;"></i> Nueva Convocatoria
          </h2>
          <p class="muted" style="font-size: 0.92rem; margin-bottom: 25px;">
            Completa la información oficial. Tu post pasará a estado <strong>Pendiente de Aprobación</strong>.
          </p>

          <form id="companyPostForm" style="display: flex; flex-direction: column; gap: 18px;">
            
            <div id="companyFormMsg" style="display: none; padding: 14px; border-radius: 12px; font-size: 0.92rem; font-weight: 600;"></div>

            <!-- Tipo de Convocatoria -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Tipo de Publicación *
              </label>
              <select id="postCategory" required style="width: 100%; padding: 12px 14px; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">
                <option value="scholarship">Beca (Pregrado, Posgrado, Técnica)</option>
                <option value="course">Curso Gratuito / Certificación</option>
                <option value="internship" selected>Prácticas (Pre-profesional o Profesional)</option>
                <option value="job">Empleo / Vacante Laboral</option>
                <option value="competition">Concurso / Hackathon</option>
              </select>
            </div>

            <!-- Título -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Título de la Convocatoria *
              </label>
              <input type="text" id="postTitle" required placeholder="Ej: Practicante Pre-Profesional de Sistemas" style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;" />
            </div>

            <!-- Empresa u Organización -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Nombre de tu Empresa o Institución *
              </label>
              <input type="text" id="postOrg" required placeholder="Ej: Banco de Crédito BCP / Minera Las Bambas" style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;" />
            </div>

            <!-- Grid 2 Columnas: Modalidad y Ubicación -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">Modalidad</label>
                <select id="postModality" style="width: 100%; padding: 12px; background: rgba(10, 25, 60, 0.95); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;">
                  <option value="Híbrido">Híbrido</option>
                  <option value="100% Remoto">100% Remoto</option>
                  <option value="Presencial">Presencial</option>
                </select>
              </div>
              <div>
                <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">Ciudad / Región</label>
                <input type="text" id="postLocation" placeholder="Ej: Lima / Arequipa" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.9rem;" />
              </div>
            </div>

            <!-- Fecha Límite -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Fecha Límite de Postulación *
              </label>
              <input type="date" id="postDeadline" required style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;" />
            </div>

            <!-- Descripción -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Descripción del Puesto o Beneficio *
              </label>
              <textarea id="postDesc" required rows="3" placeholder="Describe las funciones, beneficios y objetivos del programa..." style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;"></textarea>
            </div>

            <!-- Requisitos Clave para el Bot ATS -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Habilidades y Requisitos Clave (Para el Bot ATS de selección) *
              </label>
              <input type="text" id="postSkills" required placeholder="Ej: Python, SQL, Excel Avanzado, Inglés Intermedio (separadas por comas)" style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;" />
              <span style="display: block; font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
                💡 El Bot ATS utilizará estas palabras clave para clasificar y seleccionar los 10 mejores CVs.
              </span>
            </div>

            <!-- Enlace Exacto de Postulación -->
            <div>
              <label style="display: block; color: rgba(255,255,255,0.9); font-size: 0.88rem; font-weight: 700; margin-bottom: 6px;">
                Enlace Oficial Exacto de Postulación *
              </label>
              <input type="url" id="postLink" required placeholder="https://tuempresa.pe/convocatoria-exacta" style="width: 100%; padding: 12px 14px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; color: white; font-family: 'Outfit', sans-serif; font-size: 0.95rem;" />
            </div>

            <button type="submit" id="btnSubmitCompanyPost" class="btn btn-yellow w-100" style="padding: 14px; border-radius: 12px; font-weight: 800; font-size: 1.05rem; margin-top: 10px;">
              Enviar Convocatoria a Aprobación
            </button>

          </form>

        </div>

        <!-- Right: Dashboard of My Posted Jobs and ATS Top 10 CVs -->
        <div style="display: flex; flex-direction: column; gap: 25px;">
          
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 30px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h3 style="color: white; font-size: 1.3rem; font-weight: 800; margin: 0;">
                Mis Publicaciones (<span id="companyPostsCount">2</span>)
              </h3>
              <span style="background: rgba(4, 163, 114, 0.2); border: 1px solid rgba(4, 163, 114, 0.4); color: #34d399; padding: 4px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 700;">
                Empresa Verificada
              </span>
            </div>

            <!-- List of Company Posts -->
            <div id="companyPostsList" style="display: flex; flex-direction: column; gap: 15px;">
              
              <!-- Sample Item 1 -->
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <span style="background: #FFC700; color: #041B4D; font-size: 0.7rem; font-weight: 900; padding: 2px 8px; border-radius: 6px;">PRÁCTICA</span>
                    <h4 style="color: white; font-weight: 700; margin: 6px 0 2px 0;">Practicante Pre-Profesional Frontend</h4>
                    <span class="muted" style="font-size: 0.82rem;">Publicado hace 3 días • 48 postulantes</span>
                  </div>
                  <span style="background: rgba(52, 211, 153, 0.2); color: #34d399; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(52, 211, 153, 0.3);">
                    Aprobado y Activo
                  </span>
                </div>
                
                <!-- ATS Bot Action Button -->
                <button onclick="window.openAtsRankingModal('Practicante Pre-Profesional Frontend')" class="btn btn-outline w-100" style="border-color: rgba(255,199,0,0.4); color: #FFC700; padding: 10px; font-size: 0.88rem; font-weight: 700; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 12px;">
                  <i class="ph-fill ph-robot"></i> Ver Top 10 CVs Seleccionados por Bot ATS
                </button>
              </div>

              <!-- Sample Item 2 -->
              <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <span style="background: rgba(255,255,255,0.1); color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 6px;">BECA</span>
                    <h4 style="color: white; font-weight: 700; margin: 6px 0 2px 0;">Beca Talento Digital 2026</h4>
                    <span class="muted" style="font-size: 0.82rem;">Enviado hoy</span>
                  </div>
                  <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
                    Pendiente de Aprobación
                  </span>
                </div>
              </div>

            </div>

          </div>

          <!-- ATS Bot Explanation Card -->
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.6); border: 1px solid rgba(255, 199, 0, 0.2); border-radius: 20px; padding: 24px;">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
              <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(255,199,0,0.15); display: flex; align-items: center; justify-content: center;">
                <i class="ph-fill ph-robot" style="color: #FFC700; font-size: 1.4rem;"></i>
              </div>
              <h4 style="color: white; font-weight: 800; margin: 0; font-size: 1.05rem;">
                ¿Cómo funciona el Bot Selector ATS?
              </h4>
            </div>
            <p class="muted" style="font-size: 0.88rem; line-height: 1.6; margin: 0;">
              Cuando los candidatos postulan con su CV, nuestro algoritmo ATS calcula un puntaje de compatibilidad analizando sus competencias técnicas, experiencia y formación. <strong>Solo los 10 mejores candidatos</strong> son presentados con informe de afinidad para ahorrarte horas de filtrado manual.
            </p>
          </div>

        </div>

      </div>

      <!-- Modal de Top 10 CVs Clasificados por ATS Bot -->
      <div id="atsRankingModal" class="modal hidden" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 99999; display: flex; justify-content: center; align-items: center; padding: 20px;">
        <div style="background: rgba(10, 25, 60, 0.98); border: 1px solid rgba(255, 199, 0, 0.3); border-radius: 24px; max-width: 800px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 35px; position: relative; box-shadow: 0 25px 60px rgba(0,0,0,0.6);">
          
          <button onclick="document.getElementById('atsRankingModal').classList.add('hidden')" style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.1); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">
            <i class="ph ph-x" style="font-size: 1.2rem;"></i>
          </button>

          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
            <div style="background: #FFC700; color: #041B4D; padding: 8px; border-radius: 12px; font-weight: 900;">
              <i class="ph-fill ph-trophy" style="font-size: 1.4rem;"></i>
            </div>
            <div>
              <h2 style="color: white; font-weight: 900; font-size: 1.5rem; margin: 0;">
                Ranking Top 10 CVs Clasificados
              </h2>
              <p class="muted" id="atsModalSubtitle" style="font-size: 0.88rem; margin: 2px 0 0 0;">
                Vacante: Practicante Pre-Profesional Frontend
              </p>
            </div>
          </div>

          <!-- Top 10 Candidate List -->
          <div id="atsCandidatesList" style="display: flex; flex-direction: column; gap: 14px;">
            ${renderMockAtsCandidates()}
          </div>

        </div>
      </div>

    </div>
  `;
}

function renderMockAtsCandidates() {
  const candidates = [
    { rank: 1, name: 'Jean Carlos Mendoza R.', career: 'Ingeniería de Sistemas (UNMSM)', score: 98, skills: 'React, TypeScript, CSS, Git', phone: '+51 987 654 321', email: 'jean.mendoza@gmail.com' },
    { rank: 2, name: 'Valeria Quispe Huamán', career: 'Desarrollo de Software (La Pontificia)', score: 96, skills: 'JavaScript, React, Tailwind, SQL', phone: '+51 966 111 222', email: 'valeria.quispe@gmail.com' },
    { rank: 3, name: 'Mateo Benavides S.', career: 'Ingeniería de Software (UNI)', score: 94, skills: 'React, Node.js, Next.js, Inglés C1', phone: '+51 955 333 444', email: 'mateo.b@gmail.com' },
    { rank: 4, name: 'Camila Rodriguez L.', career: 'Ciencias de la Computación (PUCP)', score: 92, skills: 'JavaScript, UI/UX, Git, Python', phone: '+51 944 555 666', email: 'camila.r@gmail.com' },
    { rank: 5, name: 'Diego Flores Cárdenas', career: 'Redes y Software (TECSUP)', score: 90, skills: 'React, Web APIs, Linux, Docker', phone: '+51 933 777 888', email: 'diego.f@gmail.com' },
    { rank: 6, name: 'Andrea Salazar P.', career: 'Ingeniería Informática (UTP)', score: 88, skills: 'Frontend, Vue.js, JavaScript, HTML5', phone: '+51 922 888 999', email: 'andrea.s@gmail.com' },
    { rank: 7, name: 'Rodrigo Torres Vega', career: 'Diseño y Software (SENATI)', score: 86, skills: 'JavaScript, CSS3, Figma, Git', phone: '+51 911 000 111', email: 'rodrigo.t@gmail.com' },
    { rank: 8, name: 'Luciana Morales V.', career: 'Ingeniería de Sistemas (UNSA)', score: 85, skills: 'React, REST APIs, SQL, Agile', phone: '+51 900 111 222', email: 'luciana.m@gmail.com' },
    { rank: 9, name: 'Kevin Alarcón M.', career: 'Tecnología Informática (La Pontificia)', score: 84, skills: 'HTML, CSS, JavaScript, Redes', phone: '+51 977 222 333', email: 'kevin.a@gmail.com' },
    { rank: 10, name: 'Fernanda Castillo B.', career: 'Ingeniería de Sistemas (UNSCH)', score: 82, skills: 'JavaScript, Bootstrap, QA Testing', phone: '+51 988 333 444', email: 'fernanda.c@gmail.com' }
  ];

  return candidates.map(c => `
    <div style="background: rgba(255,255,255,0.03); border: ${c.rank <= 3 ? '1px solid #FFC700' : '1px solid rgba(255,255,255,0.08)'}; border-radius: 16px; padding: 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 15px;">
      
      <div style="display: flex; align-items: center; gap: 15px;">
        <div style="width: 40px; height: 40px; border-radius: 50%; background: ${c.rank === 1 ? '#FFC700' : c.rank === 2 ? '#e2e8f0' : c.rank === 3 ? '#b45309' : 'rgba(255,255,255,0.1)'}; color: ${c.rank <= 2 ? '#041B4D' : 'white'}; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
          #${c.rank}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <h4 style="color: white; font-weight: 800; font-size: 1.05rem; margin: 0;">${c.name}</h4>
            <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 6px;">
              ${c.score}% Match ATS
            </span>
          </div>
          <div class="muted" style="font-size: 0.85rem; margin-top: 3px;">
            <i class="ph-fill ph-graduation-cap" style="color: #FFC700;"></i> ${c.career}
          </div>
          <div style="font-size: 0.8rem; color: rgba(255,255,255,0.7); margin-top: 4px;">
            <strong>Skills coincidentes:</strong> ${c.skills}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 8px;">
        <a href="mailto:${c.email}" class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: white; padding: 8px 14px; font-size: 0.82rem; border-radius: 8px; text-decoration: none;">
          <i class="ph-fill ph-envelope"></i> Contactar
        </a>
        <a href="https://wa.me/${c.phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn btn-yellow" style="padding: 8px 14px; font-size: 0.82rem; border-radius: 8px; text-decoration: none;">
          <i class="ph-fill ph-whatsapp-logo"></i> WhatsApp
        </a>
      </div>

    </div>
  `).join('');
}

export function initCompanyPortalLogic() {
  const form = document.getElementById('companyPostForm');
  const msgBox = document.getElementById('companyFormMsg');

  // Modal open helper
  window.openAtsRankingModal = function(title) {
    const modal = document.getElementById('atsRankingModal');
    const subtitle = document.getElementById('atsModalSubtitle');
    if (subtitle) subtitle.textContent = `Vacante: ${title}`;
    if (modal) modal.classList.remove('hidden');
  };

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('btnSubmitCompanyPost');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Enviando...';
    }

    try {
      const proposalData = {
        title: document.getElementById('postTitle')?.value || '',
        category: document.getElementById('postCategory')?.value || 'internship',
        organization: document.getElementById('postOrg')?.value || 'Empresa Aliada',
        modality: document.getElementById('postModality')?.value || 'Híbrido',
        location: document.getElementById('postLocation')?.value || 'Lima / Nacional',
        deadline: document.getElementById('postDeadline')?.value || '',
        description: document.getElementById('postDesc')?.value || '',
        skills: document.getElementById('postSkills')?.value || '',
        external_link: document.getElementById('postLink')?.value || 'https://impulsajoven.pe',
        company_email: 'empresa@impulsajoven.pe',
        company_phone: '+51 987 654 321',
        contact_name: 'Área de Selección & Talento'
      };

      await dbService.submitCompanyProposal(proposalData);

      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.style.background = 'rgba(16, 185, 129, 0.2)';
        msgBox.style.color = '#34d399';
        msgBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
        msgBox.innerHTML = `
          <i class="ph-fill ph-check-circle"></i> ¡Convocatoria enviada con éxito! Ha ingresado a la cola de <strong>Aprobación del Administrador</strong>. Te notificaremos apenas sea aprobada.
        `;
      }

      form.reset();
    } catch (err) {
      if (msgBox) {
        msgBox.style.display = 'block';
        msgBox.style.background = 'rgba(239, 68, 68, 0.2)';
        msgBox.style.color = '#f87171';
        msgBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
        msgBox.innerHTML = `<i class="ph-fill ph-warning-circle"></i> Error al enviar: ${err.message}`;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviar Convocatoria a Aprobación';
      }
    }
  });
}
