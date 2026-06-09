import { dbService } from '../services/supabase.js';

/* ── Toast notification helper ─────────────────────────────────── */
function showToast(message, type = 'success') {
  const existing = document.querySelectorAll('.admin-toast');
  existing.forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = `admin-toast toast-${type}`;
  toast.innerHTML = `
    <i class="ph ${type === 'success' ? 'ph-check-circle' : 'ph-warning-circle'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => toast.classList.add('toast-visible'));

  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ── Category display helpers ──────────────────────────────────── */
const categoryLabels = {
  scholarship: 'Beca',
  course: 'Curso',
  job: 'Empleo',
  volunteer: 'Voluntariado'
};

const categoryIcons = {
  scholarship: 'ph-graduation-cap',
  course: 'ph-book-open-text',
  job: 'ph-briefcase',
  volunteer: 'ph-hands-clapping'
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

  /* ── Bind global handlers ──────────────────────────────────── */
  window.adminDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta oportunidad?')) {
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
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Guardando...';

    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      organization: formData.get('organization'),
      external_link: formData.get('external_link'),
      location: formData.get('location'),
      deadline: formData.get('deadline') || null,
      featured: formData.get('featured') === 'on',
      status: formData.get('status')
    };

    try {
      await dbService.createOpportunity(data);
      showToast('¡Oportunidad creada exitosamente!', 'success');
      form.reset();
      window.dispatchEvent(new Event('popstate'));
    } catch (err) {
      showToast(err.message, 'error');
      btn.disabled = false;
      btn.innerHTML = '<i class="ph ph-plus-circle"></i> Crear Oportunidad';
    }
  };

  /* ── Fetch data & compute stats ────────────────────────────── */
  const opportunities = await dbService.getOpportunities({ limit: 200 });
  const totalCount = opportunities.length;
  const activeCount = opportunities.filter(o => o.status === 'active').length;
  const featuredCount = opportunities.filter(o => o.featured).length;
  const categoryCount = 4;

  const escapeHTML = (str) => {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
  };

  /* ── Build table rows ──────────────────────────────────────── */
  const tableRows = opportunities.map(opp => {
    const cat = opp.category || 'scholarship';
    const catLabel = categoryLabels[cat] || cat;
    const catIcon = categoryIcons[cat] || 'ph-circle';
    const org = opp.organization || '—';
    const isActive = opp.status === 'active';

    return `
      <tr>
        <td class="admin-cell-title">
          <span class="admin-title-text">${escapeHTML(opp.title)}</span>
          ${opp.featured ? '<span class="admin-featured-badge"><i class="ph ph-star-fill"></i></span>' : ''}
        </td>
        <td>
          <span class="admin-badge admin-badge-${cat}">
            <i class="ph ${catIcon}"></i> ${catLabel}
          </span>
        </td>
        <td class="admin-cell-org">${escapeHTML(org)}</td>
        <td>
          <span class="admin-badge ${isActive ? 'admin-badge-active' : 'admin-badge-expired'}">
            ${isActive ? 'Activo' : 'Expirado'}
          </span>
        </td>
        <td>
          <button onclick="window.adminDelete('${opp.id}')" class="admin-action-btn danger" title="Eliminar">
            <i class="ph ph-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  /* ── Empty state for table ─────────────────────────────────── */
  const emptyState = `
    <tr>
      <td colspan="5">
        <div class="admin-empty">
          <i class="ph ph-clipboard-text"></i>
          <p>No hay oportunidades registradas</p>
          <span>Crea la primera usando el formulario de la izquierda</span>
        </div>
      </td>
    </tr>
  `;

  /* ── Full layout ───────────────────────────────────────────── */
  return `
    <div class="container mb-2" style="margin-top: 40px; min-height: 60vh;">

      <!-- Header -->
      <div class="admin-header">
        <div>
          <h1 class="admin-page-title">Panel de Administración</h1>
          <p class="admin-page-subtitle">Gestiona todas las oportunidades de la plataforma</p>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="admin-stats-row">
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="--stat-color: var(--primary);">
            <i class="ph ph-database"></i>
          </div>
          <div class="admin-stat-value">${totalCount}</div>
          <div class="admin-stat-label">Total Oportunidades</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="--stat-color: #10b981;">
            <i class="ph ph-check-circle"></i>
          </div>
          <div class="admin-stat-value">${activeCount}</div>
          <div class="admin-stat-label">Activas</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="--stat-color: #f59e0b;">
            <i class="ph ph-star"></i>
          </div>
          <div class="admin-stat-value">${featuredCount}</div>
          <div class="admin-stat-label">Destacadas</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-icon" style="--stat-color: #8b5cf6;">
            <i class="ph ph-squares-four"></i>
          </div>
          <div class="admin-stat-value">${categoryCount}</div>
          <div class="admin-stat-label">Categorías</div>
        </div>
      </div>

      <!-- Two-Column Grid -->
      <div class="admin-grid">

        <!-- Left: Form Panel -->
        <div class="admin-form-panel">
          <h3 class="admin-form-title">
            <i class="ph ph-plus-circle"></i> Nueva Oportunidad
          </h3>
          <form onsubmit="window.adminCreate(event)" class="admin-form">

            <div class="admin-field">
              <label class="form-label">Título *</label>
              <input type="text" name="title" class="admin-input" placeholder="Ej: Beca de excelencia académica" required>
            </div>

            <div class="admin-field">
              <label class="form-label">Descripción *</label>
              <textarea name="description" class="admin-input" placeholder="Descripción detallada de la oportunidad..." rows="3" required></textarea>
            </div>

            <div class="admin-field">
              <label class="form-label">Categoría *</label>
              <select name="category" class="admin-input" required>
                <option value="" disabled selected>Seleccionar categoría...</option>
                <option value="scholarship">🎓 Beca</option>
                <option value="course">📚 Curso</option>
                <option value="job">💼 Empleo</option>
                <option value="volunteer">🤝 Voluntariado</option>
              </select>
            </div>

            <div class="admin-field">
              <label class="form-label">Organización *</label>
              <input type="text" name="organization" class="admin-input" placeholder="Ej: Fundación Impulsa" required>
            </div>

            <div class="admin-field">
              <label class="form-label">Enlace externo *</label>
              <input type="url" name="external_link" class="admin-input" placeholder="https://ejemplo.com/convocatoria" required>
            </div>

            <div class="admin-field">
              <label class="form-label">Ubicación</label>
              <input type="text" name="location" class="admin-input" placeholder="Ej: Ciudad de México (Opcional)">
            </div>

            <div class="admin-field">
              <label class="form-label">Fecha de cierre</label>
              <input type="date" name="deadline" class="admin-input">
            </div>

            <div class="admin-row">
              <label class="admin-checkbox">
                <input type="checkbox" name="featured">
                <span><i class="ph ph-star"></i> Destacado</span>
              </label>
              <div class="admin-field" style="flex: 1;">
                <select name="status" class="admin-input">
                  <option value="active">🟢 Activo</option>
                  <option value="expired">🔴 Expirado</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn admin-submit-btn">
              <i class="ph ph-plus-circle"></i> Crear Oportunidad
            </button>
          </form>
        </div>

        <!-- Right: Table Panel -->
        <div class="admin-table-panel">
          <div class="admin-table-header">
            <h3 class="admin-form-title">
              <i class="ph ph-list-dashes"></i> Oportunidades
            </h3>
            <span class="admin-count-badge">${totalCount} registros</span>
          </div>
          <div class="admin-table-scroll">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Organización</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                ${totalCount > 0 ? tableRows : emptyState}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  `;
}
