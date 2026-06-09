# Documentación Técnica: Impulsa Joven Perú

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular de Single Page Application (SPA) utilizando Vanilla JavaScript, orquestado con Vite para un empaquetado moderno y rápido.

### Estructura de Directorios

- \`index.html\`: Punto de entrada, layout base, meta tags SEO, Navbar y Footer.
- \`src/main.js\`: Controlador principal. Implementa un enrutador básico interceptando clics y usando \`history.pushState\` para inyectar vistas en \`#app\`.
- \`src/style.css\`: Sistema de diseño global. Utiliza variables CSS (\`:root\`) para colores (\`--primary-blue\`, \`--secondary-yellow\`), tipografía (Inter), y layouts con Flexbox/Grid.
- \`src/data/mock.js\`: Estructura de datos semilla (Becas, Cursos, Empleos, Voluntariados, Impacto).
- \`src/services/storage.js\`: Capa de persistencia. Expone métodos para leer/escribir datos. Aisla la lógica de \`localStorage\` para facilitar una futura migración a Firebase.
- \`src/views/\`: Funciones exportables que retornan strings HTML (Template Literals) para ser inyectados por el enrutador.
- \`src/components/\`: Componentes reutilizables con lógica encapsulada (ej. \`virtualAssistant.js\`).

## Sistema de Enrutamiento

Se implementó un router cliente ligero:
1. Las etiquetas \`<a>\` tienen el atributo \`data-link\`.
2. Un event listener global previene el comportamiento por defecto de recarga y cambia la URL.
3. La función \`router()\` asocia la ruta actual con una vista en \`src/views\` y la renderiza en \`<main id="app">\`.

## Analítica de Impacto

Cada vez que se renderiza una vista clave (ej. \`renderScholarships\`), se invoca \`storage.logImpact('scholarships_viewed')\`, actualizando los contadores en \`localStorage\`. Estos datos se exponen dinámicamente en el Dashboard de la vista de Inicio.

## Próximos Pasos (Escalabilidad)

1. **Firebase / Supabase**: Reemplazar \`storage.js\` por llamadas a Firestore para la base de datos real y a Firebase Auth para el registro de usuarios.
2. **SEO Dinámico**: Implementar SSR (Server Side Rendering) o pre-rendering para optimizar la indexación de páginas específicas de becas.
3. **IA Generativa**: Conectar el Asistente Virtual a una API como Gemini o ChatGPT en lugar del motor actual basado en reglas.
