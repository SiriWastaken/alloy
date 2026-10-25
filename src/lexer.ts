

import type { Token, TokenKind } from "./token";

export class Lexer {
  private current = 0;
  private readonly tokens: Token[] = [];

  constructor(private readonly source: string) {}

  tokenize(): Token[] {
    while (!this.isAtEnd()) {
      this.skipWhitespace();

      if (this.isAtEnd()) {
        break;
      }

      this.scanToken();
    }

    this.tokens.push({ kind: "EOF", value: "" });
    return this.tokens;
  }

  private isAtEnd(): boolean {
    return this.current >= this.source.length;
  }

  private advance(): string {
    return this.source[this.current++] ?? "";
  }

  private peek(): string {
    return this.source[this.current] ?? "";
  }

  private isWhitespace(character: string): boolean {
    return (
      character === " " ||
      character === "\t" ||
      character === "\n" ||
      character === "\r"
    );
  }

  private skipWhitespace(): void {
    while (!this.isAtEnd() && this.isWhitespace(this.peek())) {
      this.advance();
    }
  }

  private scanToken(): void {
    const character = this.advance();

    const singleCharacterTokens: Partial<
      Record<string, TokenKind>
    > = {
      "(": "LEFT_PAREN",
      ")": "RIGHT_PAREN",
      ";": "SEMICOLON",
      "+": "PLUS",
      "-": "MINUS",
      "*": "STAR",
      "/": "SLASH",
    };

    const kind = singleCharacterTokens[character];

    if (kind !== undefined) {
      this.addToken(kind, character);
      return;
    }

    if (this.isDigit(character)) {
      this.scanNumber();
      return;
    }

    if (this.isLetter(character)) {
      this.scanWord();
      return;
    }

    if (character === '"') {
      this.scanString();
      return;
    }

    throw new Error(
      `Unexpected character '${character}' at position ${this.current - 1}.`,
    );
  }

  private scanNumber(): void {
    const start = this.current - 1;

    while (this.isDigit(this.peek())) {
      this.advance();
    }

    const value = this.source.slice(start, this.current);
    this.addToken("NUMBER", value);
  }

  private scanWord(): void {
    const start = this.current - 1;

    while (this.isAlphaNumeric(this.peek())) {
      this.advance();
    }

    const value = this.source.slice(start, this.current);
    const kind: TokenKind =
      value === "print" ? "PRINT" : "IDENTIFIER";

    this.addToken(kind, value);
  }

  private scanString(): void {
    const start = this.current;

    while (!this.isAtEnd() && this.peek() !== '"') {
      this.advance();
    }

    if (this.isAtEnd()) {
      throw new Error("Unterminated string.");
    }

    const value = this.source.slice(start, this.current);
    this.advance(); // Consume the closing quotation mark.

    this.addToken("STRING", value);
  }

  private isDigit(character: string): boolean {
    return character >= "0" && character <= "9";
  }

  private isLetter(character: string): boolean {
    return (
      (character >= "a" && character <= "z") ||
      (character >= "A" && character <= "Z") ||
      character === "_"
    );
  }

  private isAlphaNumeric(character: string): boolean {
    return this.isLetter(character) || this.isDigit(character);
  }

  private addToken(kind: TokenKind, value: string): void {
    this.tokens.push({ kind, value });
  }
}
