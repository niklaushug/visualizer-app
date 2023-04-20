import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()
const DIALECT = process.env.DIALECT

function replacer(match) {
    return match + DIALECT + match.toLowerCase()
}

export function encode(input) {
    const regex = /[aeiou]/gi
    const output = input.replace(regex, replacer)
    return output
}

console.log(encode('Hallo'))
