/**
 * Normalizer and validator for scraped youth opportunities.
 * Standardizes schema across all categories for seamless ingestion.
 */

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export function normalizeOpportunity(raw) {
  const category = raw.category || 'scholarship';
  const id = raw.id || `${category}-${slugify(raw.title || 'convocatoria')}-${Date.now().toString(36).slice(-4)}`;

  return {
    id,
    title: (raw.title || '').trim(),
    organization: (raw.organization || '').trim(),
    category,
    type: raw.type || getDefaultType(category),
    typeCategory: raw.typeCategory || getDefaultTypeCategory(category),
    ageRange: raw.ageRange || 'all',
    ageRangeLabel: raw.ageRangeLabel || '16 a 29 años',
    coverage: raw.coverage || 'full',
    coverageLabel: raw.coverageLabel || (raw.coverage === 'partial' ? 'Cobertura Parcial' : '100% Gratuito / Beca Completa'),
    modality: raw.modality || 'onsite',
    location: raw.location || 'Nacional (Todo el Perú)',
    deadline: raw.deadline || getFutureDate(45),
    description: (raw.description || '').trim(),
    image_url: raw.image_url || getDefaultImage(category),
    external_link: raw.external_link || 'https://www.gob.pe',
    featured: Boolean(raw.featured),
    status: raw.status || 'active',
    requirements: Array.isArray(raw.requirements) && raw.requirements.length > 0
      ? raw.requirements
      : ['DNI o Carné de Extranjería vigente.', 'Compromiso de participación y disponibilidad de horario.'],
    benefits: Array.isArray(raw.benefits) && raw.benefits.length > 0
      ? raw.benefits
      : ['Certificación oficial acreditada.', 'Acceso a red de contactos y empleabilidad juvenil.'],
    steps: Array.isArray(raw.steps) && raw.steps.length > 0
      ? raw.steps
      : ['Revisar bases y requisitos en el enlace oficial.', 'Completar formulario virtual con datos personales.', 'Confirmar postulación y esperar resultados.'],
    created_at: raw.created_at || new Date().toISOString()
  };
}

function getDefaultType(category) {
  const map = {
    scholarship: 'Pregrado Universitario / Técnica',
    course: 'Curso Certificado Gratuito',
    internship: 'Prácticas Pre y Profesionales',
    job: 'Empleo Juvenil / Primer Empleo',
    university: 'Admisión Universitaria',
    competition: 'Concurso de Innovación & Emprendimiento',
    volunteer: 'Voluntariado Social & Comunitario'
  };
  return map[category] || 'Oportunidad General';
}

function getDefaultTypeCategory(category) {
  const map = {
    scholarship: 'undergraduate',
    course: 'tech',
    internship: 'pre-pro',
    job: 'junior',
    university: 'admission',
    competition: 'innovation',
    volunteer: 'social'
  };
  return map[category] || 'general';
}

function getDefaultImage(category) {
  const map = {
    scholarship: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    course: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    internship: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
    job: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
    university: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
    competition: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    volunteer: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80'
  };
  return map[category] || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80';
}

function getFutureDate(daysAhead = 30) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

export function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractGobPeHref(urlHtml) {
  if (!urlHtml) return 'https://www.gob.pe';
  const match = urlHtml.match(/href=[\x27\x22]([^\x27\x22]+)[\x27\x22]/i);
  if (match && match[1]) {
    const path = match[1];
    return path.startsWith('http') ? path : `https://www.gob.pe${path}`;
  }
  if (urlHtml.startsWith('http')) return urlHtml;
  if (urlHtml.startsWith('/')) return `https://www.gob.pe${urlHtml}`;
  return 'https://www.gob.pe';
}

export function extractGobPeTitle(nameWithParent, urlHtml, fallback = 'Convocatoria Oficial') {
  if (nameWithParent && typeof nameWithParent === 'string' && nameWithParent.trim().length > 3) {
    return stripHtml(nameWithParent);
  }
  if (urlHtml) {
    const textMatch = urlHtml.match(/>([^<]+)<\/a>/i);
    if (textMatch && textMatch[1]) {
      return stripHtml(textMatch[1]);
    }
  }
  return fallback;
}
