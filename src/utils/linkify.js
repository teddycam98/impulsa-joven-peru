/**
 * Linkify utility for Impulsa Joven Perú
 * Transforms raw text containing URLs, Google Forms, and official links
 * into interactive, secure clickable links (<a href="..." target="_blank">).
 * Also gracefully handles truncated URLs from Gob.pe scraping without double-nesting.
 */

/**
 * Checks if a string or opportunity object contains a direct form link.
 */
export function hasFormLink(opp) {
  if (!opp) return false;
  const target = typeof opp === 'string' ? opp : ((opp.external_link || '') + ' ' + (opp.description || ''));
  return /forms\.gle|docs\.google\.com\/forms|\/forms\/|formulario/i.test(target);
}

/**
 * Extracts the first valid Google Form or registration form URL from opportunity or text.
 */
export function extractFormUrl(opp) {
  if (!opp) return null;
  if (typeof opp === 'object' && opp.external_link && /forms\.gle|docs\.google\.com\/forms/i.test(opp.external_link)) {
    return opp.external_link;
  }
  const text = typeof opp === 'string' ? opp : (opp.description || '');
  const match = text.match(/https?:\/\/(forms\.gle\/[a-zA-Z0-9_-]{10,}|docs\.google\.com\/forms\/[^\s<>"']+)/i);
  if (match) return match[0];
  return null;
}

/**
 * Converts URLs in a text block into clickable links.
 */
export function linkify(text, fallbackUrl = '#') {
  if (!text || typeof text !== 'string') return '';

  const safeFallback = fallbackUrl && fallbackUrl !== '#' ? fallbackUrl : '#';

  // Unified single-pass regex matching:
  // 1. Google forms pattern (full or truncated)
  // 2. Standard web URLs (http, https, www)
  const masterRegex = /((?:https?:\/\/)?forms\.(?:gle)?(?:\/[a-zA-Z0-9_.-]*)?|(?:https?:\/\/|www\.)[^\s<>"']+)/gi;

  return text.replace(masterRegex, (rawUrl) => {
    // Clean trailing punctuation that belongs to surrounding text grammar (. , ; : ! ? ) ] ")
    let cleanUrl = rawUrl;
    let trailingPunct = '';
    const punctMatch = cleanUrl.match(/[.,;:!?)\]"]+$/);
    if (punctMatch) {
      trailingPunct = punctMatch[0];
      cleanUrl = cleanUrl.slice(0, -trailingPunct.length);
    }

    // A. Check for truncated / chopped Google Forms from Gob.pe
    // e.g. 'https://forms.', 'https://forms.gle.', 'forms.gle/ab.'
    const isTruncatedForm = /^(?:https?:\/\/)?forms\.(?:gle)?\.?$/i.test(cleanUrl) ||
                           (/^https?:\/\/forms\.gle\/[a-zA-Z0-9_-]{1,8}$/i.test(cleanUrl) && cleanUrl.length < 24);

    if (isTruncatedForm) {
      if (safeFallback !== '#') {
        return `<a href="${safeFallback}" target="_blank" rel="noopener noreferrer" class="opp-inline-link opp-form-pill" title="Abrir portal oficial de postulación"><i class="ph-fill ph-file-text"></i><span>Abrir formulario de postulación</span><i class="ph ph-arrow-square-out"></i></a>${trailingPunct}`;
      }
      return `<span class="opp-form-pill-disabled"><i class="ph-fill ph-file-text"></i><span>Formulario oficial de inscripción</span></span>${trailingPunct}`;
    }

    // B. Check for valid Google Forms
    if (/forms\.gle|docs\.google\.com\/forms/i.test(cleanUrl)) {
      let formHref = cleanUrl;
      if (!formHref.startsWith('http')) formHref = 'https://' + formHref;
      return `<a href="${formHref}" target="_blank" rel="noopener noreferrer" class="opp-inline-link opp-form-pill"><i class="ph-fill ph-file-text"></i><span>Completar formulario de postulación</span><i class="ph ph-arrow-square-out"></i></a>${trailingPunct}`;
    }

    // C. Standard Web URLs
    let href = cleanUrl;
    if (href.startsWith('www.')) href = 'https://' + href;

    const display = cleanUrl.replace(/^https?:\/\/(?:www\.)?/, '').replace(/\/$/, '');
    const shortDisplay = display.length > 42 ? display.substring(0, 39) + '...' : display;

    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="opp-inline-link"><span>${shortDisplay}</span><i class="ph ph-arrow-square-out"></i></a>${trailingPunct}`;
  });
}
