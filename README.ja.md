# Brotli.es

Deno及びブラウザ向けのBrotli圧縮ライブラリです。Brotli.jsからフォークして作成されました。

## 機能

- Brotli圧縮アルゴリズムのデコンプレッサをサポート
- 圧縮機能はまだサポートしていません

## 使い方

```js
import { Brotli } from "https://code4fukui.github.io/Brotli.es/Brotli.js";

const src = new Uint8Array([...]);
const dst = Brotli.decompress(src);
console.log(src.length, "->", dst.length);
console.log(new TextDecoder().decode(dst));
```

## ライセンス

MIT