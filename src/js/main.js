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
  particlePicture.resize();
}
const setEvent = () => {
  $(window).on('resize', () => {
    resizeWindow();
  }).on('mousemove', (event) => {
    particlePicture.uniforms.rotate.value.set(event.clientX, event.clientY)
  });
}
const initDatGui = () => {
  const gui = new dat.GUI();
  const controller = {
    interval: gui.add(particlePicture, 'interval', 0.3, 5).name('interval').step(0.1),
    noiseX: gui.add(particlePicture, 'noiseX', 0.1, 100).name('noise x').step(0.1),
    noiseY: gui.add(particlePicture, 'noiseY', 0.1, 100).name('noise y').step(0.1),
    noiseRadius: gui.add(particlePicture, 'noiseRadius', 0, 300).name('noise radius'),
    overlapWidth: gui.add(particlePicture, 'overlapWidth', 0, 1).name('overlap width').step(0.01),
  }
  controller.interval.onChange((value) => {
    particlePicture.uniforms.interval.value = value;
  });
  controller.noiseX.onChange((value) => {
    particlePicture.uniforms.noiseX.value = value;
  });
  controller.noiseY.onChange((value) => {
    particlePicture.uniforms.noiseY.value = value;
  });
  controller.noiseRadius.onChange((value) => {
    particlePicture.uniforms.noiseRadius.value = value;
  });
  controller.overlapWidth.onChange((value) => {
    particlePicture.uniforms.overlapWidth.value = value;
  });
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
  camera.position.set(0, 0, 1024);
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
