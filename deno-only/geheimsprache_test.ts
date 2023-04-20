import { assertEquals } from "https://deno.land/std@0.183.0/testing/asserts.ts";
import { encode } from "./geheimsprache.ts";
import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const DIALECT = env["DIALECT"];

Deno.test('encode vowels', () => {
    assertEquals(encode("a"), `a${DIALECT}a`);
    assertEquals(encode("e"), `e${DIALECT}e`);
    assertEquals(encode("i"), `i${DIALECT}i`);
    assertEquals(encode("o"), `o${DIALECT}o`);
    assertEquals(encode("u"), `u${DIALECT}u`);
});

Deno.test('do not encode consonant', () => {
    assertEquals(encode("qwrtypsdfghjklzxcvbnm"), "qwrtypsdfghjklzxcvbnm");
});

Deno.test('encode phrases with mixed case', () => {
    assertEquals(encode("Hallo Alfons"), `Ha${DIALECT}allo${DIALECT}o A${DIALECT}alfo${DIALECT}ons`);
    assertEquals(encode("Anna am Start"), `A${DIALECT}anna${DIALECT}a a${DIALECT}am Sta${DIALECT}art`);
});
