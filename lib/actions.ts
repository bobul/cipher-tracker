'use server';

import * as z from "zod";
import { FormSchema } from "@/components/encrypt-form";
import prisma from "@/prisma/client";
import { caesarEncrypt, vigenereEncrypt } from "@/lib/utils";

export async function encryptText(data: z.infer<typeof FormSchema>) {
  try {
    const { plaintext, ciphertype, key } = data;

    if (!plaintext || !key) {
      throw new Error('Both plaintext and key are required for encryption');
    }

    if (ciphertype !== 'caesar' && ciphertype !== 'vigenere') {
      throw new Error('Invalid encryption algorithm. Supported algorithms: caesar, vigenere');
    }

    const ciphertext = encrypt(plaintext, ciphertype, key);

    const savedPlaintext = await prisma.plaintext.create({
      data: { content: plaintext },
    });

    const savedAlgorithm = await prisma.algorithm.create({
      data: { name: ciphertype, key: key },
    });

    const savedCiphertext = await prisma.ciphertext.create({
      data: {
        content: ciphertext,
        plaintextId: savedPlaintext.id,
        algorithmId: savedAlgorithm.id,
      },
    });

    return {
      encryptedText: savedCiphertext.content,
      plaintextId: savedPlaintext.id,
      algorithmId: savedAlgorithm.id,
    };

  } catch (error) {
    console.error('Error during encryption:', error);
    throw new Error('Unable to encrypt the text!');
  }
}

function encrypt(plaintext: string, algorithmName: string, key: string): string {
  switch (algorithmName) {
    case 'caesar':
      return caesarEncrypt({ plaintext, key: Number(key) });
    case 'vigenere':
      return vigenereEncrypt({ plaintext, keyword: key });
    default:
      throw new Error('Invalid encryption algorithm');
  }
};