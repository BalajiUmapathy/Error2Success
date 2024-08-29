import RegisteredForm from "@/components/forms/RegisteredForm";
import Image from "next/image";
import Link from "next/link";

export default function Registered() {
  return (
    <div 
      className="flex h-screen bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('/image-1@2x.png')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
      {/* Background overlay for g8.svg */}
      <div className="absolute inset-0 z-0">
      <Image
          src="/g8.svg"
          alt="G8"
          width={600}
          height={600}
          className="max-w-full h-auto"
        />
      </div>

      <section className="flex-grow flex items-center justify-center relative z-10">
        <div 
          className="w-full max-w-lg p-10 rounded-xl"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)' // Black with 60% opacity
          }}
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
        
          {/* Handle error messages if any */}
          {/* {error && <p className="text-red-600 mt-8 text-center">{error}</p>} */}
          <RegisteredForm />
        </div>
      </section>

      <footer className="absolute bottom-0 w-full text-center py-4 bg-opacity-50 text-white z-10">
        <p className="text-sm">
          © 2024 UrbanNet
        </p>
      </footer>
    </div>
  );
}
