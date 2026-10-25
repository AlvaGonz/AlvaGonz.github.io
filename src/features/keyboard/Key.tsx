import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { KeyData } from './keyboard-layout';
import type { KeyColorSet } from './keyboard-theme';

interface KeyProps {
  data: KeyData;
  position: [number, number, number];
  isPressed: boolean;
  onPress: () => void;
  colors: KeyColorSet;
}

export function Key({ data, position, isPressed, onPress, colors }: KeyProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const targetY = isPressed ? -0.15 : 0;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.45);
    }
  });

  const width = data.width || 1;
  const depth = 1;
  const height = 0.5;

  const baseColor = data.color || colors.base;
  const activeColor = colors.active;
  const hoverColor = colors.hover;
  const textColor = data.textColor || colors.text;

  const materialColor = isPressed ? activeColor : hovered ? hoverColor : baseColor;

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPress();
      }}
    >
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[width * 0.92, height, depth * 0.92]} />
        <meshStandardMaterial color={materialColor} roughness={0.35} metalness={0.15} />
      </mesh>

      <Text
        position={[
          data.align === 'left' ? -width / 2 + 0.3 : data.align === 'right' ? width / 2 - 0.3 : 0,
          height + 0.015,
          data.align === 'left' || data.align === 'right' ? 0 : 0.08,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={data.fontSize || 0.25}
        color={textColor}
        anchorX={data.align || 'center'}
        anchorY="middle"
        characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:',.<>?/`~"
      >
        {data.label}
      </Text>
    </group>
  );
}
