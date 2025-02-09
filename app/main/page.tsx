"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

// image components:
import taubmanlogo from "@/assets/umich-taubman.png";
import tab from "@/assets/tab.png";
import event from "@/assets/events.jpg";
import students from "@/assets/events.jpeg";
import community from "@/assets/community.jpg";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonial";
import Button from "@/components/ui/input-output/Button-demo";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();

  const updateTime = () => {
    const currentTime = new Date();
    return currentTime.toLocaleTimeString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(updateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-10">
        <p> This is such a mysterious page! </p>
        <p className="text-xs sm:text-sm text-gray-400 mt-4 flex text-center">
          For surveying purposes, click below if you felt satisfied with our platform! 👇
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">- tab team, 2025</p>
        <div className="flex justify-center mt-4">
          <Button label="Enjoyed!" />
        </div>
        
        <p className="text-xs sm:text-xs text-gray-400 mt-4 
        hover:underline cursor-pointer text-center">
          thank you~ 🙏
        </p>
      </main>
      <Footer />
    </div>
  );
}