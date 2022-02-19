import * as t from "https://deno.land/std/testing/asserts.ts";
import { Brotli } from "../Brotli.js";
import { dir2array } from "https://js.sabae.cc/dir2array.js";

const equals = (b1, b2) => {
  if (b1 == b2) {
    return true;
  }
  if (!b1 || !b2) {
    return false;
  }
  if (b1.length != b2.length) {
    return false;
  }
  for (let i = 0; i < b1.length; i++) {
    if (b1[i] != b2[i]) {
      console.log("not match", b1[i], b2[i])
      return false;
    }
  }
  return true;
};

Deno.test("decompress", async () => {
  const path = "testdata/";
  const list = await dir2array(path);
  for (const fn of list) {
    //if (fn.indexOf(".compressed") == -1) {
    if (!fn.endsWith(".compressed")) {
      continue;
    }
    console.log(fn);
    const compressed = new Uint8Array(await Deno.readFile(path + fn));
    const expected = new Uint8Array(await Deno.readFile(path + fn.replace(/\.compressed/, "")));
    const result = Brotli.decompress(compressed);
    //console.log(compressed, result, expected);
    const b = equals(result, expected);
    console.log(b, compressed.length, result.length, expected.length);
    t.assertEquals(result, expected);
  }
});
