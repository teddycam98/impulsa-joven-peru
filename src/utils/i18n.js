import { es } from '../i18n/es.js';
import { qu } from '../i18n/qu.js';

const dictionaries = { es, qu };

export const i18n = {
  currentLang: localStorage.getItem('lang') || 'es',

  init() {
    this.translateDOM();
    // Dispatch initial event just in case
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: this.currentLang }));
  },

  setLanguage(lang) {
    if (dictionaries[lang]) {
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      this.translateDOM();
      
      // Update UI selector if it exists
      const btnText = document.getElementById('currentLangText');
      if (btnText) {
        btnText.textContent = this.t(`nav.lang.${lang}`);
      }

      window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    }
  },

  t(key) {
    const dict = dictionaries[this.currentLang] || dictionaries['es'];
    return dict[key] || key;
  },

  translateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.placeholder = translation;
        }
      } else {
        el.innerHTML = translation;
      }
    });
  }
};
