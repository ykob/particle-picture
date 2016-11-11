const glslify = require('glslify');

export default class Points {
  constructor() {
    this.uniforms = {};
    this.interval = 3;
    this.obj = null;
  }
  createPoints(texPrev, texNext) {
    const geometry = new THREE.BufferGeometry()
    const baseVertices1 = [];
    const baseVertices2 = [];
    const baseUvs = [];
    for (let x = 0; x < 512; x ++) {
      for (let y = 0; y < 512; y ++) {
        baseVertices1.push(x - 256, (y - 256) * -1, 0);
        const rad1 = x / 512 * 2 * Math.PI
        const rad2 = y / 512 * 2 * Math.PI
        const radius = 1000 * (1 - Math.random() * Math.random() * Math.random()) + 100
        baseVertices2.push(
          Math.sin(rad1) * Math.cos(rad2) * radius,
          Math.cos(rad1) * radius ,
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
    };
    this.obj = new THREE.Points(
      geometry,
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: glslify('../../glsl/points.vs'),
        fragmentShader: glslify('../../glsl/points.fs'),
      })
    );
  }
  render(time) {
    this.uniforms.time.value += time;
  }
}
