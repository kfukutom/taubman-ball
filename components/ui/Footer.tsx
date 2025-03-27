"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import taubmanlogo from "@/assets/umich-taubman.png";
import tab from "@/assets/tab.png";

const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();

  const updateTime = () => new Date().toLocaleTimeString();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(updateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full text-center py-0 mb-2">
      <p className="text-sm sm:text-md text-gray-300 max-w-lg mx-auto mb-4">
        Join us to celebrate architecture, design, and creativity!
      </p>
      <p className="text-xs sm:text-sm text-gray-400">
        <a
          href="https://taubmancollege.umich.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Built by Taubman College Students
        </a>
      </p>
      <p className="text-xs sm:text-sm text-gray-400 mt-4">
        <a
          href="https://www.michigandaily.com/news/campus-life/inaugural-taubman-architecture-ball-celebrates-creativity-outside-the-classroom/"
          target="_blank"
          className="underline"
        >
          Past Event
        </a>{" "}
        | Currently, it's{" "}
        <span className="text-blue-500 font-semibold">{currentTime}</span> |{" "}
        <a href="mailto:kfukutom@umich.edu" className="underline">
          Contact Us
        </a>
      </p>
      <div className="flex justify-center items-center gap-6 mt-8">
        <img
          src={taubmanlogo.src}
          alt="Taubman College of Architecture and Urban Planning"
          className="w-20 cursor-pointer h-auto hover:scale-110 transform transition duration-300 ease-in-out"
        />
        <img
          src={tab.src}
          onClick={() => router.push("/")}
          alt="TAB Logo"
          className="w-20 cursor-pointer h-auto hover:scale-110 transform transition duration-300 ease-in-out"
        />
      </div>
    </footer>
  );
};


// this fixes the code noise + modularity - ken
export default Footer;