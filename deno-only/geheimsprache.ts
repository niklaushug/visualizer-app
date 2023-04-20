import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const DIALECT = env["DIALECT"];

function replacer(match: string) {
    return match + DIALECT + match.toLowerCase()
}

export function encode(input: string): string {
    const regex = /[aeiou]/gi
    const output = input.replace(regex, replacer)
    return output
}

console.log(encode('Hallo'))
