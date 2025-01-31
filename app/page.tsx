"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input-output/Input";
import Link from 'next/link';
import Image from 'next/image';

import taubmanlogo from "@/assets/umich-taubman.png";
import tab from "@/assets/tab.png";

export default function Home() {
  const [placeholder, setPlaceholder] = useState("Send away!");
  const [currentTime, setCurrentTime] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [fictitiousName, setFictitiousName] = useState("");
  const router = useRouter();
  const modalRef = useRef(null);

  const responseList = [
    "Send away!",
    "Finalizing...",
    "I'm here for free food!",
    "I'm here for the vibes!",
    "What's urban technology??",
    "Love our built environment ❤️ ",
    "Just trying to get by!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const currentIndex = responseList.indexOf(prev);
        return responseList[(currentIndex + 1) % responseList.length];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      return new Date().toLocaleTimeString();
    };

    const interval = setInterval(() => {
      setCurrentTime(updateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showNamePrompt) {
      const timer = setTimeout(() => {
        const modal = document.querySelector('.scale-95');
        if (modal) {
          modal.classList.remove('scale-95', 'opacity-0', 'translate-y-4');
          modal.classList.add('scale-100', 'opacity-100', 'translate-y-0');
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showNamePrompt]);

  const handleShipResponse = () => {
    setShowNamePrompt(true);
  };

  const handleSubmitName = () => {
    if (fictitiousName.trim().length > 0) {
      console.log(`Fictitious Name: ${fictitiousName}`);
      console.log(`Response: ${inputValue}`);
      //setShowNamePrompt(false);
      router.push("/about");
    }
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowNamePrompt(false);
    }
  };

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-black text-white relative">
      <StarsBackground
        className="absolute top-0 left-0 w-full h-full z-2"
        starDensity={0.012}
        allStarsTwinkle={false}
        twinkleProbability={1}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={0.8}
      />
      <ShootingStars
        className="absolute top-0 left-0 w-full h-full"
        minSpeed={5}
        maxSpeed={30}
        minDelay={3000}
        maxDelay={8000}
        starColor="#FFFFFF"
        trailColor="#9E00FF"
        starWidth={30}
        starHeight={2.25}
      />

      <section className="relative w-full h-screen flex items-center justify-center px-6 py-12 sm:px-16 sm:py-20">
        <div className="relative z-20 text-center flex flex-col items-center gap-6 w-full max-w-lg">
          <h1 className="text-4xl font-bold sm:text-5xl">Welcome to the</h1>
          <h2 className="text-3xl font-semibold sm:text-4xl text-gray-300">
            <span className="text-amber-200 cursor-pointer">
              Taubman <span className="font-semibold text-amber-200">Architecture</span> Ball!
            </span>
          </h2>
          <p className="text-sm sm:text-md pb-0 text-gray-400 max-w-md italic">
            It's a night of celebration, creativity, and perhaps what's to come.
          </p>
          <label className="text-md sm:text-lg text-gray-300 mt-4">
            <span className="text-amber-300">Prompt,</span> What brings you here today?
          </label>
          <Input placeholder={placeholder} inputValue={inputValue} setInputValue={setInputValue} />
          <button
            onClick={handleShipResponse}
            className="px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-300 text-sm hover:bg-neutral-600 hover:text-neutral-100 hover:-translate-y-1 transform transition duration-200 hover:shadow-lg"
          >
            Ship My Response 🚀
          </button>
        </div>
      </section>

      <section className="text-center px-6 py-8 sm:px-16 sm:py-12">
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
            © 2025 Taubman College of Architecture and Urban Planning
          </a>
        </p>
      </section>

      {showNamePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out flex items-center justify-center z-30" onClick={handleOutsideClick}>
          <div ref={modalRef} className="bg-neutral-900 text-white 
              p-6 rounded-lg shadow-xl w-96 text-center transform transition-all duration-300 ease-in-out scale-95 opacity-0 translate-y-4">
            <h2 className="text-xl font-semibold pb-1">Enter a Fictitious Name</h2>
            <p className="text-xs pb-5 text-gray-400">We're asking for this to store and visualize your response!</p>
            <input
              type="text"
              value={fictitiousName}
              onChange={(e) => setFictitiousName(e.target.value)}
              maxLength={50}
              className="w-full p-2 font-mono text-black rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/your fictitious name"
            />
            <button
              onClick={handleSubmitName}
              className="mt-4 px-4 py-2 w-70 rounded-md border border-neutral-700 bg-neutral-700 text-neutral-300 text-sm hover:bg-neutral-600 hover:text-neutral-100 hover:translate-y-1 transform transition duration-200 hover:shadow-lg"
            >
              Confirm & Proceed 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );
}