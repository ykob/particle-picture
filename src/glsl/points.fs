precision highp float;

uniform sampler2D texPrev;
uniform sampler2D texNext;

varying vec2 vUv;

void main(void) {
  vec3 n;
  n.xy = gl_PointCoord * 2.0 - 1.0;
  n.z = 1.0 - dot(n.xy, n.xy);
  if (n.z < 0.0) discard;
  vec4 color = texture2D(texPrev, vUv);
  gl_FragColor = color;
}
