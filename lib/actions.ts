'use server';

import * as z from "zod";
import { FormSchema } from "@/components/encrypt-form";
import prisma from "@/prisma/client";
import { caesarEncrypt, vigenereEncrypt } from "@/lib/utils";
import { Algorithm, Ciphertext, Plaintext } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

export async function getCiphertextData(): Promise<Ciphertext[]> {
  try {
    const ciphertexts: Ciphertext[] = await prisma.ciphertext.findMany();
    return ciphertexts;
  } catch (error) {
    console.error('Error fetching ciphertexts:', error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}

export async function getPlaintextData(): Promise<Plaintext[]> {
  try {
   const plaintexts: Plaintext[] = await prisma.plaintext.findMany();
   return plaintexts;
  } catch (error) {
    console.error('Error fetching plaintexts: ', error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}

export async function getAlgorithmData(): Promise<Algorithm[]> {
  try {
    const algorithms: Algorithm[] = await prisma.algorithm.findMany();
    return algorithms;
  } catch (error) {
    console.error('Error fetching algorithms: ', error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}

export async function deleteCiphertextRecord(id: string): Promise<void> {
  try {
    await prisma.ciphertext.delete({
      where: {
        id: id,
      },
    });
    console.log(`Deleting ciphertext record with ID ${id}`);
    revalidatePath('/data');
  } catch (error) {
    console.error(`Error deleting record with ID ${id}:`, error);
    throw error;
  } finally {
    prisma.$disconnect();
  }
}