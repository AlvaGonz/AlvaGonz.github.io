export type KeyRole =
  | 'alphanumeric'
  | 'primary' // Enter (Send)
  | 'secondary' // Backspace
  | 'accent' // Escape
  | 'shift' // Shift keys
  | 'modifier' // Ctrl, Alt, Meta, Fn
  | 'function' // Tab, CapsLock
  | 'space'; // Spacebar

export interface KeyData {
  label: string;
  code: string;
  role?: KeyRole;
  width?: number;
  color?: string;
  textColor?: string;
  fontSize?: number;
  align?: 'left' | 'center' | 'right';
}

export const KEYBOARD_LAYOUT: KeyData[][] = [
  [
    {
      label: 'Esc',
      code: 'Escape',
      role: 'accent',
      fontSize: 0.18,
      align: 'left',
    },
    { label: '1', code: 'Digit1', role: 'alphanumeric' },
    { label: '2', code: 'Digit2', role: 'alphanumeric' },
    { label: '3', code: 'Digit3', role: 'alphanumeric' },
    { label: '4', code: 'Digit4', role: 'alphanumeric' },
    { label: '5', code: 'Digit5', role: 'alphanumeric' },
    { label: '6', code: 'Digit6', role: 'alphanumeric' },
    { label: '7', code: 'Digit7', role: 'alphanumeric' },
    { label: '8', code: 'Digit8', role: 'alphanumeric' },
    { label: '9', code: 'Digit9', role: 'alphanumeric' },
    { label: '0', code: 'Digit0', role: 'alphanumeric' },
    { label: '-', code: 'Minus', role: 'alphanumeric' },
    { label: '=', code: 'Equal', role: 'alphanumeric' },
    {
      label: 'Bksp',
      code: 'Backspace',
      role: 'secondary',
      width: 2,
      fontSize: 0.2,
      align: 'right',
    },
  ],
  [
    { label: 'Tab', code: 'Tab', role: 'function', width: 1.5, fontSize: 0.2, align: 'left' },
    { label: 'Q', code: 'KeyQ', role: 'alphanumeric' },
    { label: 'W', code: 'KeyW', role: 'alphanumeric' },
    { label: 'E', code: 'KeyE', role: 'alphanumeric' },
    { label: 'R', code: 'KeyR', role: 'alphanumeric' },
    { label: 'T', code: 'KeyT', role: 'alphanumeric' },
    { label: 'Y', code: 'KeyY', role: 'alphanumeric' },
    { label: 'U', code: 'KeyU', role: 'alphanumeric' },
    { label: 'I', code: 'KeyI', role: 'alphanumeric' },
    { label: 'O', code: 'KeyO', role: 'alphanumeric' },
    { label: 'P', code: 'KeyP', role: 'alphanumeric' },
    { label: '[', code: 'BracketLeft', role: 'alphanumeric' },
    { label: ']', code: 'BracketRight', role: 'alphanumeric' },
    { label: '\\', code: 'Backslash', role: 'alphanumeric', width: 1.5 },
  ],
  [
    { label: 'Caps', code: 'CapsLock', role: 'function', width: 1.8, fontSize: 0.2, align: 'left' },
    { label: 'A', code: 'KeyA', role: 'alphanumeric' },
    { label: 'S', code: 'KeyS', role: 'alphanumeric' },
    { label: 'D', code: 'KeyD', role: 'alphanumeric' },
    { label: 'F', code: 'KeyF', role: 'alphanumeric' },
    { label: 'G', code: 'KeyG', role: 'alphanumeric' },
    { label: 'H', code: 'KeyH', role: 'alphanumeric' },
    { label: 'J', code: 'KeyJ', role: 'alphanumeric' },
    { label: 'K', code: 'KeyK', role: 'alphanumeric' },
    { label: 'L', code: 'KeyL', role: 'alphanumeric' },
    { label: ';', code: 'Semicolon', role: 'alphanumeric' },
    { label: "'", code: 'Quote', role: 'alphanumeric' },
    {
      label: 'Enter',
      code: 'Enter',
      role: 'primary',
      width: 2.2,
      fontSize: 0.2,
      align: 'right',
    },
  ],
  [
    {
      label: 'Shift',
      code: 'ShiftLeft',
      role: 'shift',
      width: 2.3,
      fontSize: 0.2,
      align: 'left',
    },
    { label: 'Z', code: 'KeyZ', role: 'alphanumeric' },
    { label: 'X', code: 'KeyX', role: 'alphanumeric' },
    { label: 'C', code: 'KeyC', role: 'alphanumeric' },
    { label: 'V', code: 'KeyV', role: 'alphanumeric' },
    { label: 'B', code: 'KeyB', role: 'alphanumeric' },
    { label: 'N', code: 'KeyN', role: 'alphanumeric' },
    { label: 'M', code: 'KeyM', role: 'alphanumeric' },
    { label: ',', code: 'Comma', role: 'alphanumeric' },
    { label: '.', code: 'Period', role: 'alphanumeric' },
    { label: '/', code: 'Slash', role: 'alphanumeric' },
    {
      label: 'Shift',
      code: 'ShiftRight',
      role: 'shift',
      width: 2.7,
      fontSize: 0.2,
      align: 'right',
    },
  ],
  [
    { label: 'Ctrl', code: 'ControlLeft', role: 'modifier', width: 1.5, fontSize: 0.2 },
    { label: 'Win', code: 'MetaLeft', role: 'modifier', width: 1.2, fontSize: 0.2 },
    { label: 'Alt', code: 'AltLeft', role: 'modifier', width: 1.2, fontSize: 0.2 },
    { label: '', code: 'Space', role: 'space', width: 6.5 },
    { label: 'Alt', code: 'AltRight', role: 'modifier', width: 1.2, fontSize: 0.2 },
    { label: 'Fn', code: 'Fn', role: 'modifier', width: 1.2, fontSize: 0.2 },
    { label: 'Ctrl', code: 'ControlRight', role: 'modifier', width: 1.5, fontSize: 0.2 },
  ],
];
