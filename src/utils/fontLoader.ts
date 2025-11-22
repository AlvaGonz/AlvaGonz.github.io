/**
 * Axiforma Font Loader
 * Dynamically loads Axiforma fonts from CDN or local paths based on environment configuration.
 */

const FONT_BASE_URL = import.meta.env.VITE_FONT_CDN_URL || '/fonts/axiforma';
const FONT_NAME = 'Axiforma';

interface FontConfig {
  weight: number;
  filename: string;
}

const FONT_FACES: FontConfig[] = [
  { weight: 400, filename: 'Axiforma-Regular.otf' },
  { weight: 500, filename: 'Axiforma-Medium.otf' },
  { weight: 600, filename: 'Axiforma-SemiBold.otf' },
];

/**
 * Dynamically injects @font-face rules for Axiforma fonts
 */
export function loadAxiformaFonts(): void {
  // Check if fonts are already loaded
  if (document.querySelector('#axiforma-fonts-loaded')) {
    return;
  }

  const style = document.createElement('style');
  style.id = 'axiforma-fonts-loaded';
  style.textContent = FONT_FACES.map(
    (font) => `
@font-face {
  font-family: '${FONT_NAME}';
  src: url('${FONT_BASE_URL}/${font.filename}') format('opentype');
  font-weight: ${font.weight};
  font-style: normal;
  font-display: swap;
}
    `.trim()
  ).join('\n\n');

  document.head.appendChild(style);
}

// Auto-load fonts on import (for immediate execution)
if (typeof document !== 'undefined') {
  // Wait for DOM to be ready if loading early
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAxiformaFonts);
  } else {
    loadAxiformaFonts();
  }
}
