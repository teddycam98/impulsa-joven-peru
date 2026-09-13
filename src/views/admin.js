import { dbService } from '../services/supabase.js';
import { opportunitiesDetailData } from '../data/opportunitiesDetailData.js';

/* ── Toast notification helper ─────────────────────────────────── */
function showToast(message, type = 'success') {
  const existing = document.querySelectorAll('.admin-toast');
  existing.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `admin-toast toast-${type}`;
  toast.innerHTML = `
    <i class="ph ${type === 'success' ? 'ph-check-circle' : (type === 'warning' ? 'ph-warning' : 'ph-warning-circle')}" style="font-size: 1.4rem;"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

/* ── Category display helpers ──────────────────────────────────── */
const categoryLabels = {
  scholarship: 'Beca',
  course: 'Curso',
  job: 'Empleo',
  internship: 'Prácticas',
  volunteer: 'Voluntariado',
  competition: 'Concurso'
};

const categoryIcons = {
  scholarship: 'ph-graduation-cap',
  course: 'ph-book-open-text',
  job: 'ph-briefcase',
  internship: 'ph-chalkboard-teacher',
  volunteer: 'ph-hands-clapping',
  competition: 'ph-trophy'
};

const escapeHTML = (str) => {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
};

/* ── Main render ───────────────────────────────────────────────── */
export async function renderAdmin() {
  const user = await dbService.getCurrentUser();
  if (!user) {
    setTimeout(() => {
      window.history.pushState(null, null, '/');
      window.dispatchEvent(new Event('popstate'));
      const btnReg = document.getElementById('btnRegister');
      if (btnReg) btnReg.click();
    }, 100);
    return `<div class="flex-center" style="min-height: 60vh;"><p class="muted">Redirigiendo...</p></div>`;
  }

  /* ── Tab state ─────────────────────────────────────────────── */
  if (!window.currentAdminTab) {
    window.currentAdminTab = 'proposals';
  }

  /* ── Global handlers ───────────────────────────────────────── */
  window.adminSwitchTab = (tabId) => {
    window.currentAdminTab = tabId;
    const tabs = document.querySelectorAll('.admin-tab-btn');
    tabs.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    const panels = ['proposals', 'opportunities', 'create'];
    panels.forEach(p => {
      const panelEl = document.getElementById(`adminTabPanel-${p}`);
      if (panelEl) {
        panelEl.style.display = (p === tabId) ? 'block' : 'none';
      }
    });
  };

  window.adminApproveProposal = async (id) => {
    try {
      const approved = await dbService.approveCompanyProposal(id);
      showToast(`¡Propuesta aprobada! "${approved.title}" ha sido publicada exitosamente en la plataforma.`, 'success');
      setTimeout(() => {
        window.dispatchEvent(new Event('popstate'));
      }, 700);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  window.adminRejectProposal = async (id) => {
    const reason = prompt('Indica el motivo del rechazo para la empresa (opcional):', 'No cumple con las bases mínimas o requisitos de postulación pública.');
    if (reason !== null) {
      try {
        await dbService.rejectCompanyProposal(id, reason);
        showToast('La propuesta ha sido rechazada y archivada.', 'warning');
        setTimeout(() => {
          window.dispatchEvent(new Event('popstate'));
        }, 700);
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  window.adminPreviewProposal = async (id) => {
    const proposals = await dbService.getCompanyProposals();
    const prop = proposals.find(p => p.id === id);
    if (!prop) return;

    let opp = opportunitiesDetailData.find(item => item.id === prop.id);
    if (!opp) {
      opp = {
        id: prop.id,
        title: prop.title,
        description: prop.description,
        category: prop.category || 'scholarship',
        organization: prop.organization,
        location: prop.location || 'Perú',
        deadline: prop.deadline,
        coverage: prop.coverage || '100% Cobertura Integral',
        modality: prop.modality || 'Presencial',
        external_link: prop.external_link || 'https://impulsajoven.pe',
        image_url: prop.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
        featured: true,
        requirements: prop.requirements || [
          'Alto rendimiento académico acreditado.',
          'Postulación documentada vía portal web oficial de la empresa.'
        ],
        benefits: prop.benefits || [
          '100% Cobertura o Subvención económica garantizada.',
          'Acompañamiento profesional y mentoría ejecutiva.'
        ],
        steps: [
          'Revisar las bases de la convocatoria empresarial.',
          'Ingresar al enlace oficial de postulación.',
          'Completar el registro antes de la fecha límite.'
        ]
      };
      opportunitiesDetailData.push(opp);
    }

    if (window.openOpportunityModal) {
      window.openOpportunityModal(prop.id);
    } else {
      window.open(prop.external_link, '_blank');
    }
  };

  window.adminDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta oportunidad de la plataforma?')) {
      try {
        await dbService.deleteOpportunity(id);
        showToast('Oportunidad eliminada correctamente.', 'success');
        window.dispatchEvent(new Event('popstate'));
      } catch (err) {
        showToast(err.message, 'error');
      }
    }
  };

  window.adminCreate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Publicando...';

    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      organization: formData.get('organization'),
      external_link: formData.get('external_link'),
      location: formData.get('location') || 'A nivel nacional',
      deadline: formData.get('deadline') || null,
      featured: formData.get('featured') === 'on',
      status: formData.get('status') || 'active'
    };

    try {
      await dbService.createOpportunity(data);
      showToast('¡Oportunidad creada y publicada exitosamente!', 'success');
      form.reset();
      window.currentAdminTab = 'opportunities';
      window.dispatchEvent(new Event('popstate'));
    } catch (err) {
      showToast(err.message, 'error');
      btn.disabled = false;
      btn.innerHTML = '<i class="ph-fill ph-plus-circle"></i> Publicar Convocatoria';
    }
  };

  /* ── Fetch Data ────────────────────────────────────────────── */
  const opportunities = await dbService.getOpportunities({ limit: 200 });
  const proposals = await dbService.getCompanyProposals();

  const totalCount = opportunities.length;
  const activeCount = opportunities.filter(o => o.status === 'active').length;
  const featuredCount = opportunities.filter(o => o.featured).length;

  const pendingProposals = proposals.filter(p => p.status === 'pending');
  const processedProposals = proposals.filter(p => p.status !== 'pending');
  const pendingCount = pendingProposals.length;

  /* ── Proposals Render ──────────────────────────────────────── */
  const renderProposalCard = (prop) => {
    const isPending = prop.status === 'pending';
    const isApproved = prop.status === 'approved';
    const cat = prop.category || 'scholarship';
    const catLabel = categoryLabels[cat] || cat;
    const catIcon = categoryIcons[cat] || 'ph-graduation-cap';

    const rawDate = prop.created_at ? new Date(prop.created_at) : new Date();
    const formattedDate = rawDate.toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' });

    let statusBadgeHTML = '';
    if (isPending) {
      statusBadgeHTML = `
        <span class="proposal-status-badge proposal-status-pending">
          <i class="ph-fill ph-clock"></i> Pendiente de Aprobación
        </span>
      `;
    } else if (isApproved) {
      statusBadgeHTML = `
        <span class="proposal-status-badge proposal-status-approved">
          <i class="ph-fill ph-check-circle"></i> Publicada en Plataforma
        </span>
      `;
    } else {
      statusBadgeHTML = `
        <span class="proposal-status-badge proposal-status-rejected">
          <i class="ph-fill ph-x-circle"></i> Propuesta Rechazada
        </span>
      `;
    }

    return `
      <div class="admin-proposal-card" id="propCard-${prop.id}">
        
        <!-- Card Top Bar -->
        <div class="proposal-top-bar">
          <div class="proposal-org-info">
            <div class="proposal-org-icon">
              <i class="ph-fill ${catIcon}"></i>
            </div>
            <div class="proposal-org-meta">
              <div class="proposal-org-name">
                <span>${escapeHTML(prop.organization)}</span>
                <span class="proposal-verified-tag"><i class="ph-fill ph-seal-check"></i> Empresa Verificada</span>
              </div>
              <span class="proposal-submit-date">Enviada el ${formattedDate}</span>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="admin-badge admin-badge-${cat}">
              <i class="ph ${catIcon}"></i> ${catLabel}
            </span>
            ${statusBadgeHTML}
          </div>
        </div>

        <!-- Main Content -->
        <div class="proposal-main-content">
          <h3 class="proposal-title">${escapeHTML(prop.title)}</h3>
          <p class="proposal-desc">${escapeHTML(prop.description)}</p>

          <div class="proposal-chips-row">
            ${prop.coverage ? `
              <span class="proposal-chip">
                <i class="ph-fill ph-shield-check"></i> <strong>Cobertura:</strong> ${escapeHTML(prop.coverage)}
              </span>
            ` : ''}
            ${prop.modality ? `
              <span class="proposal-chip">
                <i class="ph-fill ph-chalkboard-teacher"></i> <strong>Modalidad:</strong> ${escapeHTML(prop.modality)}
              </span>
            ` : ''}
            ${prop.location ? `
              <span class="proposal-chip">
                <i class="ph-fill ph-map-pin"></i> <strong>Ubicación:</strong> ${escapeHTML(prop.location)}
              </span>
            ` : ''}
            ${prop.deadline ? `
              <span class="proposal-chip">
                <i class="ph-fill ph-calendar"></i> <strong>Fecha Límite:</strong> ${prop.deadline}
              </span>
            ` : ''}
          </div>

          ${prop.skills ? `
            <div class="proposal-skills-box">
              <i class="ph-fill ph-cpu" style="color: #FFD600; margin-right: 6px;"></i>
              <strong>Requisitos / Palabras Clave ATS:</strong> ${escapeHTML(prop.skills)}
            </div>
          ` : ''}

          <div class="proposal-contact-box">
            <span><i class="ph-fill ph-user"></i> ${prop.contact_name || 'Representante de Empresa'}</span>
            <span><i class="ph-fill ph-envelope"></i> ${prop.company_email || 'empresa@impulsajoven.pe'}</span>
            <span><i class="ph-fill ph-phone"></i> ${prop.company_phone || '+51 987 654 321'}</span>
            <a href="${prop.external_link}" target="_blank" rel="noopener noreferrer" style="color: #FFD600; margin-left: auto; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
              Enlace Oficial <i class="ph ph-arrow-square-out"></i>
            </a>
          </div>
        </div>

        <!-- Actions Bar -->
        ${isPending ? `
          <div class="proposal-actions-bar">
            <button onclick="window.adminApproveProposal('${prop.id}')" class="btn-proposal-approve">
              <i class="ph-fill ph-check-circle"></i> Aprobar y Publicar en Plataforma
            </button>
            <button onclick="window.adminRejectProposal('${prop.id}')" class="btn-proposal-reject">
              <i class="ph-fill ph-x-circle"></i> Rechazar Propuesta
            </button>
            <button onclick="window.adminPreviewProposal('${prop.id}')" class="btn-proposal-preview">
              <i class="ph-fill ph-eye"></i> Vista Previa en Vivo
            </button>
          </div>
        ` : `
          <div class="proposal-actions-bar" style="justify-content: space-between;">
            <span style="font-size: 0.85rem; color: rgba(255,255,255,0.6);">
              ${isApproved ? '🟢 Esta convocatoria ya se encuentra activa y visible para todos los estudiantes.' : `🔴 Motivo de rechazo: ${escapeHTML(prop.rejection_reason || 'Rechazado')}`}
            </span>
            <button onclick="window.adminPreviewProposal('${prop.id}')" class="btn-proposal-preview">
              <i class="ph-fill ph-eye"></i> Ver Vista Previa
            </button>
          </div>
        `}

      </div>
    `;
  };

  /* ── Opportunities Table Rows ──────────────────────────────── */
  const tableRows = opportunities.map(opp => {
    const cat = opp.category || 'scholarship';
    const catLabel = categoryLabels[cat] || cat;
    const catIcon = categoryIcons[cat] || 'ph-circle';
    const org = opp.organization || '—';
    const isActive = opp.status === 'active';

    return `
      <tr>
        <td class="admin-cell-title">
          <span>${escapeHTML(opp.title)}</span>
          ${opp.featured ? '<span style="color: #FFD600; margin-left: 6px;"><i class="ph-fill ph-star"></i></span>' : ''}
        </td>
        <td>
          <span class="admin-badge admin-badge-${cat}">
            <i class="ph ${catIcon}"></i> ${catLabel}
          </span>
        </td>
        <td class="admin-cell-org">${escapeHTML(org)}</td>
        <td>
          <span class="admin-badge ${isActive ? 'admin-badge-active' : 'admin-badge-expired'}">
            ${isActive ? '🟢 Activo' : '🔴 Expirado'}
          </span>
        </td>
        <td>
          <div style="display: flex; gap: 8px;">
            <button onclick="window.openOpportunityModal('${opp.id}')" class="admin-action-btn" title="Ver Convocatoria">
              <i class="ph ph-eye"></i>
            </button>
            <button onclick="window.adminDelete('${opp.id}')" class="admin-action-btn danger" title="Eliminar Convocatoria">
              <i class="ph ph-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="admin-container" style="margin-top: 30px; margin-bottom: 60px; min-height: 75vh;">

      <!-- Header Banner -->
      <div class="admin-header-card">
        <div class="admin-header-left">
          <div class="admin-avatar-wrap">
            <img src="${user.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" class="admin-avatar-img" alt="Admin Avatar" />
            <span class="admin-avatar-badge" title="En línea"></span>
          </div>
          <div class="admin-header-meta">
            <span class="admin-role-pill">
              <i class="ph-fill ph-shield-check"></i> Super Administrador General
            </span>
            <h1 class="admin-title-row">Panel de Administración</h1>
            <p class="admin-subtitle-row">Revisa propuestas empresariales, aprueba becas y gestiona la plataforma en tiempo real.</p>
          </div>
        </div>

        <div class="admin-header-actions">
          <a href="/" data-link class="admin-head-btn">
            <i class="ph ph-globe"></i> Ver Plataforma
          </a>
          <a href="/portal-empresa" data-link class="admin-head-btn">
            <i class="ph-fill ph-buildings"></i> Portal Empresa
          </a>
          <button onclick="window.dispatchEvent(new Event('popstate'))" class="admin-head-btn admin-head-btn--primary">
            <i class="ph ph-arrows-clockwise"></i> Actualizar
          </button>
        </div>
      </div>

      <!-- KPI Stats Grid -->
      <div class="admin-stats-grid">
        
        <div class="admin-stat-card ${pendingCount > 0 ? 'admin-stat-card--pulse' : ''}" onclick="window.adminSwitchTab('proposals')">
          <div class="admin-stat-top">
            <div class="admin-stat-icon-wrap" style="background: rgba(245, 158, 11, 0.2); color: #fbbf24;">
              <i class="ph-fill ph-bell-ringing"></i>
            </div>
            ${pendingCount > 0 ? `
              <span class="admin-stat-pulse-badge">
                <i class="ph-fill ph-circle"></i> ${pendingCount} Nueva${pendingCount > 1 ? 's' : ''}
              </span>
            ` : '<span style="color: rgba(255,255,255,0.4); font-size: 0.75rem;">Al día</span>'}
          </div>
          <div class="admin-stat-num" style="color: ${pendingCount > 0 ? '#FFD600' : 'white'};">${pendingCount}</div>
          <div class="admin-stat-title">Propuestas de Empresas por Revisar</div>
        </div>

        <div class="admin-stat-card" onclick="window.adminSwitchTab('opportunities')">
          <div class="admin-stat-top">
            <div class="admin-stat-icon-wrap" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa;">
              <i class="ph-fill ph-database"></i>
            </div>
            <span style="color: rgba(255,255,255,0.4); font-size: 0.75rem;">Total</span>
          </div>
          <div class="admin-stat-num">${totalCount}</div>
          <div class="admin-stat-title">Convocatorias en Plataforma</div>
        </div>

        <div class="admin-stat-card" onclick="window.adminSwitchTab('opportunities')">
          <div class="admin-stat-top">
            <div class="admin-stat-icon-wrap" style="background: rgba(16, 185, 129, 0.2); color: #34d399;">
              <i class="ph-fill ph-check-circle"></i>
            </div>
            <span style="color: #34d399; font-size: 0.75rem;">Activas</span>
          </div>
          <div class="admin-stat-num">${activeCount}</div>
          <div class="admin-stat-title">Oportunidades Públicas Visibles</div>
        </div>

        <div class="admin-stat-card" onclick="window.adminSwitchTab('opportunities')">
          <div class="admin-stat-top">
            <div class="admin-stat-icon-wrap" style="background: rgba(234, 179, 8, 0.2); color: #facc15;">
              <i class="ph-fill ph-star"></i>
            </div>
            <span style="color: #facc15; font-size: 0.75rem;">Destacadas</span>
          </div>
          <div class="admin-stat-num">${featuredCount}</div>
          <div class="admin-stat-title">En Portada y Top de Búsqueda</div>
        </div>

      </div>

      <!-- Segmented Tabs Navigation -->
      <div class="admin-tabs-bar">
        <button class="admin-tab-btn ${window.currentAdminTab === 'proposals' ? 'active' : ''}" data-tab="proposals" onclick="window.adminSwitchTab('proposals')">
          <i class="ph-fill ph-tray"></i>
          <span>Propuestas de Empresas</span>
          <span class="admin-tab-pill-count ${pendingCount > 0 ? 'admin-tab-pill-count--alert' : ''}">${pendingCount}</span>
        </button>

        <button class="admin-tab-btn ${window.currentAdminTab === 'opportunities' ? 'active' : ''}" data-tab="opportunities" onclick="window.adminSwitchTab('opportunities')">
          <i class="ph-fill ph-list-dashes"></i>
          <span>Convocatorias Publicadas</span>
          <span class="admin-tab-pill-count">${totalCount}</span>
        </button>

        <button class="admin-tab-btn ${window.currentAdminTab === 'create' ? 'active' : ''}" data-tab="create" onclick="window.adminSwitchTab('create')">
          <i class="ph-fill ph-plus-circle"></i>
          <span>Publicar Nueva Oportunidad</span>
        </button>
      </div>

      <!-- TAB 1: Company Proposals Review -->
      <div id="adminTabPanel-proposals" style="display: ${window.currentAdminTab === 'proposals' ? 'block' : 'none'};">
        
        <!-- Instruction Banner -->
        <div style="background: rgba(255, 214, 0, 0.08); border: 1px solid rgba(255, 214, 0, 0.25); border-radius: 18px; padding: 18px 24px; margin-bottom: 25px; display: flex; align-items: center; gap: 16px;">
          <i class="ph-fill ph-info" style="color: #FFD600; font-size: 2rem; flex-shrink: 0;"></i>
          <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 0.95rem; line-height: 1.5;">
            <strong>¿Cómo revisar y aceptar propuestas?</strong> Aquí aparecen las convocatorias enviadas por empresas desde el <em>Portal de Empresa</em>. Revisa las condiciones, requisitos y enlace oficial. Pulsa <strong>"Aprobar y Publicar en Plataforma"</strong> para activar inmediatamente la convocatoria en la sección correspondiente (Becas, Prácticas, etc.) para que todos los jóvenes peruanos puedan verla y postular.
          </p>
        </div>

        <div class="admin-proposals-wrap">
          ${pendingProposals.length > 0 ? `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <h2 style="color: white; font-size: 1.35rem; font-weight: 800; display: flex; align-items: center; gap: 8px;">
                <i class="ph-fill ph-clock-countdown" style="color: #fbbf24;"></i> Pendientes de Revisión (${pendingCount})
              </h2>
            </div>
            ${pendingProposals.map(renderProposalCard).join('')}
          ` : `
            <div style="text-align: center; padding: 50px 20px; background: rgba(10, 26, 68, 0.6); border-radius: 20px; border: 1px dashed rgba(255,255,255,0.15);">
              <i class="ph-fill ph-check-circle" style="font-size: 3.5rem; color: #34d399; margin-bottom: 12px; display: block;"></i>
              <h3 style="color: white; font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;">¡Bandeja al día!</h3>
              <p style="color: rgba(255,255,255,0.6); margin: 0;">No tienes propuestas de empresas pendientes por revisar.</p>
            </div>
          `}

          ${processedProposals.length > 0 ? `
            <div style="margin-top: 40px; padding-top: 25px; border-top: 1px solid rgba(255,255,255,0.1);">
              <h2 style="color: rgba(255,255,255,0.85); font-size: 1.25rem; font-weight: 800; margin-bottom: 18px; display: flex; align-items: center; gap: 8px;">
                <i class="ph-fill ph-archive"></i> Historial de Propuestas Procesadas (${processedProposals.length})
              </h2>
              ${processedProposals.map(renderProposalCard).join('')}
            </div>
          ` : ''}
        </div>

      </div>

      <!-- TAB 2: Published Opportunities Table -->
      <div id="adminTabPanel-opportunities" style="display: ${window.currentAdminTab === 'opportunities' ? 'block' : 'none'};">
        <div class="admin-table-panel">
          
          <div class="admin-table-top-controls">
            <div>
              <h3 style="color: white; font-size: 1.3rem; font-weight: 800; margin-bottom: 4px;">
                Todas las Convocatorias (${totalCount})
              </h3>
              <p style="color: rgba(255,255,255,0.6); font-size: 0.88rem; margin: 0;">
                Oportunidades actualmente catalogadas en la plataforma.
              </p>
            </div>

            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="text" id="adminSearchInput" placeholder="Buscar por título o entidad..." class="admin-search-input" oninput="
                const q = this.value.toLowerCase();
                const rows = document.querySelectorAll('.admin-table tbody tr');
                rows.forEach(r => {
                  r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none';
                });
              " />
            </div>
          </div>

          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Convocatoria / Título</th>
                  <th>Categoría</th>
                  <th>Entidad Convocante</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${totalCount > 0 ? tableRows : `
                  <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: rgba(255,255,255,0.5);">
                      No se encontraron oportunidades registradas.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      <!-- TAB 3: Create New Opportunity Form -->
      <div id="adminTabPanel-create" style="display: ${window.currentAdminTab === 'create' ? 'block' : 'none'};">
        <div class="admin-create-form-card">
          <div style="margin-bottom: 25px;">
            <h2 style="color: white; font-size: 1.6rem; font-weight: 800; margin-bottom: 6px; display: flex; align-items: center; gap: 10px;">
              <i class="ph-fill ph-plus-circle" style="color: #FFD600;"></i> Publicar Convocatoria Directa
            </h2>
            <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem; margin: 0;">
              Ingresa una nueva oportunidad para que aparezca inmediatamente activa en la web.
            </p>
          </div>

          <form onsubmit="window.adminCreate(event)" style="display: flex; flex-direction: column; gap: 18px;">
            <div>
              <label class="form-label">Título de la Convocatoria *</label>
              <input type="text" name="title" class="admin-input" placeholder="Ej: Beca Presidente del Bicentenario 2026" required />
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label class="form-label">Categoría *</label>
                <select name="category" class="admin-input" required>
                  <option value="scholarship" selected>🎓 Beca</option>
                  <option value="course">📚 Curso Gratuito</option>
                  <option value="internship">💼 Prácticas</option>
                  <option value="job">🏢 Empleo</option>
                  <option value="competition">🏆 Concurso</option>
                  <option value="volunteer">🤝 Voluntariado</option>
                </select>
              </div>

              <div>
                <label class="form-label">Organización / Entidad Convocante *</label>
                <input type="text" name="organization" class="admin-input" placeholder="Ej: PRONABEC / Google" required />
              </div>
            </div>

            <div>
              <label class="form-label">Descripción Detallada *</label>
              <textarea name="description" class="admin-input" rows="4" placeholder="Detalla los beneficios, objetivos y características de la oportunidad..." required></textarea>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <label class="form-label">Ubicación / Cobertura</label>
                <input type="text" name="location" class="admin-input" placeholder="Ej: Nacional (Perú) / Lima / Extranjero" />
              </div>
              <div>
                <label class="form-label">Fecha Límite de Postulación</label>
                <input type="date" name="deadline" class="admin-input" />
              </div>
            </div>

            <div>
              <label class="form-label">Enlace Oficial de Postulación *</label>
              <input type="url" name="external_link" class="admin-input" placeholder="https://entidad.gob.pe/convocatoria" required />
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: rgba(255,255,255,0.04); border-radius: 14px; border: 1px solid rgba(255,255,255,0.1);">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; color: white; font-weight: 700; font-size: 0.95rem;">
                <input type="checkbox" name="featured" style="width: 20px; height: 20px; accent-color: #FFD600;" />
                <span><i class="ph-fill ph-star" style="color: #FFD600;"></i> Destacar en Portada (Prioridad visual alta)</span>
              </label>

              <select name="status" class="admin-input" style="width: 140px;">
                <option value="active" selected>🟢 Activo</option>
                <option value="expired">🔴 Expirado</option>
              </select>
            </div>

            <button type="submit" class="btn btn-yellow w-100" style="padding: 16px; border-radius: 14px; font-weight: 800; font-size: 1.05rem; margin-top: 10px;">
              <i class="ph-fill ph-plus-circle"></i> Publicar Convocatoria en Plataforma
            </button>
          </form>
        </div>
      </div>

    </div>
  `;
}
