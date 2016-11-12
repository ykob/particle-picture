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
#pragma glslify: easeIn = require(glsl-easings/exponential-in);
#pragma glslify: easeOut = require(glsl-easings/exponential-out);

void main(void) {
  float step1 = min(mod(time, 4.0) / 4.0 * 2.0, 1.0);
  float step2 = easeOut(min(step1 / 0.1, 1.0)) * easeIn(min((1.0 - step1) / 0.5, 1.0));
  float noise = cnoise3(vec3(
    position2.x / 128.0 + time / 2.0,
    position2.y / 128.0 + time / 2.0,
    position2.z / 128.0 + time / 2.0 * -1.0
  ));
  mat4 rotate = rotateMatrix(time * 0.02, time * 0.02, time * 0.02);
  vec3 updatePosition1 = position * (1.0 - step2);
  vec3 updatePosition2 = (rotate * vec4((position2 + normalize(position2) * noise * 50.0) * step2, 1.0)).xyz;
  vec4 updatePositionLast = vec4(updatePosition1 + updatePosition2, 1.0);
  vUv = uv;
  gl_PointSize = (1.0 - step2) * 2.0 + step2 * (1400.0 / length((modelViewMatrix * updatePositionLast).xyz));
  gl_Position = projectionMatrix * modelViewMatrix * updatePositionLast;
}
