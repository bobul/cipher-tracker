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
