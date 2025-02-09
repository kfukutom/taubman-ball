"use strict";
import { useEffect, useState, useRef } from "react";
//import { useRouter } from "next/router";

interface ButtonProps {
  label: string;
}


// directly reference to ./audio/button-default.mp3 here insteadd of using the audio tag
const Button: React.FC<ButtonProps> = ({ label }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/button-default.mp3");
    audioRef.current.load();
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-gray-500 text-white rounded-lg 
      hover:bg-gray-600 transition px-6"
    >
      <audio ref={audioRef} src="/button-default.mp3" preload="auto"/>
      {label}
    </button>
  );
};

export default Button;