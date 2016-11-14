precision highp float;

uniform sampler2D texPrev;
uniform sampler2D texNext;

varying vec2 vUv;
varying float vStep;

void main(void) {
  vec3 n;
  n.xy = gl_PointCoord * 2.0 - 1.0;
  n.z = 1.0 - dot(n.xy, n.xy);
  if (n.z < 0.0) discard;
  vec4 colorPrev = texture2D(texPrev, vUv);
  vec4 colorNext = texture2D(texNext, vUv);
  float step1 = 1.0 - smoothstep(0.4, 1.0, vStep);
  float step2 = smoothstep(0.0, 0.6, vStep);
  gl_FragColor = step1 * colorPrev + step2 * colorNext;
}
