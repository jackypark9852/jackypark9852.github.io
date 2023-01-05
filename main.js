import "./style.css";

import * as THREE from "three";
import { AmbientLight, AnimationObjectGroup, PointLightHelper } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { randFloatSpread } from "three/src/math/MathUtils";

const scene = new THREE.Scene();
const canvas = document.querySelector("#bg");
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 1000);
camera.position.setZ(30);

const renderer = new THREE.WebGLRenderer({ canvas });

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(pointLight, ambientLight, lightHelper, gridHelper);

const wallTexture = new THREE.TextureLoader().load("textures/space.jpg");
scene.background = wallTexture;

const controls = new OrbitControls(camera, renderer.domElement);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

function animate() {
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

Array(200).fill().forEach(addStar);
requestAnimationFrame(animate);
