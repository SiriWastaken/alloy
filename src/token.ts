
/**
 * token.ts — Defines the building blocks of Alloy's source code.
 */

export type TokenKind =
  | "PRINT"
  | "NUMBER"
  | "STRING"
  | "PLUS"
  | "LEFT_PAREN"
  | "RIGHT_PAREN"
  | "SEMICOLON";


// export woo hoo!
export interface Token {
  kind: TokenKind;
  value: string;
}
