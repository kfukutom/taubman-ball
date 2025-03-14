"use client"; // navlinks
import React from "react";
import { useRouter } from "next/navigation";

const NavigationLinks = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row items-center gap-6 mb-4">
      {["about", "help", "survey"].map((path) => (
        <a
          key={path}
          className="text-lg cursor-pointer text-gray-300 hover:text-yellow-300 transition duration-300 hover:scale-105 transform"
          onClick={() => router.push(`/${path}`)}
        >
          /{path}
        </a>
      ))}
    </div>
  );
}; // NavigationLinks()

export default NavigationLinks;