$path = "C:\Users\HellBoy\.gemini\antigravity\scratch\impulsa-joven-peru\src\style.css"
$content = Get-Content -Path $path -Raw

$glassCSS_normal = @"
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(40px) saturate(200%) brightness(1.1);
  -webkit-backdrop-filter: blur(40px) saturate(200%) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25);
"@

$content = $content -replace '(?s)\.navbar\s*\{.*?\}', ".navbar {`n  position: fixed;`n  top: 0;`n  left: 0;`n  width: 100%;`n  z-index: 1000;`n  padding: 6px 0;`n$glassCSS_normal`n}"
$content = $content -replace '(?s)\.brand-logo\s*\{.*?\}', ".brand-logo {`n  height: 120px;`n  max-width: 360px;`n  margin: 0;`n  object-fit: contain;`n  filter: drop-shadow(0 8px 26px rgba(0, 0, 0, 0.75));`n  transition: transform 0.3s var(--ease-out-expo);`n  display: block;`n}"
$content = $content -replace '(?s)\.hero-star-badge\s*\{.*?\}', ".hero-star-badge {`n  display: inline-flex;`n  align-items: center;`n  gap: 10px;`n  padding: 8px 22px;`n  border-radius: 9999px;`n  font-size: 0.92rem;`n  font-weight: 700;`n  color: #ffffff;`n  margin-bottom: 24px;`n$glassCSS_normal`n}"
$content = $content -replace '(?s)\.hero-capsule-bar-wrapper\s*\{.*?\}', ".hero-capsule-bar-wrapper {`n  position: relative;`n  z-index: 25;`n  width: 100%;`n  max-width: 100%;`n  margin: 0;`n  padding: 0;`n  transform: none;`n  box-sizing: border-box;`n$glassCSS_normal`n}"

$mobileQuery = @"
@media (max-width: 768px) {
  .hero-capsule-bar {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 16px !important;
    padding: 16px !important;
  }
}
"@
$content = $content + "`n" + $mobileQuery

$sliderStart = $content.IndexOf("/* ═══════════════════════════════════════════════════════════════`r`n   PANORAMIC CINEMATIC EVENTS SLIDER")
if ($sliderStart -eq -1) {
    $sliderStart = $content.IndexOf("/* ═══════════════════════════════════════════════════════════════`n   PANORAMIC CINEMATIC EVENTS SLIDER")
}

if ($sliderStart -ne -1) {
    $content = $content.Substring(0, $sliderStart)
}

$newSliderCSS = Get-Content -Path "C:\Users\HellBoy\.gemini\antigravity\scratch\impulsa-joven-peru\new_slider.css" -Raw
$content = $content + "`n" + $newSliderCSS

Set-Content -Path $path -Value $content
