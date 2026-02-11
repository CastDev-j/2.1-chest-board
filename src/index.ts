import "../global.css";
import { ChestBoard } from "./lib/chest";
import { WebGLRenderer } from "./webgl/renderer";
import * as THREE from "three";

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer = new WebGLRenderer(canvas);

const chest = new ChestBoard({
  scale: 0.5,
  wireframe: false,
  position: new THREE.Vector3(0, -0.5, 0),
  rotation: new THREE.Vector3(-Math.PI / 2, 0, 0),
  primaryColor: new THREE.Color(0x8b4513),
  secondaryColor: new THREE.Color(0xcd853f),
});

renderer.scene.add(chest.getMesh());

renderer.animate(() => {
  const time = Date.now() * 0.0001;
});
