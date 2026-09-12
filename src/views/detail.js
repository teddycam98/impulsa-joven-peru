import { opportunitiesDetailData } from '../data/opportunitiesDetailData.js';
import { dbService } from '../services/supabase.js';
import { i18n } from '../utils/i18n.js';
import { translateOpportunity } from '../utils/opportunityTranslations.js';

export async function renderOpportunityDetail(id) {
  // Try finding in rich local data first
  let rawOpp = opportunitiesDetailData.find(item => item.id === id);

  // If not found in rich local dataset, fetch from database or mock
  if (!rawOpp) {
    try {
      rawOpp = await dbService.getOpportunityById(id);
    } catch (e) {
      console.warn('Error fetching opp by id:', e);
    }
  }

  // Fallback defaults if incomplete
  if (!rawOpp) {
    return `
      <div class="container inner-page text-center" style="min-height: 50vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding-top: 220px;">
        <i class="ph ph-warning-circle" style="font-size: 3.5rem; color: var(--secondary-yellow); margin-bottom: 20px;"></i>
        <h2 style="color: white; font-size: 2rem; font-weight: 800; margin-bottom: 12px;">${i18n.t('detail.not_found_title')}</h2>
        <p class="muted" style="margin-bottom: 25px;">${i18n.t('detail.not_found_desc')}</p>
        <a href="/becas" data-link class="btn btn-yellow" style="padding: 12px 28px; border-radius: 12px; font-weight: 700;">
          ${i18n.t('detail.explore_other')}
        </a>
      </div>
    `;
  }

  // Translate post into current language (ES, EN, QU)
  const opp = translateOpportunity(rawOpp, i18n.currentLang);

  const categoryLabels = {
    scholarship: 'Beca',
    course: 'Curso Gratuito',
    internship: 'Práctica',
    job: 'Empleo',
    volunteer: 'Voluntariado',
    competition: 'Concurso'
  };

  const catLabel = i18n.t(`cat.label.${opp.category}`) || categoryLabels[opp.category] || 'Convocatoria';

  const defaultReqs = [
    i18n.currentLang === 'en' ? 'Meet socioeconomic and academic requirements established in official guidelines.' : (i18n.currentLang === 'qu' ? 'Oficial kamachikuykunata junt\'ay.' : 'Cumplir con los requisitos socioeconómicos y académicos establecidos en las bases oficiales.'),
    i18n.currentLang === 'en' ? 'Present valid national ID or foreign registration card.' : (i18n.currentLang === 'qu' ? 'Valido DNI nisqata qawachiy.' : 'Presentar documento de identidad vigente (DNI o Carné de Extranjería).'),
    i18n.currentLang === 'en' ? 'Availability to complete registration and testing within program deadlines.' : (i18n.currentLang === 'qu' ? 'Tukuy tiempopi qillqakuyman yaykunaykipaq.' : 'Disponibilidad para participar en el proceso de selección o matrícula en las fechas indicadas.')
  ];

  const defaultBenefits = [
    i18n.currentLang === 'en' ? '100% subsidized tuition or professional training.' : (i18n.currentLang === 'qu' ? '100% mana qullqiyuq yachay yanapay.' : 'Cobertura de matrícula o formación 100% subvencionada.'),
    i18n.currentLang === 'en' ? 'Official recognized credential and academic mentorship.' : (i18n.currentLang === 'qu' ? 'Oficial certificado, profesionalkunawan yachay.' : 'Acompañamiento pedagógico y certificación oficial reconocida.'),
    i18n.currentLang === 'en' ? 'Access to Impulsa Joven talent network and career board.' : (i18n.currentLang === 'qu' ? 'Impulsa Joven suyuntin redman yaykuy.' : 'Inserción a la red de becarios y bolsa laboral de egresados.')
  ];

  const defaultSteps = [
    i18n.currentLang === 'en' ? 'Carefully review official terms and application timeline.' : (i18n.currentLang === 'qu' ? 'Oficial kamachikuykunata sumaqta ñawinchay.' : 'Revisar detalladamente las bases y cronograma oficial de la convocatoria.'),
    i18n.currentLang === 'en' ? 'Complete the registration form on the official program platform.' : (i18n.currentLang === 'qu' ? 'Oficial plataformapi formulariota junt\'achiy.' : 'Completar el registro y formulario en la plataforma oficial del programa.'),
    i18n.currentLang === 'en' ? 'Upload requested documentation (diplomas, grades, ID).' : (i18n.currentLang === 'qu' ? 'DNI, notakuna, documentokunata cargay.' : 'Adjuntar la documentación solicitada (certificados, notas, DNI).'),
    i18n.currentLang === 'en' ? 'Take scheduled tests or interviews and wait for results.' : (i18n.currentLang === 'qu' ? 'Evaluacionta, entrevistata pasay resultados suyay.' : 'Rendir las evaluaciones o entrevistas programadas y esperar los resultados finales.')
  ];

  const requirements = (opp.requirements && opp.requirements.length) ? opp.requirements : defaultReqs;
  const benefits = (opp.benefits && opp.benefits.length) ? opp.benefits : defaultBenefits;
  const steps = (opp.steps && opp.steps.length) ? opp.steps : defaultSteps;

  return `
    <div class="container inner-page" style="margin-bottom: 5rem; padding-top: 220px;">
      
      <!-- Back navigation button -->
      <div style="margin-bottom: 25px;">
        <a href="javascript:history.back()" class="btn-back" style="display: inline-flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.95rem; font-weight: 600; transition: color 0.3s;" onmouseover="this.style.color='var(--secondary-yellow)'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">
          <i class="ph ph-arrow-left" style="font-size: 1.2rem;"></i> <span>${i18n.t('detail.back')}</span>
        </a>
      </div>

      <!-- Main Detail Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 35px; align-items: flex-start;">
        
        <!-- Left Content Area (Main Details) -->
        <div style="grid-column: span 2;">
          
          <!-- Header Banner -->
          <div style="background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.12); border-radius: 24px; padding: 35px; margin-bottom: 30px; position: relative; overflow: hidden;">
            
            <div style="display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 18px;">
              <span style="background: rgba(255, 199, 0, 0.15); border: 1px solid rgba(255, 199, 0, 0.3); color: #FFC700; font-size: 0.82rem; font-weight: 800; padding: 5px 14px; border-radius: 20px;">
                ${catLabel}
              </span>
              ${opp.type ? `
                <span style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; font-size: 0.82rem; font-weight: 700; padding: 5px 14px; border-radius: 20px;">
                  ${opp.type}
                </span>
              ` : ''}
              ${opp.featured ? `
                <span style="background: #FFC700; color: #041B4D; font-size: 0.78rem; font-weight: 900; padding: 5px 12px; border-radius: 20px;">
                  ${i18n.t('ui.badge_featured')}
                </span>
              ` : ''}
            </div>

            <h1 style="color: white; font-size: 2.3rem; font-weight: 900; line-height: 1.25; margin-bottom: 15px;">
              ${opp.title}
            </h1>

            <div style="display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 1.05rem; font-weight: 600;">
              <i class="ph-fill ph-buildings" style="color: #FFC700;"></i>
              <span>${opp.organization || i18n.t('detail.official_entity')}</span>
            </div>

          </div>

          <!-- Section 1: Descripción Completa -->
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; margin-bottom: 25px;">
            <h3 style="color: white; font-size: 1.3rem; font-weight: 800; margin-bottom: 14px; display: flex; align-items: center; gap: 10px;">
              <i class="ph-fill ph-info" style="color: #FFC700;"></i> ${i18n.t('detail.about_title')}
            </h3>
            <p style="color: rgba(255,255,255,0.85); font-size: 1rem; line-height: 1.7; margin: 0;">
              ${opp.description}
            </p>
          </div>

          <!-- Section 2: Requisitos de Postulación -->
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; margin-bottom: 25px;">
            <h3 style="color: white; font-size: 1.3rem; font-weight: 800; margin-bottom: 18px; display: flex; align-items: center; gap: 10px;">
              <i class="ph-fill ph-check-circle" style="color: #34d399;"></i> ${i18n.t('detail.requirements_title')}
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
              ${requirements.map(req => `
                <li style="display: flex; align-items: flex-start; gap: 12px; color: rgba(255,255,255,0.88); font-size: 0.98rem; line-height: 1.5;">
                  <i class="ph-fill ph-check" style="color: #34d399; font-size: 1.2rem; flex-shrink: 0; margin-top: 2px;"></i>
                  <span>${req}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Section 3: Beneficios y Cobertura -->
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; margin-bottom: 25px;">
            <h3 style="color: white; font-size: 1.3rem; font-weight: 800; margin-bottom: 18px; display: flex; align-items: center; gap: 10px;">
              <i class="ph-fill ph-gift" style="color: #FFC700;"></i> ${i18n.t('detail.benefits_title')}
            </h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
              ${benefits.map(b => `
                <li style="display: flex; align-items: flex-start; gap: 12px; color: rgba(255,255,255,0.88); font-size: 0.98rem; line-height: 1.5;">
                  <i class="ph-fill ph-sparkle" style="color: #FFC700; font-size: 1.2rem; flex-shrink: 0; margin-top: 2px;"></i>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Section 4: Paso a Paso: ¿Cómo Postular? -->
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.7); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 30px; margin-bottom: 30px;">
            <h3 style="color: white; font-size: 1.3rem; font-weight: 800; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
              <i class="ph-fill ph-list-numbers" style="color: #60a5fa;"></i> ${i18n.t('detail.steps_title')}
            </h3>
            <div style="display: flex; flex-direction: column; gap: 16px;">
              ${steps.map((step, idx) => `
                <div style="display: flex; align-items: flex-start; gap: 15px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 16px 20px; border-radius: 14px;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: #FFC700; color: #041B4D; font-weight: 900; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 0.95rem;">
                    ${idx + 1}
                  </div>
                  <div style="color: rgba(255,255,255,0.9); font-size: 0.98rem; line-height: 1.5; padding-top: 4px;">
                    ${step}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Final Direct Application Call-to-Action Bar -->
          <div style="background: linear-gradient(135deg, rgba(10, 77, 163, 0.4) 0%, rgba(4, 27, 77, 0.6) 100%); border: 2px solid rgba(255, 199, 0, 0.4); border-radius: 24px; padding: 35px; text-align: center; box-shadow: 0 15px 35px rgba(0,0,0,0.3);">
            <a href="${opp.external_link || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-yellow" style="padding: 16px 40px; border-radius: 14px; font-weight: 900; font-size: 1.1rem; box-shadow: 0 10px 25px rgba(255, 199, 0, 0.35); text-decoration: none; display: inline-flex; align-items: center; gap: 10px;">
              <span>${i18n.t('detail.apply_official')}</span>
              <i class="ph ph-arrow-square-out" style="font-size: 1.3rem;"></i>
            </a>
          </div>

        </div>

        <!-- Right Sticky Summary Sidebar -->
        <div style="position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px;">
          
          <!-- Card with Summary Info -->
          <div class="glass-panel" style="background: rgba(10, 25, 60, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: 24px; padding: 25px;">
            
            <h4 style="color: white; font-size: 1.15rem; font-weight: 800; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
              ${i18n.t('detail.specs_title')}
            </h4>

            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.92rem;">
              
              <!-- Fechas -->
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(255,199,0,0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i class="ph-fill ph-calendar" style="color: #FFC700; font-size: 1.1rem;"></i>
                </div>
                <div>
                  <div style="color: var(--text-muted); font-size: 0.8rem; font-weight: 600;">${i18n.t('detail.deadline')}</div>
                  <div style="color: white; font-weight: 700; font-size: 0.95rem;">${opp.deadline || i18n.t('ui.open')}</div>
                </div>
              </div>

              <!-- Rango de Edad -->
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(59, 130, 246, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i class="ph-fill ph-user" style="color: #60a5fa; font-size: 1.1rem;"></i>
                </div>
                <div>
                  <div style="color: var(--text-muted); font-size: 0.8rem; font-weight: 600;">${i18n.t('detail.age_range')}</div>
                  <div style="color: white; font-weight: 700; font-size: 0.95rem;">${opp.ageRangeLabel || i18n.t('filter.age.all')}</div>
                </div>
              </div>

              <!-- Cobertura -->
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(16, 185, 129, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i class="ph-fill ph-shield-check" style="color: #34d399; font-size: 1.1rem;"></i>
                </div>
                <div>
                  <div style="color: var(--text-muted); font-size: 0.8rem; font-weight: 600;">${i18n.t('detail.coverage')}</div>
                  <div style="color: white; font-weight: 700; font-size: 0.95rem;">${opp.coverageLabel || i18n.t('filter.coverage.full')}</div>
                </div>
              </div>

              <!-- Ubicación / Modalidad -->
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 38px; height: 38px; border-radius: 10px; background: rgba(168, 85, 247, 0.15); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <i class="ph-fill ph-map-pin" style="color: #c084fc; font-size: 1.1rem;"></i>
                </div>
                <div>
                  <div style="color: var(--text-muted); font-size: 0.8rem; font-weight: 600;">${i18n.t('detail.location_modality')}</div>
                  <div style="color: white; font-weight: 700; font-size: 0.95rem;">${opp.location || 'Nacional / Virtual'}</div>
                </div>
              </div>

            </div>

            <!-- Direct Action Button in Sidebar -->
            <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px;">
              <a href="${opp.external_link || '#'}" target="_blank" rel="noopener noreferrer" class="btn btn-yellow w-100" style="padding: 14px; border-radius: 12px; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none;">
                <span>${i18n.t('detail.apply_official')}</span> <i class="ph ph-arrow-square-out"></i>
              </a>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
