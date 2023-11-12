'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { GithubIcon, KeyIcon } from "lucide-react";

function AuthButton() {
  const { data: session } = useSession();
  const userImage = session?.user?.image;

  if (session) {
    return (
      <nav className="bg-teal-400 py-2 px-12 flex justify-between items-center">
        <div className="flex space-x-2 items-center text-white">
          <KeyIcon />
          <h1 className="font-bold text-lg">Cipher App</h1>
        </div>
        <div className="flex space-x-4 items-center">
          {userImage && <Image
            src={userImage}
            alt='user-avatar'
            width={50}
            height={50}
            className="rounded-full"
          />}
          <div className="flex flex-col space-y-1 items-center justify-center">
            <p className="font-bold text-white">Hello, {session.user?.name}</p>
            <p className="text-sm text-gray-50">{session.user?.email}</p>
          </div>
          <Button onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-teal-400 py-2 px-12 flex justify-between items-center">
      <div className="flex space-x-2 items-center text-white">
        <KeyIcon />
        <h1 className="font-bold text-lg">Cipher App</h1>
      </div>
      <Button onClick={() => signIn()}>
        <GithubIcon className="mr-2 h-4 w-4"/>
        Sign In With GitHub
      </Button>
    </nav>
  );
}

export default function NavMenu() {
  return (
    <div>
      <AuthButton />
    </div>
  );
}