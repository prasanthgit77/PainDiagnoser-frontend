import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const BodyModel = ({ onPartClick }) => {
  const { scene } = useGLTF('/body-model.glb');
  const ref = useRef();
  const [highlightedMesh, setHighlightedMesh] = useState(null);
  const originalMaterials = useRef(new Map());

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.selectable = true;
        originalMaterials.current.set(child.uuid, child.material);
      }

      if (child.name.toLowerCase().includes('capsule') || child.name.toLowerCase().includes('sphere')) {
        child.visible = false;
      }
    });
  }, [scene]);

const handlePointerDown = (e) => {
  e.stopPropagation();

  if (highlightedMesh && originalMaterials.current.has(highlightedMesh.uuid)) {
    highlightedMesh.material = originalMaterials.current.get(highlightedMesh.uuid);
  }

  const clickedMesh = e.object;
  setHighlightedMesh(clickedMesh);
  clickedMesh.material = new THREE.MeshStandardMaterial({ color: '#ff8080' });

  const { x, y, z } = e.point;
  let selectedZone = 'unknown';

  if (y > 1.5) {
    selectedZone = 'head';
  } else if (y > 1.3) {
    selectedZone = 'neck';
  } else if (y > 1.1 && Math.abs(x) > 0.3) {
    selectedZone = 'shoulder';
  } else if (y > 0.9 && Math.abs(x) > 0.4) {
    selectedZone = 'elbow';
  } else if (y > 0.7 && Math.abs(x) > 0.45) {
    selectedZone = 'hand';
  } else if (y > 0.7 && z > 0) {
    selectedZone = 'chest';
  } else if (y > 0.5 && z <= 0) {
    selectedZone = 'back';
  } else if (y > 0.3) {
    selectedZone = 'stomach';
  } else if (y > 0.1) {
    selectedZone = z >= 0 ? 'pelvis' : 'butt';
  } else if (y > -0.3) {
    selectedZone = 'thigh';
  } else if (y > -0.7) {
    selectedZone = 'knee';
  } else if (y > -1.1) {
    selectedZone = 'leg';
  } else {
    selectedZone = 'foot';
  }

  console.log(`Clicked (x:${x.toFixed(2)}, y:${y.toFixed(2)}, z:${z.toFixed(2)}) → ${selectedZone}`);
  onPartClick(selectedZone);
};

  return (
    <primitive
      object={scene}
      ref={ref}
      scale={[2, 2, 2]}
      position={[0, -2, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    />
  );
};

const HumanModel = ({ onPartSelect }) => {
  return (
    <Canvas camera={{ position: [0, 3.5, 7], fov: 35 }} style={{ background: '#f0f0f0' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
      <OrbitControls enablePan={false} />
      <BodyModel onPartClick={onPartSelect} />
    </Canvas>
  );
};

export default HumanModel;
