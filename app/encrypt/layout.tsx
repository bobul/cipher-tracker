'use client';

import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex items-center space-x-2 p-2">
        <Link href={`/`}>
          <HomeIcon className="text-teal-500 font-bold" />
        </Link>
        <p className="text-teal-500 md:text-2xl text-xl font-bold"> / </p>
        <h1 className="text-teal-500 md:text-2xl text-xl font-bold underline">
          Encrypt
        </h1>
      </div>
      <div className="w-full flex flex-col text-center justify-center items-center p-2">
        <h1 className="text-teal-500 md:text-3xl text-xl font-bold mb-3">
          Encrypt anything you want.
        </h1>
        {children}
      </div>
    </>
  )
}