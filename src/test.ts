
import { Lexer } from "./lexer";

const source = "print(2 + 3 * 4);";
const lexer = new Lexer(source);

console.log(lexer.tokenize());

