attribute vec3 position;
attribute vec3 position2;
attribute vec2 uv;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

#pragma glslify: scaleMatrix = require(glsl-matrix/scaleMatrix);
#pragma glslify: rotateMatrix = require(glsl-matrix/rotateMatrix);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: ease = require(glsl-easings/exponential-out);

void main(void) {
  float step1 = min(mod(time, 2.0) / 2.0 * 2.0, 1.0);
  float step2 = min(step1 / 0.2, 1.0) * min((1.0 - step1) / 0.2, 1.0);
  float noise = (cnoise3(vec3(
    position2.x / 24.0 + time * 2.0,
    position2.y / 12.0 + time * 2.0 * -1.0,
    position2.z / 24.0 + time * 2.0
  )) + 1.0) / 2.0;
  mat4 rotate = rotateMatrix(time, time, time);
  vec3 updatePosition1 = position * (1.0 - step2);
  vec3 updatePosition2 = (rotate * vec4((position2 + normalize(position2) * pow(noise, 4.0) * 10000.0) * (step2), 1.0)).xyz;
  vUv = uv;
  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(updatePosition1 + updatePosition2, 1.0);
}
