import Plane from './Plane.js';
import Points from './Points.js';

export default class ParticlePicture {
  constructor() {
    this.textures = [];
    this.interval = 3;
    this.plane = new Plane();
    this.points = new Points();
  }
  loadTexture(images, callback) {
    let count = 0;
    for (var i = 0; i < images.length; i++) {
      const index = i;
      const loader = new THREE.TextureLoader();
      loader.load(images[index], (texture) => {
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;
        this.textures[index] = texture;
        count++;
        if (count == images.length) {
          const texBrank = new THREE.DataTexture(new Uint8Array([255, 255, 255, 0]), 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
          texBrank.needsUpdate = true;
          this.plane.createMesh(this.textures[0], texBrank);
          this.points.createPoints(this.textures[0], texBrank);
          callback();
        }
      });
    }
  }
  addToScene(scene) {
    scene.add(this.plane.obj);
    scene.add(this.points.obj);
  }
  render(time) {
    this.plane.render(time);
    this.points.render(time);
  }
}
