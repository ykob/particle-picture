attribute vec3 position;
attribute vec3 position2;
attribute vec2 uv;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;
varying float vStep;

#pragma glslify: scaleMatrix = require(glsl-matrix/scaleMatrix);
#pragma glslify: rotateMatrix = require(glsl-matrix/rotateMatrix);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: easeIn = require(glsl-easings/exponential-in);
#pragma glslify: easeOut = require(glsl-easings/exponential-out);

void main(void) {
  float stepBase = min(time, 1.0);
  float stepPrev = easeIn(clamp(stepBase / 0.25, 0.0, 1.0));
  float stepNext = easeIn(clamp((1.0 - stepBase) / 0.25, 0.0, 1.0));
  float noise = cnoise3(vec3(
    position2.x / 128.0 + time / 2.0,
    position2.y / 128.0 + time / 2.0,
    position2.z / 128.0 + time / 2.0 * -1.0
  ));
  float radius = 0.0;
  vec3 updatePosition = vec3(
    position.x + cos(time * 10.0 + position.x) * radius * stepPrev * stepNext,
    position.y + sin(time * 10.0 + position.y) * radius * stepPrev * stepNext,
    0.0
  );
  vUv = uv;
  vStep = stepBase;
  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(updatePosition, 1.0);
}
