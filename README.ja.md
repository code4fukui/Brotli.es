# Brotli.es

Deno及びブラウザ向けのBrotliライブラリです。

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

## 予定
- wasmによる圧縮をサポート

## Brotli.jsから派生

Brotli.jsはBrotli圧縮アルゴリズムをJavaScriptに移植したものです。デコーダーはハンドコーディング、エンコーダーはEmscriptenを用いて移植されています。オリジナルのC++ソースコードは[こちら](http://github.com/google/brotli)にあります。

## インストールと使い方

npmでインストールできます。

    npm install brotli

ブラウザで使う場合は[Browserify](http://browserify.org/)を使ってビルドします。

Node.jsやBrowserifyの場合は標準的な方法でbrotliをロードできます。

```javascript
var brotli = require('brotli');
```

デコンプレッサーやエンコーダーだけをロードすることもできます。

```javascript
var decompress = require('brotli/decompress');
```

## API

### brotli.decompress(buffer, [outSize])

入力バッファを元のデータに展開します。
`outSize`パラメータはオプションで、デコーダーによって計算されます。WOFF2ファイル内部ではWOFF2ディレクトリから計算できます。

```javascript
// 出力サイズが分かっている場合
brotli.decompress(compressedData, uncompressedLength);

// 出力サイズが分からない場合
brotli.decompress(fs.readFileSync('compressed.bin'));
```

### brotli.compress(buffer, isText = false)

入力バッファを圧縮します。オプションでパラメータを指定できます。

```javascript
// バイナリデータを圧縮
brotli.compress(fs.readFileSync('myfile.bin'));

// オプション付きでデータを圧縮 (デフォルト設定)
brotli.compress(fs.readFileSync('myfile.bin'), {
  mode: 0, // 0 = 一般, 1 = テキスト, 2 = フォント (WOFF2)
  quality: 11, // 0 - 11
  lgwin: 22 // ウィンドウサイズ
});
```

## ライセンス

MIT