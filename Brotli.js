
//import { compress } from "./compress.js";
//import { decompress } from "./decompress.js";
import { BrotliDecode } from "./decode.js";

export const Brotli = {
//  compress,
  decompress: (b) => new Uint8Array(BrotliDecode(b)),
};
