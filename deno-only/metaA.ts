import { metaB } from './metaB.ts'

export function metaA() {
    console.log("Module A's import.meta.url", import.meta.url);
    console.log("Module A's mainModule url", Deno.mainModule);
    console.log(
        "Is module A the main module via import.meta.main?",
        import.meta.main,
    );
    console.log("Resolved specifier for ./metaB.ts", import.meta.resolve("./metaB.ts"));
}

metaA();
console.log("");
metaB();
