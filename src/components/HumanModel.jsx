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
  } else if (y > 1.45) {
    selectedZone = 'neck';
  } else if (y > 1.25) {
    selectedZone = Math.abs(x) > 0.5 ? 'shoulder' : (z > 0 ? 'chest' : 'back');
  } else if (y > 1.0) {
    selectedZone = Math.abs(x) > 0.6 ? 'elbow' : (z > 0 ? 'stomach' : 'back');
  } else if (y > 0.75) {
    selectedZone = Math.abs(x) > 0.6 ? 'hand' : (z > 0 ? 'pelvis' : 'butt');
  } else if (y > 0.4) {
    selectedZone = 'thigh';
  } else if (y > 0.05) {
    selectedZone = 'knee';
  } else if (y > -0.5) {
    selectedZone = 'leg';
  } else {
    selectedZone = 'foot';
  }

  console.log(`(x:${x.toFixed(2)}, y:${y.toFixed(2)}, z:${z.toFixed(2)}) → ${selectedZone}`);
  onPartClick(selectedZone);
};
