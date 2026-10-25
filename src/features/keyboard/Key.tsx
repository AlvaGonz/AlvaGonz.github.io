import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { KeyData } from './keyboard-layout';

interface KeyProps {
  data: KeyData;
  position: [number, number, number];
  isPressed: boolean;
  onPress: () => void;
}

export function Key({ data, position, isPressed, onPress }: KeyProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const targetY = isPressed ? -0.15 : 0;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.5);
    }
  });

  const width = data.width || 1;
  const depth = 1;
  const height = 0.5;

  const baseColor = data.color || '#f4f4f5';
  const activeColor = '#e4e4e7';
  const hoverColor = '#fafafa';

  const materialColor = isPressed ? activeColor : hovered ? hoverColor : baseColor;
  const textColor = data.textColor || '#18181b';

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
        <meshStandardMaterial color={materialColor} roughness={0.4} metalness={0.1} />
      </mesh>

      <Text
        position={[
          data.align === 'left' ? -width / 2 + 0.3 : data.align === 'right' ? width / 2 - 0.3 : 0,
          height + 0.01,
          data.align === 'left' || data.align === 'right' ? 0 : 0.1,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={data.fontSize || 0.25}
        color={textColor}
        font="https://raw.githubusercontent.com/vercel/geist-font/main/fonts/GeistMono/ttf/GeistMono-Bold.ttf"
        anchorX={data.align || 'center'}
        anchorY="middle"
      >
        {data.label}
      </Text>
    </group>
  );
}
