attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

// #pragma glslify: scaleMatrix = require(glsl-matrix/scaleMatrix);

void main(void) {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
