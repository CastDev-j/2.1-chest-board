import * as THREE from "three";
import { Face } from "./face";

interface ChestBoardOptions {
  size?: number;
  scale?: number;
  wireframe?: boolean;
  position?: THREE.Vector3;
  rotation?: THREE.Vector3;
  primaryColor?: THREE.Color;
  secondaryColor?: THREE.Color;
}

export class ChestBoard {
  private mesh: THREE.Group;
  private position: THREE.Vector3;
  private scale: number;
  private size: number;
  private rotation: THREE.Vector3;
  private primaryColor: THREE.Color;
  private secondaryColor: THREE.Color;
  private wireframe: boolean;

  constructor({
    size,
    scale,
    wireframe,
    position,
    rotation,
    primaryColor,
    secondaryColor,
  }: ChestBoardOptions) {
    this.position = position || new THREE.Vector3();
    this.scale = scale || 1;
    this.size = size || 8;
    this.rotation = rotation || new THREE.Vector3(0, 0, 0);
    this.primaryColor = primaryColor || new THREE.Color(0xffffff);
    this.secondaryColor = secondaryColor || new THREE.Color(0x000000);
    this.wireframe = wireframe || false;

    const group = new THREE.Group();

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const isPrimary = (i + j) % 2 === 0;

        const face = new Face({
          position: new THREE.Vector3(),
          rotation: new THREE.Vector3(0, 0, 0),
          size: this.scale,
          color: isPrimary ? this.primaryColor : this.secondaryColor,
          wireframe: this.wireframe,
        }).getMesh();

        face.position.set(i * this.scale, -j * this.scale, 0);

        group.add(face);
      }
    }

    const centerOffset = (this.size * this.scale) / 2;
    const center = new THREE.Vector3(
      -centerOffset + this.scale / 2,
      centerOffset - this.scale / 2,
      0,
    );

    group.children.forEach((child) => {
      child.position.add(center);
    });

    group.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
    group.position.copy(this.position);
    this.mesh = group;
  }

  getMesh(): THREE.Group {
    return this.mesh;
  }
}
