attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform float radius;

varying vec4 vPosition;

#pragma glslify: scaleMatrix = require(glsl-matrix/scaleMatrix);

void main(void) {
  vec4 updatePosition = scaleMatrix(vec3(radius)) * vec4(position, 1.0);
  vPosition = updatePosition;
  gl_Position = projectionMatrix * modelViewMatrix * updatePosition;
}
