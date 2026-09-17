import { opportunitiesDetailData } from '../data/opportunitiesDetailData.js';
import { dbService } from '../services/supabase.js';
import { i18n } from '../utils/i18n.js';
import { translateOpportunity } from '../utils/opportunityTranslations.js';
import { getUniqueImage } from '../utils/images.js';
import { linkify, hasFormLink, extractFormUrl } from '../utils/linkify.js';

const categoryLabels = {
  scholarship: 'Beca',
  course: 'Curso Gratuito',
  internship: 'Práctica',
  job: 'Empleo',
  volunteer: 'Voluntariado',
  competition: 'Concurso'
};

const categoryIcons = {
  scholarship: 'ph-graduation-cap',
  course: 'ph-book-open',
  internship: 'ph-chalkboard-teacher',
  job: 'ph-briefcase',
  volunteer: 'ph-hands-clapping',
  competition: 'ph-trophy'
};

function formatDeadline(deadline) {
  if (!deadline) return i18n.t('ui.open') || 'Convocatoria Abierta';
  try {
    const d = new Date(deadline);
    const locale = i18n.currentLang === 'en' ? 'en-US' : 'es-PE';
    return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch (error) {
    return deadline;
  }
}

export async function openOpportunityModal(id) {
  const modal = document.getElementById('oppDetailModal');
  const content = document.getElementById('oppModalContent');
  if (!modal || !content) return;

  // Show loading state
  content.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 350px; gap: 16px; padding: 40px 20px;">
      <div class="spinner" style="border: 4px solid rgba(255,255,255,0.1); border-top: 4px solid #FFD600; border-radius: 50%; width: 45px; height: 45px; animation: spin 1s linear infinite;"></div>
      <p style="color: #FFD600; font-weight: 700; font-size: 0.95rem;">Cargando información oficial...</p>
    </div>
  `;
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // Find in rich local dataset or database
  let rawOpp = opportunitiesDetailData.find(item => item.id === id);
  if (!rawOpp) {
    try {
      rawOpp = await dbService.getOpportunityById(id);
    } catch (e) {
      console.warn('Error fetching opp:', e);
    }
  }

  if (!rawOpp) {
    content.innerHTML = `
      <div style="padding: 60px 30px; text-align: center;">
        <i class="ph ph-warning-circle" style="font-size: 3.5rem; color: #FFD600; margin-bottom: 16px; display: block;"></i>
        <h3 style="color: white; font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;">Convocatoria no encontrada</h3>
        <p class="muted" style="margin-bottom: 24px;">La oportunidad seleccionada no fue encontrada o ya no está disponible.</p>
        <button class="btn btn-outline" onclick="window.closeOppModal()" style="color: white; border-color: rgba(255,255,255,0.3); padding: 10px 24px; border-radius: 12px; cursor: pointer;">Cerrar</button>
      </div>
    `;
    return;
  }

  const opp = translateOpportunity(rawOpp, i18n.currentLang);

  const defaultReqs = [
    i18n.currentLang === 'en' ? 'Meet academic and socioeconomic requirements established in the official call.' : (i18n.currentLang === 'qu' ? 'Oficial kamachikuykunata junt\'ay.' : 'Cumplir con los requisitos socioeconómicos y académicos establecidos en las bases oficiales.'),
    i18n.currentLang === 'en' ? 'Present valid national ID or identity document.' : (i18n.currentLang === 'qu' ? 'Valido DNI nisqata qawachiy.' : 'Presentar documento de identidad vigente (DNI o documento equivalente).'),
    i18n.currentLang === 'en' ? 'Full availability to participate during the required program dates.' : (i18n.currentLang === 'qu' ? 'Tukuy tiempopi qillqakuyman yaykunaykipaq.' : 'Disponibilidad para participar en el proceso de selección o inicio de actividades en las fechas indicadas.')
  ];

  const defaultBenefits = [
    i18n.currentLang === 'en' ? '100% subsidized tuition or coverage.' : (i18n.currentLang === 'qu' ? '100% mana qullqiyuq yachay yanapay.' : 'Cobertura integral o subvención del 100% según las bases.'),
    i18n.currentLang === 'en' ? 'Official recognized certificate or academic credit.' : (i18n.currentLang === 'qu' ? 'Oficial certificado, profesionalkunawan yachay.' : 'Certificación oficial reconocida y acompañamiento especializado.'),
    i18n.currentLang === 'en' ? 'Access to Impulsa Joven talent network and opportunities.' : (i18n.currentLang === 'qu' ? 'Impulsa Joven suyuntin redman yaykuy.' : 'Inserción en la red de talento y bolsa de oportunidades de Impulsa Joven.')
  ];

  const defaultSteps = [
    i18n.currentLang === 'en' ? 'Review the official rules and schedule on the organization portal.' : (i18n.currentLang === 'qu' ? 'Oficial kamachikuykunata sumaqta ñawinchay.' : 'Revisar detalladamente las bases y cronograma oficial de la convocatoria.'),
    i18n.currentLang === 'en' ? 'Complete the registration form with your personal and academic details.' : (i18n.currentLang === 'qu' ? 'Oficial plataformapi formulariota junt\'achiy.' : 'Completar el registro y formulario de postulación en la plataforma oficial.'),
    i18n.currentLang === 'en' ? 'Upload requested documentation (ID, certificates, records).' : (i18n.currentLang === 'qu' ? 'DNI, notakuna, documentokunata cargay.' : 'Adjuntar la documentación solicitada (documento de identidad, certificados o constancias).'),
    i18n.currentLang === 'en' ? 'Participate in evaluations or interviews and check results.' : (i18n.currentLang === 'qu' ? 'Evaluacionta, entrevistata pasay resultados suyay.' : 'Rendir las evaluaciones o entrevistas correspondientes y consultar los resultados oficiales.')
  ];

  const modalityMap = {
    remote: i18n.currentLang === 'en' ? '100% Remote / Virtual' : '100% Virtual / Remoto',
    onsite: i18n.currentLang === 'en' ? 'In-Person / Onsite' : 'Presencial',
    hybrid: i18n.currentLang === 'en' ? 'Hybrid (Virtual + Onsite)' : 'Modalidad Híbrida'
  };

  const coverageMap = {
    full: i18n.currentLang === 'en' ? '100% Full Coverage' : '100% Cobertura Total',
    partial: i18n.currentLang === 'en' ? 'Partial Coverage / Financial Aid' : 'Cobertura Parcial / Subvención'
  };

  let imgUrl = opp.image_url;
  if (!imgUrl || imgUrl.startsWith('/images/')) {
    imgUrl = getUniqueImage(opp);
  }

  const catLabel = i18n.t(`cat.label.${opp.category}`) || categoryLabels[opp.category] || 'Oportunidad';
  const catIcon = categoryIcons[opp.category] || 'ph-graduation-cap';
  const modalityVal = opp.modality ? (modalityMap[opp.modality] || opp.modality) : (i18n.currentLang === 'en' ? 'Flexible' : 'Flexible');
  const coverageVal = opp.coverageLabel || (opp.coverage ? (coverageMap[opp.coverage] || opp.coverage) : 'Cobertura Gratuita');
  const deadlineVal = formatDeadline(opp.deadline);
  const locationVal = opp.location || (i18n.currentLang === 'en' ? 'Peru (National)' : 'Nacional (Todo el Perú)');
  const requirements = (opp.requirements && opp.requirements.length) ? opp.requirements : defaultReqs;
  const benefits = (opp.benefits && opp.benefits.length) ? opp.benefits : defaultBenefits;
  const steps = (opp.steps && opp.steps.length) ? opp.steps : defaultSteps;
  const externalLink = opp.external_link || '#';

  // Form detection and direct resolution
  const formUrl = extractFormUrl(opp);
  const isForm = !!formUrl || hasFormLink(opp);
  const destinationUrl = formUrl || externalLink;

  content.innerHTML = `
    <!-- Modal Banner Header -->
    <div class="uni-modal-banner">
      <img src="${imgUrl}" alt="${opp.title || ''}" class="uni-modal-banner-img" onerror="this.src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80'" />
      <div class="uni-modal-banner-overlay"></div>
      <div class="uni-modal-header-badge">
        <div class="uni-modal-logo" style="display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #FFD600 0%, #FFA000 100%); color: #041B4D; font-size: 2.2rem; border-radius: 18px; box-shadow: 0 8px 24px rgba(0,0,0,0.35);">
          <i class="ph-fill ${catIcon}"></i>
        </div>
        <div class="uni-modal-title-group">
          <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 6px;">
            <span class="uni-modal-type-pill">
              <i class="ph-fill ${catIcon}"></i> ${catLabel}
            </span>
            ${opp.type ? `
              <span style="font-size: 0.76rem; background: rgba(59, 130, 246, 0.25); border: 1px solid rgba(59, 130, 246, 0.4); color: #93c5fd; padding: 4px 12px; border-radius: 20px; font-weight: 700;">
                <i class="ph-fill ph-tag"></i> ${opp.type}
              </span>
            ` : ''}
            ${opp.featured ? `
              <span style="font-size: 0.74rem; background: #FFD600; color: #041B4D; padding: 4px 10px; border-radius: 20px; font-weight: 900; letter-spacing: 0.5px;">
                <i class="ph-fill ph-star"></i> DESTACADO
              </span>
            ` : ''}
          </div>
          <h2>${opp.title || 'Convocatoria Oficial'}</h2>
        </div>
      </div>
    </div>

    <!-- Modal Body Content -->
    <div class="uni-modal-body">
      
      <!-- Key Meta Strip (4 Columns) -->
      <div class="uni-meta-grid">
        <div class="uni-meta-item">
          <span class="uni-meta-label">Entidad Convocante</span>
          <span class="uni-meta-val"><i class="ph-fill ph-buildings" style="color: #FFD600;"></i> ${opp.organization || 'Entidad Oficial'}</span>
        </div>
        <div class="uni-meta-item">
          <span class="uni-meta-label">Modalidad</span>
          <span class="uni-meta-val"><i class="ph-fill ph-chalkboard-teacher" style="color: #34d399;"></i> ${modalityVal}</span>
        </div>
        <div class="uni-meta-item">
          <span class="uni-meta-label">Cobertura / Beneficio</span>
          <span class="uni-meta-val"><i class="ph-fill ph-seal-check" style="color: #60a5fa;"></i> ${coverageVal}</span>
        </div>
        <div class="uni-meta-item">
          <span class="uni-meta-label">Cierre de Convocatoria</span>
          <span class="uni-meta-val"><i class="ph-fill ph-calendar" style="color: #f87171;"></i> ${deadlineVal}</span>
        </div>
      </div>

      <!-- Location & Age Info Bar -->
      <div style="display: flex; flex-wrap: wrap; gap: 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 12px 18px;">
        <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.86rem; color: rgba(255,255,255,0.85);">
          <i class="ph-fill ph-map-pin" style="color: #FFD600; font-size: 1.1rem;"></i>
          <strong>Ubicación:</strong> <span>${locationVal}</span>
        </div>
        ${opp.ageRangeLabel ? `
          <div style="display: inline-flex; align-items: center; gap: 8px; font-size: 0.86rem; color: rgba(255,255,255,0.85); margin-left: auto;">
            <i class="ph-fill ph-users" style="color: #60a5fa; font-size: 1.1rem;"></i>
            <strong>Edad sugerida:</strong> <span>${opp.ageRangeLabel}</span>
          </div>
        ` : ''}
      </div>

      <!-- Direct Form Action Banner (if available) -->
      ${isForm ? `
        <div class="uni-form-banner">
          <div class="uni-form-banner-text">
            <i class="ph-fill ph-file-text"></i>
            <div>
              <div style="font-weight: 800; font-size: 0.98rem; color: #FFD600;">Formulario Oficial de Inscripción Disponible</div>
              <div style="font-size: 0.82rem; color: rgba(255,255,255,0.82);">Esta convocatoria cuenta con acceso directo para registrar tu postulación en línea</div>
            </div>
          </div>
          <a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" class="btn-uni-form">
            <i class="ph-fill ph-file-text"></i>
            <span>Completar Formulario</span>
            <i class="ph ph-arrow-square-out"></i>
          </a>
        </div>
      ` : ''}

      <!-- Description with Linkify -->
      <div>
        <h3 class="uni-section-title"><i class="ph-fill ph-info"></i> ${i18n.t('detail.about_title')}</h3>
        <div class="uni-modal-desc" style="line-height: 1.7; font-size: 0.96rem; color: rgba(255,255,255,0.88);">
          ${linkify(opp.description, externalLink)}
        </div>
      </div>

      <!-- Requirements Checklist with Linkify -->
      <div>
        <h3 class="uni-section-title">
          <i class="ph-fill ph-check-circle" style="color: #34d399;"></i> ${i18n.t('detail.requirements_title')} (${requirements.length})
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${requirements.map(req => `
            <div style="display: flex; align-items: flex-start; gap: 12px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 12px 16px;">
              <i class="ph-fill ph-check-circle" style="color: #34d399; font-size: 1.25rem; flex-shrink: 0; margin-top: 2px;"></i>
              <span style="color: rgba(255,255,255,0.9); font-size: 0.92rem; line-height: 1.5;">${linkify(req, externalLink)}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Benefits & What's included with Linkify -->
      <div>
        <h3 class="uni-section-title">
          <i class="ph-fill ph-gift" style="color: #FFD600;"></i> ${i18n.t('detail.benefits_title')}
        </h3>
        <div class="uni-tags-flex">
          ${benefits.map(b => `
            <span class="uni-beca-tag" style="padding: 8px 16px; font-size: 0.88rem; border-radius: 12px;">
              <i class="ph-fill ph-star"></i> ${linkify(b, externalLink)}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Step by Step Guide with Linkify -->
      <div>
        <h3 class="uni-section-title">
          <i class="ph-fill ph-list-numbers" style="color: #FFD600;"></i> ${i18n.t('detail.steps_title')}
        </h3>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${steps.map((step, idx) => `
            <div style="display: flex; align-items: flex-start; gap: 14px; background: rgba(255, 214, 0, 0.05); border: 1px solid rgba(255, 214, 0, 0.16); border-radius: 14px; padding: 12px 16px;">
              <div style="width: 28px; height: 28px; border-radius: 50%; background: #FFD600; color: #041B4D; font-weight: 900; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">${idx + 1}</div>
              <div style="color: rgba(255,255,255,0.92); font-size: 0.92rem; line-height: 1.5; padding-top: 3px;">${linkify(step, externalLink)}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Verification Notice -->
      <div style="background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.15); border-radius: 16px; padding: 16px 20px; display: flex; align-items: center; gap: 14px;">
        <i class="ph-fill ph-shield-check" style="color: #FFD600; font-size: 2rem; flex-shrink: 0;"></i>
        <p style="color: rgba(255,255,255,0.75); font-size: 0.85rem; line-height: 1.5; margin: 0;">
          Todas las convocatorias publicadas en Impulsa Joven Perú son 100% verificadas por entidades oficiales del Estado y organismos acreditados. La postulación se efectúa en su plataforma oficial.
        </p>
      </div>

    </div>

    <!-- Modal Footer Action -->
    <div class="uni-modal-footer">
      <button class="btn btn-outline" onclick="window.closeOppModal()" style="border-color: rgba(255,255,255,0.3); color: white; padding: 11px 24px; font-size: 0.92rem; border-radius: 12px; cursor: pointer;">
        Cerrar
      </button>
      <a href="${destinationUrl}" target="_blank" rel="noopener noreferrer" class="btn-uni-portal">
        <span>${isForm ? 'Llenar Formulario Oficial' : 'Postular en Portal Oficial'}</span>
        <i class="ph ph-arrow-square-out"></i>
      </a>
    </div>
  `;
}

export function initOpportunityModal() {
  window.openOpportunityModal = openOpportunityModal;

  window.closeOppModal = function() {
    const modal = document.getElementById('oppDetailModal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  window.handleOppModalBackdrop = function(e) {
    if (e.target && e.target.id === 'oppDetailModal') {
      window.closeOppModal();
    }
  };

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('oppDetailModal');
      if (modal && modal.classList.contains('is-open')) {
        window.closeOppModal();
      }
    }
  });
}