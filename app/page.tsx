import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="font-bold text-teal-400 text-3xl">
        Welcome to Cipher App!
      </h1>
      <p className="text-xl text-gray-400">
        This application allows you to keep track of the encrypted text.
      </p>
      <p className="text-lg font-bold text-gray-400">
        Awesome! 😉
        <Link href="/encrypt" className="text-teal-400 underline font-normal">
          Let's try it now!
        </Link>
      </p>
    </div>
  )
}
