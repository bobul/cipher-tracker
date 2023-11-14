"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function SidenavLinks() {
  const pathname = usePathname();

  const isLinkActive = (href: string): boolean => {
    return pathname === href;
  };

  return (
    <div className="flex items-center space-x-6 p-12">
      <Link href="/data">
        <h1 className={cn("text-teal-500", "md:text-xl", "text-base", "font-bold", { 'underline': isLinkActive("/data") })}>
          Ciphertext
        </h1>
      </Link>
      <Link href="/data/algorithm">
        <h1 className={cn("text-teal-500", "md:text-xl", "text-base", "font-bold", { 'underline': isLinkActive("/data/algorithm") })}>
          Algorithm
        </h1>
      </Link>
      <Link href="/data/plaintext">
        <h1 className={cn("text-teal-500", "md:text-xl", "text-base", "font-bold", { 'underline': isLinkActive("/data/plaintext") })}>
          Plaintext
        </h1>
      </Link>
    </div>
  );
}