'use client';

import * as z from "zod"
import { encryptText } from "@/lib/actions";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const FormSchema = z.object({
  plaintext: z
    .string({ required_error: "Please, enter the plain text." })
    .min(1, {message: "Please, fill the input."}),
  ciphertype: z
    .string({ required_error: "Please, select the cipher type." })
    .min(1, {message: "Please, fill the input."}),
  key: z
    .string({ required_error: "Please, enter the keyword or the shift amount." })
    .min(1, {message: "Please, fill the input."}),
});

export default function EncryptForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const selectedCipher = form.watch("ciphertype");
  const [encryptedText, setEncryptedText] = useState<string | null>(null);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await encryptText(data);
      setEncryptedText(result.encryptedText);
    } catch (e) {
      console.log('Something is wrong!');
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 space-y-6">
          <FormField
            control={form.control}
            name="plaintext"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Plain text
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter the plain text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ciphertype"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cipher type</FormLabel>
                <FormControl>
                  <select
                    className="w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                    {...field}
                  >
                    <option value="">
                      Select a cipher type
                    </option>
                    <option value="caesar">
                      Caesar
                    </option>
                    <option value="vigenere">
                      Vigenere
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {selectedCipher === "caesar" && (
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Shift amount
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the shift amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {selectedCipher === "vigenere" && (
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Keyword
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the keyword" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button type="submit" className="w-full">
            Encrypt
          </Button>
        </form>
      </Form>
      {encryptedText && <p className="mt-4">Your encrypted text: {encryptedText}</p>}
    </>
  );
}