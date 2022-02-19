import { Brotli } from "https://code4fukui.github.io/Brotli.es/Brotli.js";

const src = new Uint8Array([
  161, 112,   3,   0, 109, 164, 116, 243,  86, 181, 130,
  136, 143, 154,  22,   9,  35,  43,   3,  45,  57, 112,
  105, 129, 151, 217, 109, 193,  19,  60, 120,  12,  15,
  215,  73,  75,  57,  12, 215,  31, 249,  44, 122, 108,
   25,  80, 200, 163,  56,  98, 181,  41,  32, 106,   0
]);

const dst = Brotli.decompress(src);
console.log(src.length, "->", dst.length);
console.log(new TextDecoder().decode(dst));
