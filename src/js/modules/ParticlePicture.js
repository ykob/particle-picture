const glslify = require('glslify');

export default class ParticlePicture {
  constructor() {
    this.textures = [];
    this.uniforms = {};
    this.interval = 2;
    this.prevNum = 0;
    this.nextNum = 1;
    this.obj = null;
  }
  loadTexture(images, callback) {
    let count = 0;
    for (var i = 0; i < images.length; i++) {
      const index = i;
      const loader = new THREE.TextureLoader();
      loader.load(images[index], (texture) => {
        this.textures[index] = texture;
        count++;
        if (count == images.length) {
          const texBrank = new THREE.DataTexture(new Uint8Array([255, 255, 255, 0]), 1, 1, THREE.RGBAFormat, THREE.UnsignedByteType);
          texBrank.needsUpdate = true;
          this.obj = this.createPoints(this.textures[this.prevNum], this.textures[this.nextNum]);
          callback();
        }
      });
    }
  }
  createPoints(texPrev, texNext) {
    const geometry = new THREE.BufferGeometry()
    const baseVertices1 = [];
    const baseVertices2 = [];
    const baseUvs = [];
    for (let x = 0; x < 512; x ++) {
      for (let y = 0; y < 512; y ++) {
        baseVertices1.push(x - 256, (y - 256) * -1, 0);
        const rad1 = (Math.random() * 90 + Math.random() * 90) * Math.PI / 180
        const rad2 = Math.random() * 360 * Math.PI / 180
        const radius = 2000 * Math.random() * Math.random() / 2 + 100
        baseVertices2.push(
          Math.sin(rad1) * Math.cos(rad2) * radius,
          Math.cos(rad1) * radius,
          Math.sin(rad1) * Math.sin(rad2) * radius,
        );
        baseUvs.push((x / 512), 1 - (y / 512));
      }
    }
    geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(baseVertices1), 3));
    geometry.addAttribute('position2', new THREE.BufferAttribute(new Float32Array(baseVertices2), 3));
    geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(baseUvs), 2));
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      interval: {
        type: 'f',
        value: this.interval,
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      texPrev: {
        type: 't',
        value: texPrev,
      },
      texNext: {
        type: 't',
        value: texNext,
      },
      rotate: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2),
      },
    };
    return new THREE.Points(
      geometry,
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/particlePicture.vs'),
        fragmentShader: glslify('../../glsl/particlePicture.fs'),
      })
    );
  }
  addToScene(scene) {
    scene.add(this.points.obj);
  }
  resize() {
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
    this.uniforms.rotate.value.set(window.innerWidth / 2, window.innerHeight / 2)
  }
  render(time) {
    this.uniforms.time.value += time / this.interval;
    if (this.uniforms.time.value > 1) {
      this.uniforms.time.value = 0;
      this.prevNum = this.nextNum;
      this.uniforms.texPrev.value = this.textures[this.prevNum];
      while (this.nextNum == this.prevNum) {
        this.nextNum = Math.floor(Math.random() * this.textures.length);
      }
      this.uniforms.texNext.value = this.textures[this.nextNum];
    }
  }
}
