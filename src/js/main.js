import ParticlePicture from './modules/ParticlePicture.js';

const canvas = document.getElementById('canvas-webgl');
const renderer = new THREE.WebGLRenderer({
  antialias: false,
  canvas: canvas,
});
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const clock = new THREE.Clock();
const stats = new Stats();

const images = [
  'img/image01.jpg',
  'img/image02.jpg',
  'img/image03.jpg',
  'img/image04.jpg'
];
const particlePicture = new ParticlePicture();

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
  particlePicture.render(clock.getDelta());
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
  renderer.render(scene, camera);
  camera.position.set(0, 0, 1000);
  // camera.position.set(400, 400, 600);
  camera.lookAt(new THREE.Vector3());

  particlePicture.loadTexture(images, () => {
    setTimeout(() => {
      $('.p-preloader').addClass('is-hidden').on('transitionend', function() {
        $(this).addClass('is-stoped');
      });
      scene.add(particlePicture.obj);
      setEvent();
      initDatGui();
      initStats();
      resizeWindow();
      renderLoop();
    }, 200);
  });
}
init();
