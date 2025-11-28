import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, TrackballControls } from '@react-three/drei';
import * as THREE from 'three';

const Word = ({ children, position }) => {
  const ref = useRef();
  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion);
  });

  return (
    <Text
      ref={ref}
      position={position}
      fontSize={0.5}
      color="#d4d4d4"
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
};

const Cloud = ({ skills }) => {
  const groupRef = useRef();
  const radius = 4;
  
  const words = useMemo(() => {
    const temp = [];
    const phiSpan = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < skills.length; i++) {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skills[i]]);
    }
    return temp;
  }, [skills]);

  useFrame((state) => {
    if (groupRef.current) {
      // Auto-rotation
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;

      // Breathing animation (scaling)
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 0.5) * 0.1; // Smooth pulse
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos}>{word}</Word>
      ))}
    </group>
  );
};

const SkillCloud = () => {
  const skills = [
    'Django', 'React', 'Python', 'JavaScript', 'Node.js',
    'FastAPI', 'SQL', 'Docker', 'AWS', 'GCP',
    'Redis', 'Celery', 'Git', 'HTML', 'CSS',
    'Tailwind', 'WebRTC', 'Twilio', 'Flutter', 'Dart'
  ];

  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <fog attach="fog" args={['#1e1e1e', 0, 15]} />
        <Cloud skills={skills} />
        <TrackballControls noZoom />
      </Canvas>
    </div>
  );
};

export default SkillCloud;
