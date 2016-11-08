attribute vec3 position;
attribute vec2 uv;

uniform float time;
uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

varying vec2 vUv;

float random(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main(void) {
  float noise = cnoise3(position.xyy / 20.0);
  float updateTime = noise + time * 8.0;
  float vsin = sin(updateTime);
  float vcos = cos(updateTime);
  float timeForRadius = mod(time, 3.0) / 3.0;
  float step = smoothstep(0.1, 0.5, timeForRadius) * (1.0 - smoothstep(0.5, 0.9, timeForRadius));
  float radius = 500.0 * pow(step, 2.0);
  vec3 updatePosition = position + vec3(
      vsin * vcos,
      vcos,
      vsin * vsin
    ) * radius;
  vUv = uv;
  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(updatePosition, 1.0);
}
