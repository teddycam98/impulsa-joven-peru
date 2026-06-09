export function renderAbout() {
  return `
    <div class="container mb-2 text-center" style="max-width: 800px;">
      <h1>Sobre Impulsa Joven Perú</h1>
      <img src="/logo.png" alt="Logo" style="height: 100px; margin: 20px 0;">
      <p style="font-size: 1.2rem; text-align: left;">
        <strong>Misión Social:</strong> Reducir la brecha de acceso a oportunidades educativas y laborales para jóvenes del Perú, especialmente aquellos en zonas vulnerables.
      </p>
      <p style="text-align: left;">
        Esta plataforma centraliza información gratuita sobre becas, cursos, empleos y voluntariados. Buscamos empoderar a la juventud peruana a través de la educación y el trabajo, proporcionando además herramientas como un asistente virtual y test de orientación vocacional.
      </p>
      <div class="card mt-2" style="text-align: left;">
        <h3>Nuestros Pilares</h3>
        <ul>
          <li style="margin-left: 20px; margin-top: 10px;"><strong>Educación:</strong> Acceso a becas y cursos de calidad.</li>
          <li style="margin-left: 20px;"><strong>Empleabilidad:</strong> Prácticas y primeros empleos para jóvenes.</li>
          <li style="margin-left: 20px;"><strong>Impacto:</strong> Oportunidades de voluntariado para mejorar nuestras comunidades.</li>
        </ul>
      </div>
    </div>
  `;
}
