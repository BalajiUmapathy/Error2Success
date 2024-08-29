'use client'

import LoginForm from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton" // Import your SubmitButton component
import { useState } from "react"; // Import useState for managing loading state

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/image-1@2x.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* G8 Icon positioned at the top left */}
      <div className="absolute top-4 left-4">
        <Image
          src="/g8.svg"
          alt="G8"
          width={600}
          height={600}
          className="max-w-full h-auto"
        />
      </div>

      

      <section className="relative flex items-center justify-center h-full">
        <div
          className="w-full max-w-lg p-10 rounded-xl"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[60px]">
              {/* Uncomment and use your logo here */}
              {/* <Image
                src="logo."
                height={100}
                width={100}
                alt="Indian Flag"
                className="h-10 w-auto"
              /> */}
            </span>
          </div>

          <h3 className="mt-2 text-center text-base text-gray-300">
            Don&apos;t have an account?&nbsp;
            <Link
              href="/registered"
              className="font-bold text-lg text-primary transition-all duration-200 hover:text-green-500"
            >
              Register
            </Link>
          </h3>

          {/* Handle error messages if any */}
          {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
          <LoginForm />
        </div>
      </section>

      <footer className="absolute bottom-0 w-full text-center py-4 bg-opacity-50 text-white">
        <p className="text-sm">© 2024 UrbanNet</p>
      </footer>
    </div>
  );
}
