import * as THREE from "three";

interface FaceOptions {
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  size: number;
  color: THREE.Color;
  wireframe?: boolean;
}
export class Face {
  private mesh: THREE.Mesh;

  constructor({
    position,
    rotation,
    size,
    color,
    wireframe = false,
  }: FaceOptions) {
    const half = size / 2;
    const vertices = new Float32Array([
      -half,
      -half,
      0,
      half,
      -half,
      0,
      half,
      half,
      0,
      -half,
      half,
      0,
    ]);
    const indices = [0, 1, 2, 0, 2, 3];

    const geometry = new THREE.BufferGeometry();
    geometry.setIndex(indices);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.rotation.set(rotation.x, rotation.y, rotation.z);
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }
}
