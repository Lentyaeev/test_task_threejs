import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#canvas'),
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xffffff, 0);

camera.position.setZ(150);
camera.position.setY(20);

const material = new THREE.MeshStandardMaterial({color: '#fc8803'});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(100,100,100);
scene.add(pointLight);

const grid = new THREE.GridHelper(200, 50);
scene.add(grid);

const controls = new OrbitControls(camera, renderer.domElement);

const select = document.querySelector('#gem');
const input = document.querySelector('#num');
const button = document.querySelector('#add');
const list = document.querySelector('#list');

var object;

function create() {
  const size = input.value;
  let form;
  switch(select.value) {
    case 'cube': form = new THREE.BoxGeometry(size, size, size); break;
    case 'sphere': form = new THREE.SphereGeometry(size, size, size); break;
    case 'icosahedron': form = new THREE.IcosahedronGeometry(size, 0); break;
  }
  object = new THREE.Mesh(form, material);
  object.position.set(getRand(), 0, getRand());
  object.name = object.uuid;
  console.log(object);
  scene.add(object);
  const listItem = document.createElement('div');
  listItem.textContent = object.uuid;
  listItem.className = 'listItem';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.id = object.uuid;
  deleteButton.addEventListener('click', () => {
    const toRemove = scene.getObjectByName(deleteButton.id);
    console.log(toRemove);
    scene.remove(toRemove);
    listItem.remove();
  });
  listItem.appendChild(deleteButton);
  list.append(listItem);
}

button.addEventListener('click', () => {
  create();
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();


function getRand() {
  const min = -70, max = 70;
  return Math.random() * (max - min) + min;
}