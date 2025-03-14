"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import the Next.js Image component
import { Vortex } from "@/components/ui/vortex";

// images:
import tab from "@/assets/tab.png";

export default function HelpPage() {
  const router = useRouter();

  async function handleContactSupport() {
    console.log("Alert: Contact Support");
    window.open("mailto:kfukutom@umich.edu");
  }

  return (
    <div className="relative min-h-screen overflow-y-hidden bg-black text-white flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={100}
          baseHue={120}
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-10 max-w-md text-center p-6 bg-black bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-4xl font-mono mb-4">Help + Assistance</h1>
        <p className="mb-6">
          If you are experiencing any issues, please do not hesitate to contact our support team.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleContactSupport}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Contact Support
          </button>
        </div>

        {/* Added margin-top for spacing between the button and the logo */}
        <div className="mt-4 flex justify-center">
          <Image src={tab} alt="tab-logo" width={100} height={100} />
        </div>
      </div>
    </div>
  );
}