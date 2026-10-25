import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Keyboard3D } from './Keyboard3D';
import {
  CONTACT,
  TELEGRAM_NOTE,
  buildMailto,
  buildTelegram,
  buildWhatsApp,
  isSendable,
  prepareMessage,
} from './contact';

export default function KeyboardContact() {
  const [message, setMessage] = useState('');
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const flashKey = useCallback((code: string) => {
    setActiveKeys((prev) => new Set(prev).add(code));
    window.setTimeout(() => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }, 100);
  }, []);

  const append = useCallback((value: string) => {
    setMessage((prev) => prev + value);
  }, []);

  const send = useCallback(
    (channel: 'email' | 'whatsapp' | 'telegram') => {
      const body = prepareMessage(message);
      if (!body) return;
      if (channel === 'email') {
        window.location.href = buildMailto(CONTACT.email, body);
      } else if (channel === 'whatsapp') {
        window.open(buildWhatsApp(CONTACT.whatsapp, body), '_blank', 'noopener,noreferrer');
      } else {
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(body).catch(() => {});
        }
        window.open(buildTelegram(CONTACT.telegram), '_blank', 'noopener,noreferrer');
        setStatus(TELEGRAM_NOTE);
        window.setTimeout(() => setStatus(null), 4000);
      }
    },
    [message],
  );

  const handleKeyPress = useCallback(
    (code: string, label: string) => {
      flashKey(code);
      if (code === 'Space') append(' ');
      else if (code === 'Backspace') setMessage((prev) => prev.slice(0, -1));
      else if (code === 'Enter') {
        if (isSendable(message)) send('email');
      } else if (code === 'Tab') append('  ');
      else if (code === 'Escape') setMessage('');
      else if (/^[A-Z]$/.test(label)) append(label.toLowerCase());
      else if (label.length === 1) append(label);
      inputRef.current?.focus();
    },
    [flashKey, message, append, send],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code) flashKey(e.code);
      if (e.key === 'Enter') {
        e.preventDefault();
        if (isSendable(message)) send('email');
      }
    },
    [flashKey, message, send],
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(e.code);
      return next;
    });
  }, []);

  const trimmed = prepareMessage(message);
  const canSend = trimmed.length > 0;

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border border-white/10 bg-black">
      <div className="absolute top-3 left-1/2 z-10 w-[92%] max-w-2xl -translate-x-1/2 pointer-events-auto">
        <div className="flex min-h-[150px] max-h-[200px] flex-col overflow-auto rounded-lg border border-white/10 bg-black/80 p-4 font-mono text-green-400 shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
            </div>
            <span className="text-xs uppercase tracking-widest text-white/30">Contact</span>
          </div>

          <div className="flex-1 space-y-1 text-sm">
            <p className="opacity-70">Type a message, then press Enter or pick a channel.</p>
            {status && <p className="text-yellow-400">{status}</p>}
          </div>

          <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-2">
            <span className="select-none opacity-70">&gt;</span>
            <input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              placeholder="your message..."
              className="flex-1 bg-transparent text-green-400 outline-none placeholder:text-green-700"
              aria-label="Contact message"
            />
            <button
              type="button"
              onClick={() => send('email')}
              disabled={!canSend}
              className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-300 disabled:opacity-40"
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => send('whatsapp')}
              disabled={!canSend}
              className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-300 disabled:opacity-40"
            >
              WhatsApp
            </button>
            <button
              type="button"
              onClick={() => send('telegram')}
              disabled={!canSend}
              className="rounded bg-green-500/20 px-2 py-1 text-xs text-green-300 disabled:opacity-40"
            >
              Telegram
            </button>
          </div>
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={45} />
        <ResponsiveCamera />
        <color attach="background" args={['#111']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Keyboard3D activeKeys={activeKeys} onKeyPress={handleKeyPress} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={40} blur={2} far={4} />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 left-0 w-full text-center">
        <p className="font-mono text-xs text-white/20">
          Type on your keyboard or click the 3D keys
        </p>
      </div>
    </div>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;
    const isMobile = size.width < 768;

    let zPos = 12;
    let yPos = 8;
    let targetY = 0;

    if (isMobile) {
      const targetWidth = 20;
      const vFov = (camera as { fov: number }).fov * (Math.PI / 180);
      const dist = targetWidth / (2 * Math.tan(vFov / 2) * aspect);
      zPos = Math.max(dist, 15);
      yPos = zPos * 0.6;
      targetY = 2;
    }

    camera.position.set(0, yPos, zPos);
    camera.lookAt(0, targetY, 0);
    camera.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}
