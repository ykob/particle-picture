attribute vec3 position;
attribute vec3 position2;
attribute vec2 uv;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;
varying float vStepPrev;
varying float vStepNext;

#pragma glslify: scaleMatrix = require(glsl-matrix/scaleMatrix);
#pragma glslify: rotateMatrix = require(glsl-matrix/rotateMatrix);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: ease = require(glsl-easings/quadratic-out);

void main(void) {
  float stepBase = min(time, 1.0);
  float width = 0.4;
  // float diff = (1.0 - (position.y / 256.0 + 1.0) / 2.0) * (1.0 - width);
  float diff = length(position.xy) / sqrt(pow(256.0, 2.0) * 2.0) * (1.0 - width);
  float stepPrev = clamp((1.0 - (stepBase - diff + (1.0 - width))) / (width * 0.5), 0.0, 1.0);
  float stepNext = clamp((stepBase - diff) / (width * 0.5), 0.0, 1.0);
  float radius = 20.0;
  vec3 updatePosition = vec3(
    position.x + cos(time * 10.0 + length(position.xy)) * radius * stepPrev * stepNext,
    position.y + sin(time * 10.0 + length(position.xy)) * radius * stepPrev * stepNext,
    0.0
  );
  vUv = uv;
  vStepPrev = stepPrev;
  vStepNext = stepNext;
  gl_PointSize = 3.0 + stepPrev * stepNext * 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(updatePosition, 1.0);
}
