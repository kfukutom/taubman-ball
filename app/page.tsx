"use client";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { useState, useEffect } from "react";

import taubmanlogo from "@/assets/umich-taubman.png";
import tab from "@/assets/tab.png";

export default function Home() {
  const [placeholder, setPlaceholder] = useState("Send away!");
  const [fadeState, setFadeState] = useState('fade-in');
  const responseList = [
    "Send away!",
    "Finalizing...",
    "I'm here for free food!",
    "I'm here for the vibes!",
    "What's urban technology??",
    "I love architecture and our built environment ❤️ ",
    "print('hello world')",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('fade-out');
      setTimeout(() => {
        setPlaceholder((prev) => {
          const currentIndex = responseList.indexOf(prev);
          return responseList[(currentIndex + 1) % responseList.length];
        });
        setFadeState('fade-in');
      }, 250);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
      <section className="relative w-full h-screen flex items-center justify-center px-6 py-12 sm:px-16 sm:py-20">
        <StarsBackground
          className="absolute top-0 left-0 w-full h-full"
          starDensity={0.0055}
          allStarsTwinkle={true}
          twinkleProbability={1}
          minTwinkleSpeed={0.5}
          maxTwinkleSpeed={1.0}
        />
        <ShootingStars
          className="absolute top-0 left-0 w-full h-full"
          minSpeed={10}
          maxSpeed={31}
          minDelay={4200}
          maxDelay={8700}
          starColor="#FFFFFF"
          trailColor="#9E00FF"
          starWidth={15}
          starHeight={1.25}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-center flex flex-col items-center gap-6 w-full max-w-lg">
          <h1 className="text-4xl font-bold sm:text-5xl">Welcome to the</h1>
          <h2 className="text-3xl font-semibold sm:text-4xl text-gray-300">
            Taubman Architecture Ball!
          </h2>
          <p className="text-sm sm:text-md pb-5 text-gray-400 max-w-md">
            It's a night of celebration, creativity, and perhaps what's to come.
          </p>
          <label
            htmlFor="response"
            className="text-md sm:text-lg text-gray-300 mt-6"
          >
            <span className="text-amber-300">Prompt,</span> What brings you here today?
          </label>
          <div className="relative w-full sm:w-3/4">
            <input
              id="response"
              type="text"
              placeholder={placeholder}
              maxLength={150}
              className={`w-full px-4 py-2 text-sm sm:text-md bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-500 ease-in-out ${
                fadeState === 'fade-out' ? 'opacity-90' : 'opacity-100'
              }`}
            />
          </div>
          <button className="px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-300 text-sm hover:bg-neutral-600 hover:text-neutral-100 hover:-translate-y-1 transform transition duration-200 hover:shadow-lg">
            Ship My Response 🚀
          </button>
        </div>
      </section>
      <section className="text-center px-6 py-8 sm:px-16 sm:py-12">
        <p className="text-sm sm:text-md text-gray-300 max-w-md mx-auto">
          Join us to celebrate architecture, design, and creativity!
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mt-4">
          <a
            href="https://taubmancollege.umich.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2025{" "}
            <span className="underline cursor-pointer">
              Taubman College of Architecture and Urban Planning
            </span>
          </a>
        </p>
        <p className="text-xs sm:text-sm text-gray-400 mt-4">
          <a href="https://www.michigandaily.com/news/campus-life/inaugural-taubman-architecture-ball-celebrates-creativity-outside-the-classroom/"
              target="_blank"><span className="underline cursor-pointer">About</span></a> | 
                              Currently, it's <span>{new Date().toLocaleTimeString()}{" "}</span> 
                              | <a href="mailto:kfukutom@umich.edu"><span className="underline cursor-pointer">Contact</span></a>
        </p>
        <div className="flex justify-center items-center gap-4 mt-8">
          <img
            src={taubmanlogo.src}
            alt="Taubman College of Architecture and Urban Planning"
            className="w-24 h-auto"
          />
          <img
            src={tab.src}
            alt="TAB Logo"
            className="w-20 h-auto"
          />
        </div>
      </section>
    </div>
  );
}