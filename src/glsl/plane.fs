precision highp float;

uniform sampler2D texPrev;

varying vec2 vUv;

void main(void) {
  vec4 color = texture2D(texPrev, vUv);
  gl_FragColor = color;
}
