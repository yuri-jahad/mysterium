/*
   Generate random token with customizable size
   Uses crypto.getRandomValues() for secure random generation
   Default size is 16 characters
*/

const digits =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";

export default function generateToken(size: number = 16): string {
  const array = new Uint8Array(size);

  crypto.getRandomValues(array);
  let token: string = "";

  for (let i = 0; i < array.length; i++) {
    token += digits[array[i] % digits.length];
  }
  return token;
}
