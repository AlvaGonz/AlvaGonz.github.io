export const CONTACT = {
  email: 'adrian.aalvarezgonz@gmail.com',
  whatsapp: '18299247374',
  telegram: '18299247374',
} as const;

export const EMAIL_SUBJECT = 'Message from your portfolio';

export function prepareMessage(raw: string): string {
  return raw.trim();
}

export function isSendable(raw: string): boolean {
  return prepareMessage(raw).length > 0;
}

export function buildMailto(email: string, message: string): string {
  const body = prepareMessage(message);
  return `mailto:${email}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsApp(digits: string, message: string): string {
  return `https://wa.me/${digits}?text=${encodeURIComponent(prepareMessage(message))}`;
}

export function buildTelegram(digits: string): string {
  return `https://t.me/+${digits}`;
}

export const TELEGRAM_NOTE =
  'Telegram cannot prefill a message. The text has been copied to your clipboard — paste it into the chat.';
