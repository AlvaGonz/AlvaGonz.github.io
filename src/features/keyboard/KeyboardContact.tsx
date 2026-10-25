import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ContactShadows, PerspectiveCamera } from '@react-three/drei';
import clsx from 'clsx';
import { useSideContext, type Side } from '@/context/SideContext';
import { Keyboard3D } from './Keyboard3D';
import { getKeyboardTheme } from './keyboard-theme';
import {
  CONTACT,
  TELEGRAM_NOTE,
  buildMailto,
  buildTelegram,
  buildWhatsApp,
  isSendable,
  prepareMessage,
} from './contact';

interface KeyboardContactProps {
  side?: Side;
}

export default function KeyboardContact({ side: propSide }: KeyboardContactProps) {
  const sideContext = useSideContext();
  const currentSide: Side = propSide || sideContext.side || 'formal';
  const theme = getKeyboardTheme(currentSide);

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
    <div
      className={clsx(
        'relative w-full h-[560px] sm:h-[520px] rounded-3xl overflow-hidden border shadow-2xl transition-[background-color,border-color] duration-500',
        theme.wrapperBorder,
        theme.wrapperBg,
      )}
    >
      {/* Terminal HUD Interface - Mobile Optimized */}
      <div className="absolute top-3 left-1/2 z-10 w-[94%] sm:w-[92%] max-w-2xl -translate-x-1/2 pointer-events-auto">
        <div
          className={clsx(
            'flex min-h-[140px] max-h-[230px] sm:max-h-[200px] flex-col overflow-y-auto overflow-x-hidden rounded-2xl border p-3 sm:p-4 font-mono shadow-2xl backdrop-blur-md transition-[background-color,border-color,color] duration-500',
            theme.terminal.containerBorder,
            theme.terminal.containerBg,
            theme.terminal.textColor,
            theme.terminal.containerShadow,
          )}
        >
          {/* Terminal Window Header */}
          <div
            className={clsx(
              'mb-2 flex items-center justify-between border-b pb-2',
              theme.terminal.headerBorder,
            )}
          >
            <div className="flex gap-1.5 sm:gap-2">
              <div
                className={clsx(
                  'h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full opacity-80',
                  theme.terminal.dots[0],
                )}
              />
              <div
                className={clsx(
                  'h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full opacity-80',
                  theme.terminal.dots[1],
                )}
              />
              <div
                className={clsx(
                  'h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full opacity-80',
                  theme.terminal.dots[2],
                )}
              />
            </div>
            <span
              className={clsx(
                'text-[10px] sm:text-xs font-semibold uppercase tracking-wider',
                theme.terminal.headerTitleColor,
              )}
            >
              Contact Console · {currentSide}
            </span>
          </div>

          {/* Instructions and Status Message */}
          <div className="flex-1 space-y-1 text-sm">
            <p
              className={clsx(
                'text-xs opacity-80 leading-relaxed',
                theme.terminal.secondaryTextColor,
              )}
            >
              Type a message below, then press Enter or dispatch via channel.
            </p>
            {status && (
              <p className={clsx('text-xs font-medium', theme.terminal.statusColor)}>{status}</p>
            )}
          </div>

          {/* Prompt, Input, and Action Buttons - Responsive Row/Column Layout */}
          <div
            className={clsx(
              'mt-2 flex flex-col gap-2 border-t pt-2 sm:flex-row sm:items-center sm:gap-2',
              theme.terminal.headerBorder,
            )}
          >
            {/* Input Row */}
            <div className="flex flex-1 items-center gap-2 min-w-0">
              <span
                className={clsx(
                  'select-none font-bold text-sm sm:text-base',
                  theme.terminal.promptColor,
                )}
              >
                &gt;
              </span>
              <input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                placeholder="Type your message..."
                className={clsx(
                  'w-full min-w-0 bg-transparent text-base sm:text-sm outline-none transition-colors duration-200',
                  theme.terminal.inputColor,
                  theme.terminal.inputPlaceholderColor,
                  theme.terminal.inputCaretColor,
                )}
                aria-label="Contact message input"
              />
            </div>

            {/* Action Buttons Row - Touch friendly and never truncated */}
            <div className="flex items-center gap-1.5 sm:gap-2 justify-end shrink-0">
              <button
                type="button"
                onClick={() => send('email')}
                disabled={!canSend}
                className={clsx(
                  'rounded-full px-3 py-1.5 sm:py-1 text-xs font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-95 touch-manipulation',
                  theme.terminal.buttonClass,
                  !canSend && theme.terminal.buttonDisabledClass,
                )}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => send('whatsapp')}
                disabled={!canSend}
                className={clsx(
                  'rounded-full px-3 py-1.5 sm:py-1 text-xs font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-95 touch-manipulation',
                  theme.terminal.buttonClass,
                  !canSend && theme.terminal.buttonDisabledClass,
                )}
              >
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => send('telegram')}
                disabled={!canSend}
                className={clsx(
                  'rounded-full px-3 py-1.5 sm:py-1 text-xs font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-95 touch-manipulation',
                  theme.terminal.buttonClass,
                  !canSend && theme.terminal.buttonDisabledClass,
                )}
              >
                Telegram
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas */}
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={45} />
        <ResponsiveCamera />
        <color attach="background" args={[theme.canvasBg]} />
        {/* Studio Lighting Setup for True Color Fidelity */}
        <ambientLight
          color={theme.lighting.ambientColor}
          intensity={theme.lighting.ambientIntensity}
        />
        <directionalLight
          position={[0, 15, 12]}
          intensity={theme.lighting.spotLightIntensity}
          color={theme.lighting.spotLightColor}
          castShadow
        />
        <directionalLight
          position={[-10, 10, 6]}
          color={theme.lighting.fillLightColor}
          intensity={theme.lighting.fillLightIntensity}
        />
        <directionalLight position={[10, 8, -4]} color="#ffffff" intensity={0.9} />
        <pointLight
          position={[0, 2, 1]}
          color={theme.lighting.glowLightColor}
          intensity={theme.lighting.glowLightIntensity}
          distance={15}
        />
        <Keyboard3D activeKeys={activeKeys} onKeyPress={handleKeyPress} theme={theme} />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={theme.lighting.shadowOpacity}
          color={theme.lighting.shadowColor}
          scale={40}
          blur={2.2}
          far={4}
        />
      </Canvas>

      {/* Accessibility / Interactive Hint */}
      <div className="pointer-events-none absolute bottom-3 left-0 w-full text-center">
        <p
          className={clsx(
            'font-mono text-xs opacity-70 transition-colors duration-500',
            theme.terminal.hintTextColor,
          )}
        >
          Type on your physical keyboard or click the 3D keys
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
