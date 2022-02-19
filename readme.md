# Brotli.es

Brotli for Deno and browsers.

```js
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
```

todo
- support compress with wasm

## forked from Brotli.js

Brotli.js is port of the [Brotli](http://tools.ietf.org/html/draft-alakuijala-brotli-01) compression algorithm (as used in the [WOFF2](http://www.w3.org/TR/WOFF2/) font format) to JavaScript. The decompressor is hand ported, and the compressor is ported
with Emscripten.  The original C++ source code can be found [here](http://github.com/google/brotli).

## Installation and usage

Install using npm.

    npm install brotli

If you want to use brotli in the browser, you should use [Browserify](http://browserify.org/) to build it.

In node, or in browserify, you can load brotli in the standard way:

```javascript
var brotli = require('brotli');
```

You can also require just the `decompress` function or just the `compress` function, which is useful for browserify builds.
For example, here's how you'd require just the `decompress` function.

```javascript
var decompress = require('brotli/decompress');
```

## API

### brotli.decompress(buffer, [outSize])

Decompresses the given buffer to produce the original input to the compressor.
The `outSize` parameter is optional, and will be computed by the decompressor
if not provided. Inside a WOFF2 file, this can be computed from the WOFF2 directory.

```javascript
// decode a buffer where the output size is known
brotli.decompress(compressedData, uncompressedLength);

// decode a buffer where the output size is not known
brotli.decompress(fs.readFileSync('compressed.bin'));
```

### brotli.compress(buffer, isText = false)

Compresses the given buffer. Pass optional parameters as the second argument.

```javascript
// encode a buffer of binary data
brotli.compress(fs.readFileSync('myfile.bin'));

// encode some data with options (default options shown)
brotli.compress(fs.readFileSync('myfile.bin'), {
  mode: 0, // 0 = generic, 1 = text, 2 = font (WOFF2)
  quality: 11, // 0 - 11
  lgwin: 22 // window size
});
```

## License

MIT
