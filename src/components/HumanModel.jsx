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

        // Save original material
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

  if (y > 1.6) {
    selectedZone = 'head';
  } else if (y > 1.4) {
    selectedZone = 'neck';
  } else if (y > 1.2) {
    selectedZone = Math.abs(x) > 0.6 ? 'shoulder' : (z > 0 ? 'chest' : 'back');
  } else if (y > 1.0) {
    selectedZone = Math.abs(x) > 0.6 ? 'elbow' : (z > 0 ? 'stomach' : 'back');
  } else if (y > 0.7) {
    selectedZone = Math.abs(x) > 0.6 ? 'hand' : (z > 0 ? 'pelvis' : 'butt');
  } else if (y > 0.2) {
    selectedZone = 'thigh';
  } else if (y > -0.3) {
    selectedZone = 'knee';
  } else if (y > -1.0) {
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
      position={[0, -1.8, 0]}
      onPointerDown={handlePointerDown}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'default')}
    />
  );
};

const HumanModel = ({ onPartSelect }) => {
  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 40 }} style={{ background: '#f0f0f0' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 5, 5]} intensity={1} />
      <OrbitControls enablePan={false} />
      <BodyModel onPartClick={onPartSelect} />
    </Canvas>
  );
};

export default HumanModel;
