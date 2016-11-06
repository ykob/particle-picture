import Plane from './modules/Plane.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  canvas: canvas,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();
const stats = new Stats();

const images = [
  'img/osaka01.jpg',
  'img/osaka02.jpg',
  'img/osaka03.jpg',
  'img/osaka04.jpg',
  'img/osaka05.jpg',
];
const plane = new Plane();

const resizeWindow = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
const setEvent = () => {
  $(window).on('resize', () => {
    resizeWindow();
  });
}
const initDatGui = () => {
  const gui = new dat.GUI();
  const controller = {
    //radius: gui.add(sphere, 'radius', 0, 1000).name('Sphere Radius')
  }
  // controller.radius.onChange((value) => {
  //   sphere.mesh.material.uniforms.radius.value = value;
  // });
}
const initStats = () => {
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
}
const render = () => {
  //sphere.render(clock.getDelta());
  renderer.render(scene, camera);
}
const renderLoop = () => {
  stats.begin();
  render();
  stats.end();
  requestAnimationFrame(renderLoop);
}

const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xeeeeee, 1.0);
  camera.position.set(0, 0, 1000);
  camera.lookAt(new THREE.Vector3());

  scene.add(plane.mesh);

  setEvent();
  initDatGui();
  initStats();
  resizeWindow();
  renderLoop();
}
init();
