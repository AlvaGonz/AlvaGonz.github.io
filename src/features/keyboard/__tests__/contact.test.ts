import { describe, expect, it } from 'vitest';
import { buildMailto, buildTelegram, buildWhatsApp, isSendable, prepareMessage } from '../contact';

describe('prepareMessage', () => {
  it('trims surrounding whitespace', () => {
    expect(prepareMessage('  hello  ')).toBe('hello');
  });

  it('keeps inner spaces', () => {
    expect(prepareMessage('hi there')).toBe('hi there');
  });
});

describe('isSendable', () => {
  it('returns false for empty or whitespace-only', () => {
    expect(isSendable('')).toBe(false);
    expect(isSendable('   ')).toBe(false);
  });

  it('returns true for non-empty', () => {
    expect(isSendable('hi')).toBe(true);
  });
});

describe('buildMailto', () => {
  it('encodes subject and body', () => {
    const url = buildMailto('a@b.com', 'hi there');
    expect(url).toContain('mailto:a@b.com?');
    expect(url).toContain('subject=Message%20from%20your%20portfolio');
    expect(url).toContain('body=hi%20there');
  });

  it('trims the body', () => {
    expect(buildMailto('a@b.com', '  hi  ')).toContain('body=hi');
  });
});

describe('buildWhatsApp', () => {
  it('builds a wa.me link with encoded text', () => {
    expect(buildWhatsApp('18299247374', 'hello world')).toBe(
      'https://wa.me/18299247374?text=hello%20world',
    );
  });
});

describe('buildTelegram', () => {
  it('builds a t.me phone link', () => {
    expect(buildTelegram('18299247374')).toBe('https://t.me/+18299247374');
  });
});
