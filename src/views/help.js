export function renderHelp() {
  return `
    <div class="container mb-2 animate-on-scroll">
      <div class="bento-title-wrapper">
        <h2 class="text-yellow" style="font-size: clamp(2rem, 5vw, 3.5rem);">Centro de Ayuda</h2>
      </div>
      <p class="text-center" style="margin-bottom: 50px;">Estamos aquí para ayudarte a impulsar tu futuro. Encuentra respuestas rápidas o contáctanos directamente.</p>

      <!-- FAQ Section -->
      <section class="help-section mb-2">
        <h3 class="help-section-title"><i class="ph-fill ph-question"></i> Preguntas Frecuentes</h3>
        <div class="faq-accordion">
          <div class="faq-item">
            <button class="faq-question">
              ¿Qué es Impulsa Joven Perú?
              <i class="ph ph-caret-down"></i>
            </button>
            <div class="faq-answer">
              <p>Es una plataforma digital que centraliza y facilita el acceso a becas, cursos gratuitos, oportunidades de empleo y voluntariados para jóvenes peruanos, reduciendo la brecha de información.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              ¿Cómo funcionan las becas?
              <i class="ph ph-caret-down"></i>
            </button>
            <div class="faq-answer">
              <p>Nosotros curamos las mejores becas disponibles (como Beca 18, Chevening, etc.). Al hacer clic en ellas, te proporcionamos la información clave y te redirigimos a la entidad oficial para que realices tu postulación directamente con ellos.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              ¿Cómo puedo encontrar cursos gratuitos?
              <i class="ph ph-caret-down"></i>
            </button>
            <div class="faq-answer">
              <p>Dirígete a la sección "Aprender" desde el menú principal. Allí encontrarás plataformas globales como Khan Academy, Coursera y Cisco que ofrecen cursos sin costo. Si creas una cuenta en nuestra plataforma, podrás guardar tus favoritos.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              ¿Cómo me contacto con soporte?
              <i class="ph ph-caret-down"></i>
            </button>
            <div class="faq-answer">
              <p>Puedes escribirnos directamente a <strong>hola@impulsajoven.pe</strong> o enviarnos un mensaje por WhatsApp al <strong>+51 922 698 107</strong> utilizando los enlaces al final de la página o los formularios a continuación.</p>
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question">
              ¿Cómo sugiero una nueva oportunidad?
              <i class="ph ph-caret-down"></i>
            </button>
            <div class="faq-answer">
              <p>¡Nos encanta la participación! Utiliza el formulario "Sugerir una Oportunidad" que se encuentra más abajo en esta página para enviarnos la información. Nuestro equipo la revisará y la publicará si cumple con nuestros estándares.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Forms Section -->
      <section class="help-section mb-2 forms-grid">
        <!-- Report a Problem -->
        <div class="help-form-card">
          <h3 class="help-form-title"><i class="ph-fill ph-warning-circle text-yellow"></i> Reportar un Problema</h3>
          <form id="formReportProblem" class="help-form">
            <div class="form-group">
              <label for="repName" class="hidden">Tu Nombre</label>
              <input type="text" id="repName" required placeholder="Tu Nombre" aria-label="Tu Nombre" />
            </div>
            <div class="form-group">
              <label for="repEmail" class="hidden">Correo electrónico</label>
              <input type="email" id="repEmail" required placeholder="tu@correo.com" aria-label="Correo electrónico" />
            </div>
            <div class="form-group">
              <label for="repIssue" class="hidden">Asunto</label>
              <input type="text" id="repIssue" required placeholder="¿Qué problema encontraste?" aria-label="Asunto del problema" />
            </div>
            <div class="form-group">
              <label for="repMessage" class="hidden">Mensaje</label>
              <textarea id="repMessage" rows="4" required placeholder="Describe el problema en detalle..." aria-label="Mensaje" class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn btn-outline w-100">Enviar Reporte</button>
          </form>
        </div>

        <!-- Suggest Opportunity -->
        <div class="help-form-card card-purple-tint">
          <h3 class="help-form-title"><i class="ph-fill ph-lightbulb text-yellow"></i> Sugerir Oportunidad</h3>
          <form id="formSuggestOpportunity" class="help-form">
            <div class="form-group">
              <label for="sugName" class="hidden">Tu Nombre</label>
              <input type="text" id="sugName" required placeholder="Tu Nombre" aria-label="Tu Nombre" />
            </div>
            <div class="form-group">
              <label for="sugEmail" class="hidden">Correo electrónico</label>
              <input type="email" id="sugEmail" required placeholder="tu@correo.com" aria-label="Correo electrónico" />
            </div>
            <div class="form-group">
              <label for="sugCategory" class="hidden">Categoría</label>
              <select id="sugCategory" required aria-label="Categoría de oportunidad" class="form-select">
                <option value="" disabled selected>Selecciona una categoría</option>
                <option value="beca">Beca / Estudio</option>
                <option value="curso">Curso</option>
                <option value="empleo">Empleo</option>
                <option value="voluntariado">Voluntariado</option>
              </select>
            </div>
            <div class="form-group">
              <label for="sugDetails" class="hidden">Detalles / Enlace</label>
              <textarea id="sugDetails" rows="4" required placeholder="Comparte el enlace o los detalles de la oportunidad..." aria-label="Detalles de la oportunidad" class="form-textarea"></textarea>
            </div>
            <button type="submit" class="btn btn-yellow w-100">Enviar Sugerencia</button>
          </form>
        </div>
      </section>

      <!-- Policies Section -->
      <section class="help-section policies-section">
        <div class="policy-block">
          <h4><i class="ph-fill ph-shield-check"></i> Política de Privacidad</h4>
          <p class="policy-text">
            En Impulsa Joven Perú respetamos tu privacidad. Los datos personales proporcionados (como nombre y correo electrónico) son utilizados exclusivamente para autenticación local en tu dispositivo y para responder a tus consultas o sugerencias. No compartimos, vendemos ni distribuimos tu información a terceros. Nuestra plataforma no utiliza cookies de rastreo invasivas.
          </p>
        </div>
        <div class="policy-block">
          <h4><i class="ph-fill ph-file-text"></i> Términos de Uso</h4>
          <p class="policy-text">
            El contenido alojado en Impulsa Joven Perú tiene fines puramente informativos y educativos. Actuamos como un directorio facilitador. No somos los organizadores directos de las becas, empleos o cursos externos mencionados, por lo que no garantizamos la admisión ni nos responsabilizamos por los cambios en las condiciones de dichas oportunidades de terceros.
          </p>
        </div>
      </section>

    </div>
  `;
}

export function initHelpCenterLogic() {
  // Accordion Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all others
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  function showFeedback(btn, message) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = '<i class="ph-fill ph-check-circle"></i> ' + message;
      btn.style.background = 'var(--success)';
      btn.style.color = 'white';
      btn.style.borderColor = 'var(--success)';
      btn.style.opacity = '1';
      
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style = '';
        btn.disabled = false;
      }, 3000);
    }, 1200);
  }

  // Forms logic
  const reportForm = document.getElementById('formReportProblem');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = reportForm.querySelector('button[type="submit"]');
      showFeedback(btn, 'Reporte Enviado');
      setTimeout(() => reportForm.reset(), 1200);
    });
  }

  const suggestForm = document.getElementById('formSuggestOpportunity');
  if (suggestForm) {
    suggestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = suggestForm.querySelector('button[type="submit"]');
      showFeedback(btn, 'Sugerencia Enviada');
      setTimeout(() => suggestForm.reset(), 1200);
    });
  }
}
