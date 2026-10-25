
/**
 * token.ts — Defines the building blocks of Alloy's source code.
 */


export type TokenKind =
  | "PRINT"
  | "NUMBER"
  | "STRING"
  | "IDENTIFIER"
  | "PLUS"
  | "MINUS"
  | "STAR"
  | "SLASH"
  | "LEFT_PAREN"
  | "RIGHT_PAREN"
  | "SEMICOLON"
  | "EOF";

export interface Token {
  kind: TokenKind;
  value: string;
}
