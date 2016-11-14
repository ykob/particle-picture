attribute vec3 position;
attribute vec3 position2;
attribute vec2 uv;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform vec2 resolution;
uniform vec2 rotate;

varying vec2 vUv;
varying float vStepPrev;
varying float vStepNext;

#pragma glslify: rotateMatrix = require(glsl-matrix/rotateMatrix);
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);
#pragma glslify: ease = require(glsl-easings/quadratic-out);

void main(void) {
  float stepBase = ease(min(time, 1.0));
  float width = 0.1;
  // float diff = (1.0 - (position.y / 256.0 + 1.0) / 2.0) * (1.0 - width);
  float diff = length(position.xy) / sqrt(pow(256.0, 2.0) * 2.0) * (1.0 - width);
  float stepPrev = clamp((1.0 - (stepBase - diff + (1.0 - width))) / (width * 0.5), 0.0, 1.0);
  float stepNext = clamp((stepBase - diff) / (width * 0.5), 0.0, 1.0);
  float noise = cnoise3(vec3(
    position.x / 2.0,
    position.y / 2.0,
    position.z
  ));
  float radius = 92.0 * noise;
  float vcos = cos(time * 128.0);
  float vsin = sin(time * 256.0);
  vec3 updatePosition = position + vec3(
    vsin * vcos * radius * stepPrev * stepNext,
    vcos * radius * stepPrev * stepNext,
    vsin * vsin * radius * stepPrev * stepNext
  );
  mat4 rotateMat = rotateMatrix(
    radians((rotate.y / resolution.y * 2.0 - 1.0) * -20.0),
    radians((rotate.x / resolution.x * 2.0 - 1.0) * -20.0),
    0.0
  );
  vUv = uv;
  vStepPrev = stepPrev;
  vStepNext = stepNext;
  vec4 mvPosition = modelViewMatrix * rotateMat * vec4(updatePosition, 1.0);
  gl_PointSize = 2.0 + stepPrev * stepNext * (2000.0 / length(mvPosition.xyz));
  gl_Position = projectionMatrix * mvPosition;
}
