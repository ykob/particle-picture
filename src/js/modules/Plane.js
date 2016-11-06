const glslify = require('glslify');

export default class Plane {
  constructor() {
    this.uniforms = null;
    this.mesh = this.createMesh();
  }
  createMesh() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };
    return new THREE.Mesh(
      new THREE.PlaneGeometry(600, 600),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/plane.vs'),
        fragmentShader: glslify('../../glsl/plane.fs'),
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
  resize() {
    this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
  }
}
