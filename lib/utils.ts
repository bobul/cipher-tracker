import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/prisma/client";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    })
  ],
};

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

type CaesarEncryptInput = {
  plaintext: string;
  key: number;
};

export function caesarEncrypt({ plaintext, key }: CaesarEncryptInput): string {
  key = key % 26;
  const strLowerCase = plaintext.toLowerCase();
  let newStr = "";

  for (let i = 0; i < strLowerCase.length; i++) {
    const currentLetter = strLowerCase[i];

    if (currentLetter === " ") {
      newStr += currentLetter;
      continue;
    }

    const currentIndex = alphabet.indexOf(currentLetter);
    let newIndex = currentIndex + key;
    if (newIndex > 25) newIndex = newIndex - 26;
    if (newIndex < 0) newIndex = 26 + newIndex;
    if (plaintext[i] === plaintext[i].toUpperCase()) {
      newStr += alphabet[newIndex].toUpperCase();
    } else {
      newStr += alphabet[newIndex];
    }
  }
  return newStr;
}

type VigenereEncryptInput = {
  plaintext: string;
  keyword: string;
};

export function vigenereEncrypt({ plaintext, keyword }: VigenereEncryptInput): string {
  if (!plaintext || !keyword) {
    throw new Error('Both plaintext and keyword are required for encryption');
  }

  plaintext = plaintext.toUpperCase();
  keyword = keyword.toUpperCase();

  let ciphertext = '';

  for (let i = 0, j = 0; i < plaintext.length; i++) {
    const char = plaintext[i];

    if (char.match(/[A-Z]/)) {
      const charCode = char.charCodeAt(0);
      const offset = 'A'.charCodeAt(0);
      const keywordChar = keyword[j % keyword.length].charCodeAt(0);
      const encryptedChar = String.fromCharCode(((charCode + keywordChar - 2 * offset) % 26) + offset);
      ciphertext += encryptedChar;
      j++;
    } else {
      ciphertext += char;
    }
  }

  return ciphertext;
}
