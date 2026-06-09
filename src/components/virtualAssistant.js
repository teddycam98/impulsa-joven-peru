export function initVirtualAssistant() {
  const container = document.getElementById('virtualAssistant');
  
  // Minimal CSS for Chatbot
  const style = document.createElement('style');
  style.innerHTML = `
    .chat-widget { position: fixed; bottom: 30px; right: 30px; z-index: 1000; }
    .chat-btn { width: 65px; height: 65px; border-radius: 50%; background: #0056D2; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; cursor: pointer; box-shadow: 0 10px 25px rgba(0,86,210,0.5); transition: transform 0.3s ease; }
    .chat-btn:hover { transform: scale(1.1); }
    .chat-window { display: none; position: absolute; bottom: 80px; right: 0; width: 320px; height: 420px; background: white; border-radius: 15px; box-shadow: 0 15px 35px rgba(0,0,0,0.2); flex-direction: column; overflow: hidden; font-family: 'Outfit', sans-serif; color: #333; }
    .chat-header { background: #0056D2; color: white; padding: 18px; font-weight: 600; font-size: 1.1rem; display: flex; justify-content: space-between; align-items: center; }
    .chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #f4f6f8; }
    .chat-input-area { display: flex; padding: 15px; border-top: 1px solid #eee; background: white; }
    .chat-input { flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px; outline: none; font-family: inherit; }
    .msg { max-width: 85%; padding: 12px 15px; border-radius: 12px; font-size: 0.95rem; line-height: 1.4; }
    .msg.bot { background: white; color: #333; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
    .msg.user { background: #0056D2; color: white; align-self: flex-end; border-bottom-right-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
  `;
  document.head.appendChild(style);

  container.innerHTML = `
    <div class="chat-widget">
      <div class="chat-window" id="chatWindow">
        <div class="chat-header">
          Asistente Impulsa
          <span id="closeChat" style="cursor:pointer; font-size: 1.5rem;">&times;</span>
        </div>
        <div class="chat-body" id="chatBody">
          <div class="msg bot">¡Hola! Soy tu asistente virtual. ¿En qué te puedo ayudar? Puedes preguntarme sobre becas, cursos o empleos.</div>
        </div>
        <div class="chat-input-area">
          <input type="text" id="chatInput" class="chat-input" placeholder="Escribe tu consulta...">
        </div>
      </div>
      <div class="chat-btn" id="chatBtn"><i class="ph-fill ph-chat-circle-dots"></i></div>
    </div>
  `;

  const btn = document.getElementById('chatBtn');
  const win = document.getElementById('chatWindow');
  const close = document.getElementById('closeChat');
  const input = document.getElementById('chatInput');
  const body = document.getElementById('chatBody');

  btn.addEventListener('click', () => win.style.display = 'flex');
  close.addEventListener('click', () => win.style.display = 'none');

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const text = input.value.trim();
      // Add User msg
      const uMsg = document.createElement('div');
      uMsg.className = 'msg user';
      uMsg.textContent = text;
      body.appendChild(uMsg);
      input.value = '';

      // Simple Rules based bot
      setTimeout(() => {
        const lower = text.toLowerCase();
        let botReply = 'No entendí muy bien. Intenta escribir "beca", "curso", "empleo" o "test".';
        
        if (lower.includes('beca')) {
          botReply = 'Puedes encontrar oportunidades de financiamiento en nuestra sección de <a href="/becas" data-link style="color:var(--primary-blue)">Becas</a>.';
        } else if (lower.includes('curso')) {
          botReply = 'Tenemos excelentes opciones en la sección de <a href="/cursos" data-link style="color:var(--primary-blue)">Cursos Gratuitos</a>.';
        } else if (lower.includes('empleo') || lower.includes('trabajo') || lower.includes('practica')) {
          botReply = 'Revisa la bolsa de trabajo en <a href="/empleos" data-link style="color:var(--primary-blue)">Empleos</a>.';
        } else if (lower.includes('test') || lower.includes('vocacion')) {
          botReply = 'Haz el <a href="/vocacional" data-link style="color:var(--primary-blue)">Test Vocacional</a> para descubrir tu perfil.';
        }

        const bMsg = document.createElement('div');
        bMsg.className = 'msg bot';
        bMsg.innerHTML = botReply;
        body.appendChild(bMsg);
        body.scrollTop = body.scrollHeight;
      }, 500);
    }
  });
}
