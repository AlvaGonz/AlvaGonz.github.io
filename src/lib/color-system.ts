export type Theme = 'formal' | 'curiousity';

export const colorSystem = {
  formal: {
    // Palette 1 - Existing Formal Identity
    primary: {
      richBlack: '#002f1a', // Main background
      darkGreen: '#032221', // Secondary background
      bangladeshGreen: '#03624c',
      mountainMeadow: '#2cc295', // Primary accent
      caribbeanGreen: '#00df81', // Highlight
      antiFlashWhite: '#f1f7f6', // Text
    },
    secondary: {
      pine: '#06302b',
      basil: '#0b453a',
      forest: '#095544',
      frog: '#17876d',
      mint: '#2fa98c',
      stone: '#707d7d',
      pistachio: '#aacbc4',
    },
  },
  curiousity: {
    // Palette 2 - curious/Mindful Identity
    // Based on provided image: One Palette, Five Gradients
    background: '#21263A', // Deep Blue/Grey (Gradient 05 end)
    surface: '#157954', // Deep Green (Gradient 05 start / Gradient 04 end)
    primary: '#D0D34D', // Lime/Yellow (Gradient 04 start / Gradient 02 end)
    secondary: '#C7CEE8', // Periwinkle (Gradient 02 start / Gradient 01 end)
    highlight: '#D6D9D8', // Light Grey (Gradient 01 start)
    text: '#F1F5F9', // White/Off-white for readability on dark bg
    textSecondary: '#94A3B8', // Slate-400
  },
};

// Semantic mapping for shared components
export const semanticColors = {
  formal: {
    background: colorSystem.formal.primary.richBlack,
    surface: colorSystem.formal.primary.darkGreen,
    primary: colorSystem.formal.primary.mountainMeadow,
    secondary: colorSystem.formal.secondary.stone,
    accent: colorSystem.formal.primary.caribbeanGreen,
    text: colorSystem.formal.primary.antiFlashWhite,
    textSecondary: colorSystem.formal.secondary.pistachio,
    border: colorSystem.formal.secondary.basil,
  },
  curiousity: {
    background: colorSystem.curiousity.background,
    surface: 'rgba(33, 38, 58, 0.8)', // slightly lighter/transparent version of bg
    primary: colorSystem.curiousity.primary, // Lime
    secondary: colorSystem.curiousity.secondary, // Periwinkle
    accent: colorSystem.curiousity.highlight,
    text: colorSystem.curiousity.text,
    textSecondary: colorSystem.curiousity.textSecondary,
    border: 'rgba(199, 206, 232, 0.2)', // Periwinkle with low opacity
  },
};
