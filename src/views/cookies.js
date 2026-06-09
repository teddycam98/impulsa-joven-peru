export function renderCookies() {
  return `
    <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
      <div style="background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); padding: 50px 40px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px; font-weight: 800;">Política de Cookies</h1>
        <p class="muted" style="margin-bottom: 20px;">Última actualización: Junio 2026</p>
        
        <div style="color: rgba(255,255,255,0.8); line-height: 1.8;">
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">1. ¿Qué son las Cookies?</h3>
          <p style="margin-bottom: 15px;">Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Ayudan a que el sitio web funcione correctamente y proporcionan información sobre cómo los usuarios interactúan con él.</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">2. Cómo usamos las Cookies</h3>
          <p style="margin-bottom: 15px;">En Impulsa Joven Perú utilizamos cookies estrictamente necesarias. Esto incluye:</p>
          <ul style="margin-bottom: 15px; margin-left: 20px;">
            <li><strong>Cookies de autenticación:</strong> (vía Supabase) Para mantener tu sesión iniciada de manera segura.</li>
            <li><strong>Cookies de rendimiento:</strong> Para entender cómo interactúas con la plataforma de forma anónima.</li>
          </ul>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">3. Control de Cookies</h3>
          <p style="margin-bottom: 15px;">Puedes configurar tu navegador para rechazar o eliminar las cookies en cualquier momento. Sin embargo, ten en cuenta que deshabilitar las cookies de autenticación impedirá que puedas iniciar sesión en nuestra plataforma.</p>
        </div>
        
        <button class="btn mt-2" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">Volver al inicio</button>
      </div>
    </div>
  `;
}
