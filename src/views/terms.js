export function renderTerms() {
  return `
    <div class="container mb-2 animate-on-scroll" style="margin-top: 40px; min-height: 60vh;">
      <div style="background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); padding: 50px 40px; max-width: 800px; margin: 0 auto;">
        <h1 style="color: white; font-size: 2.5rem; margin-bottom: 20px; font-weight: 800;">Términos y Condiciones</h1>
        <p class="muted" style="margin-bottom: 20px;">Última actualización: Junio 2026</p>
        
        <div style="color: rgba(255,255,255,0.8); line-height: 1.8;">
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">1. Aceptación de los Términos</h3>
          <p style="margin-bottom: 15px;">Al acceder y utilizar Impulsa Joven Perú, aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de los términos, no podrás acceder a la plataforma.</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">2. Uso de la Plataforma</h3>
          <p style="margin-bottom: 15px;">Nuestra plataforma es un agregador de oportunidades. La información mostrada proviene de diversas fuentes públicas y privadas. No garantizamos la disponibilidad ni la exactitud de las oportunidades de terceros.</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">3. Cuentas de Usuario</h3>
          <p style="margin-bottom: 15px;">Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. Cualquier actividad que ocurra bajo tu cuenta es tu responsabilidad.</p>
          
          <h3 style="color: var(--secondary-yellow); margin-top: 30px; margin-bottom: 15px;">4. Enlaces a Terceros</h3>
          <p style="margin-bottom: 15px;">Nuestra plataforma contiene enlaces a sitios web de terceros (universidades, empresas, plataformas educativas) que no están controlados por nosotros. No asumimos responsabilidad por su contenido o políticas.</p>
        </div>
        
        <button class="btn mt-2" onclick="window.history.pushState(null, null, '/'); window.dispatchEvent(new Event('popstate'));">Volver al inicio</button>
      </div>
    </div>
  `;
}
