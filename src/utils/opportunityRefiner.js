/**
 * Opportunity Refiner Engine for Impulsa Joven Perú
 * 1. Semantically matches high-quality contextual images based on title, organization & category.
 * 2. Cleans, expands and formats rich, complete, professional descriptions (no cut-offs or trailing "...").
 */

// Curated Unsplash thematic image library
export const THEMATIC_IMAGES = {
  // Municipalidades y Gobiernos Locales
  municipal: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?w=800&auto=format&fit=crop&q=80',
  community_workshop: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80',
  civic_training: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80',

  // Salud, Medicina, Psicología y Hospitales
  health_care: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
  hospital_team: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
  clinical_lab: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',

  // Ingeniería Pesada, Maquinaria, Minería e Industria
  heavy_machinery: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
  engineering_caterpillar: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
  mining_industry: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',

  // Educación, Docencia, UGEL y Colegios
  classroom_teaching: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
  education_books: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
  teacher_mentoring: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&auto=format&fit=crop&q=80',

  // Tecnología, Programación, Datos y Ciberseguridad
  coding_software: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
  tech_workspace: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
  data_analytics: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  cybersecurity_net: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80',

  // Banca, Finanzas, Contabilidad y Administración
  banking_counter: 'https://images.unsplash.com/photo-1556742049-0a67e557224f?w=800&auto=format&fit=crop&q=80',
  business_finance: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
  corporate_desk: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',

  // Startups, Innovación, Emprendimiento y Hackathons
  startup_pitch: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&auto=format&fit=crop&q=80',
  innovation_team: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
  award_trophy: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=800&auto=format&fit=crop&q=80',

  // Voluntariado, Medio Ambiente, Cruz Roja y Bomberos
  community_volunteer: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop&q=80',
  social_help: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
  environment_nature: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
  humanitarian_aid: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',

  // Becas Universitarias y Campuses
  campus_historic: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80',
  university_students: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
  graduation_success: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
  university_library: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80',

  // Empleo Juvenil y Prácticas Laborales
  workplace_career: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80',
  interview_hiring: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80',
  office_talents: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80'
};

/**
 * Assigns a logically matched contextual image based on keywords in title, org, and description.
 */
export function assignLogicalImage(item) {
  if (!item) return THEMATIC_IMAGES.campus_historic;

  const text = ((item.title || '') + ' ' + (item.organization || '') + ' ' + (item.description || '')).toLowerCase();
  const cat = item.category || '';

  // 1. Municipalities & Local Government (e.g., Muni Acarí, Municipalidad de Lima, etc.)
  if (text.includes('muni') || text.includes('municipalidad') || text.includes('distrital') || text.includes('provincial') || text.includes('alcaldía')) {
    if (text.includes('taller') || text.includes('curso') || text.includes('capacita') || text.includes('gratuita')) {
      return THEMATIC_IMAGES.community_workshop;
    }
    return THEMATIC_IMAGES.civic_training;
  }

  // 2. Health, Medicine, Psychology, Hospital, Nursing
  if (text.includes('salud') || text.includes('médic') || text.includes('medic') || text.includes('hospital') || 
      text.includes('enfermer') || text.includes('clínic') || text.includes('farmac') || text.includes('biolog') || text.includes('psicol')) {
    if (text.includes('laboratorio') || text.includes('investigación')) return THEMATIC_IMAGES.clinical_lab;
    return THEMATIC_IMAGES.health_care;
  }

  // 3. Heavy Machinery, Mining, Industrial Engineering & Construction
  if (text.includes('maquinaria') || text.includes('caterpillar') || text.includes('ferreyros') || 
      text.includes('minería') || text.includes('mina') || text.includes('mecánic') || text.includes('mecanic') || 
      text.includes('industrial') || text.includes('eléctric') || text.includes('electric') || text.includes('construcc')) {
    return THEMATIC_IMAGES.heavy_machinery;
  }

  // 4. Education, Teaching, Schools, UGEL & Pedagogy
  if (text.includes('docente') || text.includes('profesor') || text.includes('ugel') || 
      text.includes('colegio') || text.includes('escuela') || text.includes('pedagog') || text.includes('enseñanza')) {
    return THEMATIC_IMAGES.classroom_teaching;
  }

  // 5. Software, Coding, Data, AI, Cybersecurity
  if (text.includes('ciberseguridad') || text.includes('seguridad informát') || text.includes('hacker')) {
    return THEMATIC_IMAGES.cybersecurity_net;
  }
  if (text.includes('datos') || text.includes('analytics') || text.includes('data science') || text.includes('estadíst') || text.includes('power bi')) {
    return THEMATIC_IMAGES.data_analytics;
  }
  if (text.includes('software') || text.includes('programac') || text.includes('developer') || text.includes('código') || 
      text.includes('python') || text.includes('react') || text.includes('fullstack') || text.includes('frontend') || text.includes('backend')) {
    return THEMATIC_IMAGES.coding_software;
  }

  // 6. Banking & Corporate Finance
  if (text.includes('banco') || text.includes('bcp') || text.includes('bbva') || text.includes('interbank') || 
      text.includes('cajero') || text.includes('bancar') || text.includes('scotiabank')) {
    return THEMATIC_IMAGES.banking_counter;
  }
  if (text.includes('contab') || text.includes('finanz') || text.includes('econom') || text.includes('tribut') || text.includes('auditor')) {
    return THEMATIC_IMAGES.corporate_desk;
  }

  // 7. Environment, Ecology, Nature & Animals
  if (text.includes('ambient') || text.includes('ecolog') || text.includes('animal') || text.includes('árbol') || 
      text.includes('verde') || text.includes('naturaleza') || text.includes('reserva') || text.includes('clima')) {
    return THEMATIC_IMAGES.environment_nature;
  }

  // 8. Volunteering, Community Service, Red Cross, Firefighters
  if (cat === 'volunteer' || text.includes('voluntar') || text.includes('sinavol') || text.includes('cruz roja') || 
      text.includes('bomberos') || text.includes('techo') || text.includes('comunitar') || text.includes('social')) {
    if (text.includes('ayuda') || text.includes('solidar')) return THEMATIC_IMAGES.social_help;
    return THEMATIC_IMAGES.community_volunteer;
  }

  // 9. Startups, Innovation, Hackathons & Awards
  if (cat === 'competition' || text.includes('startup') || text.includes('innovac') || 
      text.includes('hackathon') || text.includes('concurso') || text.includes('premio') || text.includes('proinnovate')) {
    if (text.includes('premio') || text.includes('reconocimiento')) return THEMATIC_IMAGES.award_trophy;
    return THEMATIC_IMAGES.startup_pitch;
  }

  // 10. Scholarships & Universities
  if (cat === 'scholarship' || cat === 'university' || text.includes('beca') || text.includes('pronabec') || text.includes('universidad')) {
    if (text.includes('18') || text.includes('gradua') || text.includes('egresad') || text.includes('bicentenario')) {
      return THEMATIC_IMAGES.graduation_success;
    }
    if (text.includes('posgrado') || text.includes('maestría') || text.includes('investigac')) {
      return THEMATIC_IMAGES.university_library;
    }
    return THEMATIC_IMAGES.campus_historic;
  }

  // 11. Jobs & Internships
  if (cat === 'job' || cat === 'internship' || text.includes('laboral') || text.includes('empleo') || text.includes('puesto') || text.includes('practic')) {
    if (text.includes('entrevista') || text.includes('selección') || text.includes('postulante')) {
      return THEMATIC_IMAGES.interview_hiring;
    }
    return THEMATIC_IMAGES.workplace_career;
  }

  // Fallback by Category
  const categoryFallback = {
    scholarship: THEMATIC_IMAGES.campus_historic,
    course: THEMATIC_IMAGES.community_workshop,
    internship: THEMATIC_IMAGES.office_talents,
    job: THEMATIC_IMAGES.workplace_career,
    university: THEMATIC_IMAGES.campus_historic,
    competition: THEMATIC_IMAGES.innovation_team,
    volunteer: THEMATIC_IMAGES.community_volunteer
  };

  return categoryFallback[cat] || THEMATIC_IMAGES.university_students;
}

/**
 * Cleans truncated Gob.pe text and produces a complete, rich, professional description.
 */
export function refineDescription(item) {
  if (!item) return '';

  let raw = (item.description || '').replace(/\s+/g, ' ').replace(/[\uFFFD\uFFFE\uFEFF\u00A0\uFF80]/g, '').trim();

  // Strip useless prefixes
  raw = raw.replace(/^más información:?\s*/i, '');
  raw = raw.replace(/^para más información:?\s*/i, '');
  raw = raw.replace(/^sobre la beca:?\s*/i, '');
  raw = raw.replace(/^descripción:?\s*/i, '');
  raw = raw.replace(/^acerca de:?\s*/i, '');
  raw = raw.trim();

  // If ends with ..., try to recover last clean sentence
  if (raw.endsWith('...') || raw.endsWith('..')) {
    const trimmed = raw.replace(/\.\.\.?$/, '').trim();
    const lastPunctuation = Math.max(trimmed.lastIndexOf('. '), trimmed.lastIndexOf('! '), trimmed.lastIndexOf('? '));
    if (lastPunctuation > 60) {
      raw = trimmed.substring(0, lastPunctuation + 1).trim();
    } else {
      // Clean chopped dangling words at the end
      raw = trimmed.replace(/\s+(en\s+\w*|de\s+\w*|con\s+\w*|para\s+\w*|que\s+\w*|y\s+\w*|o\s+\w*|a\s+\w*|al\s+\w*|por\s+\w*)$/i, '').trim();
      if (raw.length > 50 && !raw.endsWith('.')) raw += '.';
    }
  }

  // If text is still too short, boilerplate or uninformative, generate a rich contextual description
  if (!raw || raw.length < 55 || raw.toLowerCase() === 'más información' || raw.toLowerCase().startsWith('más información:')) {
    const title = (item.title || 'Convocatoria oficial').trim();
    const org = (item.organization || 'Entidad convocante').trim();
    const cat = item.category || 'scholarship';

    if (cat === 'scholarship') {
      return `${title} impulsada por ${org}. Convocatoria oficial de beca educativa que brinda financiamiento académico integral, subvención de estudios y acompañamiento continuo para el desarrollo del talento joven peruano.`;
    } else if (cat === 'course') {
      return `Programa de capacitación y formación gratuita: ${title}, organizado por ${org}. Diseñado para fortalecer las competencias técnicas, prácticas y digitales de jóvenes peruanos con certificación oficial sin costo.`;
    } else if (cat === 'internship') {
      return `Convocatoria de formación profesional: ${title} en ${org}. Ofrece desarrollo práctico en equipos especializados del sector, con estipendio económico de ley, seguro de salud y constancia formativa oficial.`;
    } else if (cat === 'job') {
      return `Oportunidad de empleo formal y contratación: ${title} en ${org}. Puesto con ingreso directo a planilla, beneficios sociales de ley, remuneración competitiva y posibilidades de crecimiento profesional.`;
    } else if (cat === 'competition') {
      return `Fondo concursable y reto de innovación: ${title} promovido por ${org}. Dirigido a propuestas con impacto positivo en el país, ofreciendo capital semilla no reembolsable, mentorías y visibilidad nacional.`;
    } else if (cat === 'volunteer') {
      return `Programa de voluntariado cívico y comunitario: ${title} convocado por ${org}. Espacio de participación solidaria para jóvenes comprometidos con su comunidad, con acreditación oficial de horas de voluntariado.`;
    } else if (cat === 'university') {
      return `Proceso de admisión y formación superior: ${title} en ${org}. Información oficial sobre carreras profesionales, requisitos de postulación, modalidades de ingreso y beneficios académicos para nuevos ingresantes.`;
    }

    return `${title} organizada por ${org}. Oportunidad oficial de formación y desarrollo integral para jóvenes peruanos con certificación y beneficios verificados.`;
  }

  // Ensure description ends with a closing punctuation mark
  if (!raw.endsWith('.') && !raw.endsWith('!') && !raw.endsWith('?')) {
    raw += '.';
  }

  return raw;
}
