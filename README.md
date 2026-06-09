# Impulsa Joven Perú 🚀

Plataforma web de impacto social diseñada para reducir la brecha de acceso a oportunidades educativas y laborales para jóvenes del Perú, especialmente en zonas vulnerables.

## 🌟 Características Principales

- **Centralización de Oportunidades:** Becas, cursos gratuitos, y empleos en un solo lugar.
- **Test Vocacional Express:** Orientación rápida para descubrir perfiles profesionales.
- **Asistente Virtual:** Respuestas rápidas basadas en reglas sobre oportunidades.
- **Métricas de Impacto Social:** Registro de interacciones para medir el alcance.
- **Registro de Usuarios (MVP):** Sistema basado en LocalStorage para guardar preferencias.
- **SEO Ready:** Etiquetas Meta y Open Graph preparadas.

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables, Flexbox, Grid, sin frameworks pesados)
- JavaScript Vanilla (ES6+)
- Vite (Empaquetador y entorno de desarrollo)
- LocalStorage (Persistencia MVP)

## 🚀 Instalación y Uso

1. **Clonar o descargar** el repositorio.
2. Instalar dependencias:
   \`\`\`bash
   npm install
   \`\`\`
3. Iniciar el servidor de desarrollo:
   \`\`\`bash
   npm run dev
   \`\`\`
4. Abrir \`http://localhost:5173\` en el navegador.

## 📂 Arquitectura (Preparada para Firebase)

El proyecto está diseñado con una capa de abstracción en \`src/services/storage.js\`. Actualmente utiliza \`LocalStorage\` para facilitar las pruebas del MVP, pero puede ser fácilmente migrado a Firebase Firestore y Firebase Authentication modificando únicamente este archivo de servicio.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar la plataforma o agregar nuevas funcionalidades, siéntete libre de hacer un fork y enviar un Pull Request.

---
*MVP Desarrollado con el objetivo de generar impacto social positivo en la juventud peruana.*
