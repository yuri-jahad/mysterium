/**
 * Alphabet letters management
 */
class LettersManager {
  readonly #letters: readonly string[];
  readonly #size: number;

  constructor() {
    this.#letters = Object.freeze(this.#generate());
    this.#size = this.#letters.length;
  }

  /**
   * Generates uppercase alphabet (A-Z)
   */
  #generate(): string[] {
    return Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));
  }

  /**
   * Returns alphabet size from given index
   */
  size(fromIndex?: number): number {
    if (fromIndex !== undefined) {
      return this.#letters.slice(fromIndex).length;
    }
    return this.#size;
  }

  /**
   * Returns unused letters compared to given letters
   */
  exclude(letters: string[]): string[] {
    const upperLetters = letters.map((letter) => letter.toUpperCase());
    return this.#letters.filter((letter) => !upperLetters.includes(letter));
  }

  /**
   * Returns unused letters in a word
   */
  unusedIn(word: string): string[] {
    return this.exclude(word.split(""));
  }

  /**
   * Returns complete alphabet
   */
  get all(): string[] {
    return [...this.#letters];
  }

  /**
   * Returns a random letter
   */
  random(): string {
    return this.#letters[Math.floor(Math.random() * this.#size)];
  }

  /**
   * Returns letter at specific index
   */
  at(index: number): string {
    if (index < 0 || index >= this.#size) {
      throw new Error(`Index must be between 0 and ${this.#size - 1}`);
    }
    return this.#letters[index];
  }

  /**
   * Checks if letter exists in alphabet
   */
  includes(letter: string): boolean {
    return this.#letters.includes(letter.toUpperCase());
  }

  /**
   * Returns letters in specified range
   */
  range(start: number, end: number): string[] {
    if (start < 0 || end > this.#size || start >= end) {
      throw new Error(`Invalid range: start=${start}, end=${end}`);
    }
    return [...this.#letters.slice(start, end)];
  }
}

const Letters = new LettersManager();

export default Letters;
