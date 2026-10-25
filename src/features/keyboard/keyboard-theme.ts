import type { Side } from '@/context/SideContext';
import { colorSystem } from '@/lib/color-system';
import type { KeyRole } from './keyboard-layout';

export interface KeyColorSet {
  base: string;
  hover: string;
  active: string;
  text: string;
}

export interface KeyboardTheme {
  side: Side;
  canvasBg: string;
  wrapperBorder: string;
  wrapperBg: string;
  chassis: {
    baseColor: string;
    rimColor: string;
    roughness: number;
    metalness: number;
  };
  lighting: {
    ambientColor: string;
    ambientIntensity: number;
    spotLightColor: string;
    spotLightIntensity: number;
    fillLightColor: string;
    fillLightIntensity: number;
    glowLightColor: string;
    glowLightIntensity: number;
    shadowColor: string;
    shadowOpacity: number;
  };
  keys: Record<KeyRole, KeyColorSet>;
  terminal: {
    containerBorder: string;
    containerBg: string;
    containerShadow: string;
    headerBorder: string;
    headerTitleColor: string;
    dots: [string, string, string];
    promptColor: string;
    textColor: string;
    secondaryTextColor: string;
    inputColor: string;
    inputPlaceholderColor: string;
    inputCaretColor: string;
    buttonClass: string;
    buttonDisabledClass: string;
    statusColor: string;
    hintTextColor: string;
  };
}

export const formalKeyboardTheme: KeyboardTheme = {
  side: 'formal',
  canvasBg: '#012415',
  wrapperBorder: 'border-[#0b453a]/80',
  wrapperBg: 'bg-[#002f1a]',
  chassis: {
    baseColor: colorSystem.formal.secondary.pine, // #06302b
    rimColor: colorSystem.formal.secondary.basil, // #0b453a
    roughness: 0.35,
    metalness: 0.6,
  },
  lighting: {
    ambientColor: colorSystem.formal.primary.darkGreen, // #032221
    ambientIntensity: 0.75,
    spotLightColor: colorSystem.formal.primary.antiFlashWhite, // #f1f7f6
    spotLightIntensity: 1.25,
    fillLightColor: colorSystem.formal.primary.bangladeshGreen, // #03624c
    fillLightIntensity: 0.8,
    glowLightColor: colorSystem.formal.primary.caribbeanGreen, // #00df81
    glowLightIntensity: 0.65,
    shadowColor: '#00180d',
    shadowOpacity: 0.55,
  },
  keys: {
    alphanumeric: {
      base: colorSystem.formal.primary.darkGreen, // #032221
      hover: colorSystem.formal.secondary.forest, // #095544
      active: colorSystem.formal.primary.bangladeshGreen, // #03624c
      text: colorSystem.formal.primary.antiFlashWhite, // #f1f7f6
    },
    primary: {
      // Enter key - Vibrant Hero Accent
      base: colorSystem.formal.primary.mountainMeadow, // #2cc295
      hover: '#3be0b0',
      active: colorSystem.formal.primary.caribbeanGreen, // #00df81
      text: colorSystem.formal.primary.richBlack, // #002f1a
    },
    secondary: {
      // Backspace key - Frog green distinct accent
      base: colorSystem.formal.secondary.frog, // #17876d
      hover: colorSystem.formal.secondary.mint, // #2fa98c
      active: colorSystem.formal.primary.caribbeanGreen, // #00df81
      text: colorSystem.formal.primary.antiFlashWhite, // #f1f7f6
    },
    accent: {
      // Escape key - Caribbean Green pop
      base: colorSystem.formal.primary.caribbeanGreen, // #00df81
      hover: '#34eea0',
      active: colorSystem.formal.primary.mountainMeadow, // #2cc295
      text: colorSystem.formal.primary.richBlack, // #002f1a
    },
    shift: {
      // Shift keys - Rich Bangladesh Green accent
      base: colorSystem.formal.primary.bangladeshGreen, // #03624c
      hover: colorSystem.formal.secondary.forest, // #095544
      active: colorSystem.formal.secondary.frog, // #17876d
      text: colorSystem.formal.primary.antiFlashWhite, // #f1f7f6
    },
    modifier: {
      // Ctrl, Alt, Win, Fn - Deep Pine with Pistachio text
      base: colorSystem.formal.secondary.pine, // #06302b
      hover: colorSystem.formal.secondary.basil, // #0b453a
      active: colorSystem.formal.primary.bangladeshGreen, // #03624c
      text: colorSystem.formal.secondary.pistachio, // #aacbc4
    },
    function: {
      // Tab, CapsLock - Basil accent
      base: colorSystem.formal.secondary.basil, // #0b453a
      hover: colorSystem.formal.secondary.forest, // #095544
      active: colorSystem.formal.secondary.frog, // #17876d
      text: colorSystem.formal.primary.antiFlashWhite, // #f1f7f6
    },
    space: {
      // Spacebar
      base: colorSystem.formal.primary.darkGreen, // #032221
      hover: colorSystem.formal.secondary.forest, // #095544
      active: colorSystem.formal.primary.mountainMeadow, // #2cc295
      text: colorSystem.formal.primary.antiFlashWhite, // #f1f7f6
    },
  },
  terminal: {
    containerBorder: 'border-[#0b453a]/80',
    containerBg: 'bg-[#032221]/90',
    containerShadow: 'shadow-[0_20px_50px_rgba(0,47,26,0.6)]',
    headerBorder: 'border-[#0b453a]/60',
    headerTitleColor: 'text-[#aacbc4]',
    dots: ['bg-[#03624c]', 'bg-[#2fa98c]', 'bg-[#00df81]'],
    promptColor: 'text-[#2cc295]',
    textColor: 'text-[#f1f7f6]',
    secondaryTextColor: 'text-[#aacbc4]',
    inputColor: 'text-[#2cc295]',
    inputPlaceholderColor: 'placeholder:text-[#095544]',
    inputCaretColor: 'caret-[#00df81]',
    buttonClass:
      'border border-[#2cc295]/40 bg-[#2cc295]/15 text-[#2cc295] hover:bg-[#2cc295] hover:text-[#002f1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00df81]',
    buttonDisabledClass: 'opacity-40 cursor-not-allowed',
    statusColor: 'text-[#00df81]',
    hintTextColor: 'text-[#707d7d]',
  },
};

export const curiosityKeyboardTheme: KeyboardTheme = {
  side: 'curiosity',
  canvasBg: '#181c2d',
  wrapperBorder: 'border-[#c7cee8]/20',
  wrapperBg: 'bg-[#21263a]',
  chassis: {
    baseColor: colorSystem.curiosity.background, // #21263a
    rimColor: '#2d354e',
    roughness: 0.25,
    metalness: 0.5,
  },
  lighting: {
    ambientColor: colorSystem.curiosity.background, // #21263a
    ambientIntensity: 0.8,
    spotLightColor: colorSystem.curiosity.text, // #f1f5f9
    spotLightIntensity: 1.25,
    fillLightColor: colorSystem.curiosity.secondary, // #c7cee8 (Periwinkle)
    fillLightIntensity: 0.85,
    glowLightColor: colorSystem.curiosity.primary, // #d0d34d (Lime underglow)
    glowLightIntensity: 0.9,
    shadowColor: '#0d1019',
    shadowOpacity: 0.5,
  },
  keys: {
    alphanumeric: {
      base: '#282e45', // Inky surface
      hover: '#38405f',
      active: colorSystem.curiosity.surface, // #157954 (Deep Emerald)
      text: colorSystem.curiosity.text, // #f1f5f9
    },
    primary: {
      // Enter key - Lime Chartreuse
      base: colorSystem.curiosity.primary, // #d0d34d
      hover: '#e2e55a',
      active: colorSystem.curiosity.surface, // #157954
      text: colorSystem.curiosity.background, // #21263a
    },
    secondary: {
      // Backspace key - Deep Emerald
      base: colorSystem.curiosity.surface, // #157954
      hover: '#1b9a6b',
      active: colorSystem.curiosity.primary, // #d0d34d
      text: colorSystem.curiosity.text, // #f1f5f9
    },
    accent: {
      // Escape key - Cloud Grey
      base: colorSystem.curiosity.highlight, // #d6d9d8
      hover: '#ffffff',
      active: colorSystem.curiosity.primary, // #d0d34d
      text: colorSystem.curiosity.background, // #21263a
    },
    shift: {
      // Shift keys - Periwinkle Mist
      base: colorSystem.curiosity.secondary, // #c7cee8
      hover: colorSystem.curiosity.highlight, // #d6d9d8
      active: colorSystem.curiosity.surface, // #157954
      text: colorSystem.curiosity.background, // #21263a
    },
    modifier: {
      // Ctrl, Alt, Win, Fn - Night Blue with Periwinkle text
      base: colorSystem.curiosity.background, // #21263a
      hover: '#2d344e',
      active: colorSystem.curiosity.surface, // #157954
      text: colorSystem.curiosity.secondary, // #c7cee8
    },
    function: {
      // Tab, CapsLock - Slate Inky Blue
      base: '#313752',
      hover: '#3d4566',
      active: colorSystem.curiosity.primary, // #d0d34d
      text: colorSystem.curiosity.secondary, // #c7cee8
    },
    space: {
      // Spacebar
      base: '#282e45',
      hover: '#38405f',
      active: colorSystem.curiosity.primary, // #d0d34d
      text: colorSystem.curiosity.text,
    },
  },
  terminal: {
    containerBorder: 'border-[#c7cee8]/20',
    containerBg: 'bg-[#21263a]/90',
    containerShadow: 'shadow-[0_20px_50px_rgba(33,38,58,0.7)]',
    headerBorder: 'border-[#c7cee8]/15',
    headerTitleColor: 'text-[#c7cee8]',
    dots: ['bg-[#157954]', 'bg-[#c7cee8]', 'bg-[#d0d34d]'],
    promptColor: 'text-[#d0d34d]',
    textColor: 'text-[#f1f5f9]',
    secondaryTextColor: 'text-[#94a3b8]',
    inputColor: 'text-[#d0d34d]',
    inputPlaceholderColor: 'placeholder:text-[#94a3b8]/60',
    inputCaretColor: 'caret-[#d0d34d]',
    buttonClass:
      'border border-[#d0d34d]/40 bg-[#d0d34d]/15 text-[#d0d34d] hover:bg-[#d0d34d] hover:text-[#21263a] hover:shadow-[0_0_15px_rgba(208,211,77,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d0d34d]',
    buttonDisabledClass: 'opacity-40 cursor-not-allowed',
    statusColor: 'text-[#d0d34d]',
    hintTextColor: 'text-[#94a3b8]',
  },
};

export function getKeyboardTheme(side: Side | null | undefined): KeyboardTheme {
  return side === 'curiosity' ? curiosityKeyboardTheme : formalKeyboardTheme;
}
