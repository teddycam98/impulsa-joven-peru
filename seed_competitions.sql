-- ============================================================
-- IMPULSA JOVEN PERÚ — Insertar 10 Concursos de Ejemplo
-- Ejecutar en: Supabase → SQL Editor → New Query → Run
-- ============================================================

INSERT INTO opportunities (title, organization, description, external_link, location, deadline, category, featured, status, image_url)
VALUES

-- 1. Premio Nacional de la Juventud ⭐
(
  'Premio Nacional de la Juventud',
  'SENAJU',
  'Reconocimiento a jóvenes peruanos destacados en liderazgo, emprendimiento e innovación social.',
  'https://juventud.gob.pe',
  'Perú',
  '2026-12-31',
  'competition',
  true,
  'active',
  NULL
),

-- 2. Startup Perú ⭐
(
  'Startup Perú',
  'PRODUCE',
  'Programa de capital semilla para emprendimientos innovadores de base tecnológica.',
  'https://startup.proinnovate.gob.pe',
  'Perú',
  '2026-10-15',
  'competition',
  true,
  'active',
  NULL
),

-- 3. Hult Prize
(
  'Hult Prize',
  'Hult Prize Foundation',
  'Competencia global de emprendimiento social universitario con premios millonarios.',
  'https://www.hultprize.org',
  'Internacional',
  '2026-11-30',
  'competition',
  false,
  'active',
  NULL
),

-- 4. Google Solution Challenge ⭐
(
  'Google Solution Challenge',
  'Google',
  'Desafío para estudiantes que usen tecnología Google para resolver problemas de la ONU.',
  'https://developers.google.com/community/gdsc-solution-challenge',
  'Internacional',
  '2026-09-30',
  'competition',
  true,
  'active',
  NULL
),

-- 5. NASA Space Apps Challenge
(
  'NASA Space Apps Challenge',
  'NASA',
  'Hackathon internacional que invita a resolver desafíos de la NASA usando datos abiertos.',
  'https://www.spaceappschallenge.org',
  'Internacional',
  '2026-10-01',
  'competition',
  false,
  'active',
  NULL
),

-- 6. Huawei ICT Competition
(
  'Huawei ICT Competition',
  'Huawei',
  'Competencia internacional en telecomunicaciones, inteligencia artificial y cloud computing.',
  'https://e.huawei.com/en/talent/ict-academy',
  'Internacional',
  '2026-11-15',
  'competition',
  false,
  'active',
  NULL
),

-- 7. Microsoft Imagine Cup
(
  'Microsoft Imagine Cup',
  'Microsoft',
  'Competencia tecnológica global para estudiantes que desarrollen soluciones con impacto.',
  'https://imaginecup.microsoft.com',
  'Internacional',
  '2026-08-31',
  'competition',
  false,
  'active',
  NULL
),

-- 8. Concurso Nacional de Innovación ⭐
(
  'Concurso Nacional de Innovación',
  'CONCYTEC',
  'Convocatoria para proyectos innovadores que aporten soluciones a la sociedad peruana.',
  'https://www.gob.pe/concytec',
  'Perú',
  '2026-09-15',
  'competition',
  true,
  'active',
  NULL
),

-- 9. Concurso CONCYTEC de Investigación
(
  'Concurso CONCYTEC de Investigación',
  'CONCYTEC',
  'Financiamiento para proyectos de investigación científica y tecnológica juvenil.',
  'https://www.gob.pe/concytec',
  'Perú',
  '2026-10-30',
  'competition',
  false,
  'active',
  NULL
),

-- 10. Global Student Prize
(
  'Global Student Prize',
  'Chegg.org / Varkey Foundation',
  'Premio de $100,000 al estudiante que haya generado mayor impacto en su comunidad.',
  'https://www.globalstudentprize.org',
  'Internacional',
  '2026-07-15',
  'competition',
  false,
  'active',
  NULL
);

-- Verificar que se insertaron correctamente
SELECT id, title, organization, category, featured, status
FROM opportunities
WHERE category = 'competition'
ORDER BY title;
