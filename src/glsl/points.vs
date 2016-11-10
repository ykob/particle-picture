attribute vec3 position;
attribute vec2 uv;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main(void) {
  vUv = uv;
  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
