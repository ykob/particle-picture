const glslify = require('glslify');

export default class Points {
  constructor() {
    this.uniforms = {};
    this.interval = 3;
    this.obj = null;
  }
  createPoints(texPrev, texNext) {
    const geometry = new THREE.BufferGeometry()
    const baseVertices = [];
    const baseUvs = [];
    for (let x = 0; x < 512; x ++) {
      for (let y = 0; y < 512; y ++) {
        baseVertices.push(x - 256, (y - 256) * -1, 0);
        baseUvs.push((x / 512), 1 - (y / 512));
      }
    }
    const vertices = new Float32Array(baseVertices);
    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const uvs = new Float32Array(baseUvs);
    geometry.addAttribute('uv', new THREE.BufferAttribute(uvs, 2));
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
