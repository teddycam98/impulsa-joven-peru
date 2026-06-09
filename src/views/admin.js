import { dbService } from '../services/supabase.js';

export async function renderAdmin() {
  const user = await dbService.getCurrentUser();
  if (!user) {
    setTimeout(() => {
      window.history.pushState(null, null, '/');
      window.dispatchEvent(new Event('popstate'));
      const btnReg = document.getElementById('btnRegister');
      if(btnReg) btnReg.click();
    }, 100);
    return `<div class="flex-center" style="min-height: 60vh;"><p class="muted">Redirigiendo...</p></div>`;
  }

  // Bind global functions for admin logic so they can be called from inline handlers
  window.adminDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar esta oportunidad?')) {
      try {
        await dbService.deleteOpportunity(id);
        alert('Eliminada correctamente.');
        window.dispatchEvent(new Event('popstate')); // Refresh
      } catch (err) {
        alert(err.message);
      }
    }
  };

  window.adminEdit = (id) => {
    // A more advanced version would populate the form. For the demo, we alert.
    alert('Función de edición en construcción. Puedes eliminar y crear una nueva por ahora.');
  };

  window.adminCreate = async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerText = 'Guardando...';

    const formData = new FormData(e.target);
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
      alert('Oportunidad creada exitosamente.');
      window.dispatchEvent(new Event('popstate')); // Refresh
    } catch (err) {
      alert(err.message);
      btn.disabled = false;
      btn.innerText = 'Guardar';
    }
  };

  const opportunities = await dbService.getOpportunities({ limit: 100 });

  return `
    <div class="container mb-2" style="margin-top: 40px; min-height: 60vh;">
      <h1 class="text-dark" style="font-size: 2.5rem; font-weight: 800; margin-bottom: 30px;">Panel de Administración</h1>
      
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 30px;">
        
        <!-- Formulario -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 25px;">
          <h3 style="color: white; margin-bottom: 20px;">Crear Oportunidad</h3>
          <form onsubmit="window.adminCreate(event)" style="display: flex; flex-direction: column; gap: 15px;">
            <input type="text" name="title" placeholder="Título" required style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;">
            <textarea name="description" placeholder="Descripción" rows="3" required style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px; font-family: inherit; resize: none;"></textarea>
            
            <select name="category" required style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;">
              <option value="" disabled selected>Categoría...</option>
              <option value="scholarship">Beca</option>
              <option value="course">Curso</option>
              <option value="job">Empleo</option>
              <option value="volunteer">Voluntariado</option>
            </select>
            
            <input type="text" name="organization" placeholder="Organización / Empresa" required style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;">
            <input type="url" name="external_link" placeholder="Enlace externo (https://...)" required style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;">
            <input type="text" name="location" placeholder="Ubicación (Opcional)" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;">
            
            <div style="display: flex; flex-direction: column; gap: 5px; color: white;">
              <label style="font-size: 0.9rem;">Fecha de cierre (Opcional)</label>
              <input type="date" name="deadline" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 10px; border-radius: 8px;">
            </div>
            
            <div style="display: flex; gap: 20px; color: white; align-items: center;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                <input type="checkbox" name="featured"> Destacado
              </label>
              <select name="status" style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 5px; border-radius: 5px;">
                <option value="active">Activo</option>
                <option value="expired">Expirado</option>
              </select>
            </div>
            
            <button type="submit" class="btn mt-2" style="padding: 12px; font-size: 1rem;">Guardar Oportunidad</button>
          </form>
        </div>

        <!-- Lista -->
        <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 25px; overflow-y: auto; max-height: 800px;">
          <h3 style="color: white; margin-bottom: 20px;">Últimas Oportunidades</h3>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            ${opportunities.map(opp => `
              <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <h4 style="color: white; margin-bottom: 5px;">${opp.title}</h4>
                  <span class="muted" style="font-size: 0.85rem;">${opp.category.toUpperCase()} | ${opp.organization} | ${opp.status === 'active' ? '🟢 Activo' : '🔴 Expirado'}</span>
                </div>
                <div style="display: flex; gap: 10px;">
                  <button onclick="window.adminDelete('${opp.id}')" style="background: #ff6b6b; color: white; border: none; border-radius: 5px; padding: 8px; cursor: pointer;" title="Eliminar"><i class="ph ph-trash"></i></button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
      </div>
    </div>
  `;
}
