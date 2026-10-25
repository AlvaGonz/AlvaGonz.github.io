import { Key } from './Key';
import { KEYBOARD_LAYOUT, type KeyRole } from './keyboard-layout';
import type { KeyboardTheme } from './keyboard-theme';

interface Keyboard3DProps {
  activeKeys: Set<string>;
  onKeyPress: (code: string, label: string) => void;
  theme: KeyboardTheme;
}

export function Keyboard3D({ activeKeys, onKeyPress, theme }: Keyboard3DProps) {
  return (
    <group position={[0, -1, 0]} rotation={[0.1, 0, 0]}>
      {/* Chassis Base Plate */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[16, 1, 6.5]} />
        <meshStandardMaterial
          color={theme.chassis.baseColor}
          roughness={theme.chassis.roughness}
          metalness={theme.chassis.metalness}
        />
      </mesh>

      {/* Chassis Framing Bezel (Top, Bottom, Left, Right) */}
      <mesh position={[0, 0.1, -3.3]} receiveShadow>
        <boxGeometry args={[16.2, 1.2, 0.2]} />
        <meshStandardMaterial
          color={theme.chassis.rimColor}
          roughness={theme.chassis.roughness}
          metalness={theme.chassis.metalness}
        />
      </mesh>
      <mesh position={[0, 0.1, 3.3]} receiveShadow>
        <boxGeometry args={[16.2, 1.2, 0.2]} />
        <meshStandardMaterial
          color={theme.chassis.rimColor}
          roughness={theme.chassis.roughness}
          metalness={theme.chassis.metalness}
        />
      </mesh>
      <mesh position={[-8.1, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.2, 1.2, 6.8]} />
        <meshStandardMaterial
          color={theme.chassis.rimColor}
          roughness={theme.chassis.roughness}
          metalness={theme.chassis.metalness}
        />
      </mesh>
      <mesh position={[8.1, 0.1, 0]} receiveShadow>
        <boxGeometry args={[0.2, 1.2, 6.8]} />
        <meshStandardMaterial
          color={theme.chassis.rimColor}
          roughness={theme.chassis.roughness}
          metalness={theme.chassis.metalness}
        />
      </mesh>

      {/* Key Matrix */}
      <group position={[-7.5, 0.5, -2.5]}>
        {KEYBOARD_LAYOUT.map((row, rowIndex) => {
          let currentX = 0;
          return (
            <group key={rowIndex} position={[0, 0, rowIndex * 1.1]}>
              {row.map((keyData) => {
                const xPos = currentX + (keyData.width || 1) / 2 - 0.5;
                currentX += (keyData.width || 1) + 0.1;

                const isPressed = activeKeys.has(keyData.code);
                const role: KeyRole = keyData.role || 'alphanumeric';
                const keyColors = theme.keys[role];

                return (
                  <Key
                    key={keyData.code}
                    data={keyData}
                    position={[xPos, 0, 0]}
                    isPressed={isPressed}
                    onPress={() => onKeyPress(keyData.code, keyData.label)}
                    colors={keyColors}
                  />
                );
              })}
            </group>
          );
        })}
      </group>
    </group>
  );
}
