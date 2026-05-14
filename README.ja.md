# Brotli.es

Denoおよびブラウザ向けのBrotli。

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

## todo
- WASMによる圧縮のサポート

## Brotli.jsからのフォーク

Brotli.jsは、[Brotli](http://tools.ietf.org/html/draft-alakuijala-brotli-01)圧縮アルゴリズム（[WOFF2](http://www.w3.org/TR/WOFF2/)フォント形式で使用されるもの）をJavaScriptに移植したものです。デコンプレッサは手作業で移植され、コンプレッサはEmscriptenを使用して移植されています。オリジナルのC++ソースコードは[こちら](http://github.com/google/brotli)にあります。

## インストールと使用方法

npmを使用してインストールします。

    npm install brotli

ブラウザでbrotliを使用する場合は、[Browserify](http://browserify.org/)を使用してビルドする必要があります。

Node.jsまたはBrowserify環境では、標準的な方法でbrotliを読み込むことができます。

```javascript
var brotli = require('brotli');
```

また、`decompress`関数のみ、あるいは`compress`関数のみを読み込むことも可能です。これはBrowserifyでビルドする際に便利です。
例えば、`decompress`関数のみを読み込む方法は以下の通りです。

```javascript
var decompress = require('brotli/decompress');
```

## API

### brotli.decompress(buffer, [outSize])

指定されたバッファを展開し、圧縮前の元のデータを生成します。
`outSize`パラメータはオプションであり、指定されない場合はデコンプレッサによって計算されます。WOFF2ファイル内では、WOFF2ディレクトリからこの値を計算できます。

```javascript
// 出力サイズが既知のバッファをデコードする
brotli.decompress(compressedData, uncompressedLength);

// 出力サイズが未知のバッファをデコードする
brotli.decompress(fs.readFileSync('compressed.bin'));
```

### brotli.compress(buffer, isText = false)

指定されたバッファを圧縮します。第2引数としてオプションのパラメータを渡すことができます。

```javascript
// バイナリデータのバッファをエンコードする
brotli.compress(fs.readFileSync('myfile.bin'));

// オプションを指定してデータをエンコードする（デフォルトのオプションを表示）
brotli.compress(fs.readFileSync('myfile.bin'), {
  mode: 0, // 0 = 汎用, 1 = テキスト, 2 = フォント (WOFF2)
  quality: 11, // 0 - 11
  lgwin: 22 // ウィンドウサイズ
});
```

## ライセンス

MIT
