const glslify = require('glslify');

export default class Points {
  constructor() {
    this.uniforms = {};
    this.interval = 3;
    this.obj = this.createPoints();
  }
  createPoints(texPrev, texNext) {
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
    };
    return new THREE.Mesh(
      new THREE.BufferGeometry(),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/points.vs'),
        fragmentShader: glslify('../../glsl/points.fs'),
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time * this.time;
  }
}
