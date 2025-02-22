import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Response } from "@/backend/services/firebaseService";

interface ResponseCardProps {
  item: Response;
  index: number;
  handleLike: (index: number) => void;
  topPostId: string | null;
  topPostImage: StaticImageData;
  isLiked: boolean;
}

const ResponseCard: React.FC<ResponseCardProps> = ({
  item,
  index,
  handleLike,
  topPostId,
  topPostImage,
  isLiked,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  //const [audio] = useState(() => new Audio("/like-sound.mp3"));

  //con
  useEffect(() => {
    if (isLiked) {
      setIsAnimating(true);
      //audio.play();
      setTimeout(() => setIsAnimating(false), 500); // Animation duration
    }
  }, [isLiked]);

  return (
    <div
      key={item.id}
      className="relative w-[350px] max-w-full rounded-2xl border 
                border-slate-700 px-4 py-4 sm:px-8 sm:py-6 md:w-[450px] 
                transition-transform duration-300 hover:-translate-y-2 shadow-lg hover:shadow-white/10"
      style={{ background: "linear-gradient(180deg, #1E1E1E, #121212)" }}
    >
      {item.id === topPostId && (
        <div className="absolute top-[-10px] right-[-10px] flex items-center gap-2 bg-yellow-400/90 text-black font-bold px-3 py-1 rounded-full shadow-lg transform rotate-[10deg] hover:rotate-[5deg] transition-transform duration-300">
          <Image
            src={topPostImage}
            alt="Top Post"
            width={20}
            height={20}
            className="drop-shadow-md animate-pulse"
          />
          <p className="text-xs font-mono tracking-wide">TOP POST 😲</p>
        </div>
      )}

      <blockquote>
        <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
          {item.response}
        </span>
        <div className="relative z-20 mt-2 flex flex-row items-center">
          <span className="text-sm leading-[1.6] text-gray-400 font-normal">
            @{item.fictitiousName}
          </span>
        </div>
      </blockquote>

      <div className="flex items-center mt-3 justify-start"> {/* Like button moved left */}
        <button
          onClick={() => handleLike(index)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center space-x-3 transition-colors duration-200"
        >

          <svg
            className={`w-5 h-6 transition-transform duration-300 ${
              isAnimating ? "scale-110 rotate-3" : "scale-100"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{
              color: isLiked
                ? "#FF4444"
                : isHovered
                ? "#FF7777"
                : "#AAAAAA",
            }}
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span
            className={`text-lg font-bold transition-transform duration-300 ${
              isAnimating ? "scale-105" : "scale-100"
            } text-gray-300`}
          >
            {item.likesPerPost || 0}
          </span>
        </button>
      </div>
    </div>
  );
}; // ResponseCard()

export default ResponseCard;