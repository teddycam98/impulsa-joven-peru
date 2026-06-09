export function renderPrivacy() {
  return `
    <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
      <div style="background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); padding: 50px 40px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px; font-weight: 800;">Política de Privacidad</h1>
        <p class="muted" style="margin-bottom: 20px;">Última actualización: Junio 2026</p>
        
        <div style="color: rgba(255,255,255,0.8); line-height: 1.8;">
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">1. Información que recopilamos</h3>
          <p style="margin-bottom: 15px;">En Impulsa Joven Perú, recopilamos la información mínima necesaria para brindarte una experiencia personalizada. Esto incluye tu nombre, correo electrónico y las oportunidades que guardas en tus favoritos (becas, cursos, empleos, voluntariados).</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">2. Cómo utilizamos tu información</h3>
          <p style="margin-bottom: 15px;">Utilizamos tu información exclusivamente para autenticación, personalización de tu perfil y para mantener el registro de tus oportunidades guardadas. No vendemos ni compartimos tu información personal con terceros.</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">3. Seguridad de los datos</h3>
          <p style="margin-bottom: 15px;">Tus datos están protegidos mediante cifrado estándar de la industria y autenticación robusta gestionada por Supabase Auth. Solo tú tienes acceso a tus datos personales y a tus listas de favoritos.</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">4. Tus derechos</h3>
          <p style="margin-bottom: 15px;">Tienes derecho a acceder, modificar o eliminar tu información personal en cualquier momento. Si deseas eliminar tu cuenta, puedes contactarnos a hola@impulsajoven.pe.</p>
        </div>
        
        <button class="btn mt-2" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">Volver al inicio</button>
      </div>
    </div>
  `;
}
