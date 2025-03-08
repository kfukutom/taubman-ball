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

const HEART_PATH = "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z";

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

  // Animation effect when liked
  useEffect(() => {
    if (isLiked) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isLiked]);

  return (
    <div
      key={item.id}
      className="relative w-[350px] max-w-full rounded-lg border 
                border-slate-700 px-4 py-4 sm:px-6 sm:py-5 md:w-[450px] 
                transition-transform duration-300 hover:-translate-y-1 shadow-md hover:shadow-slate-700/20"
      style={{ background: "linear-gradient(180deg, #1E1E1E, #121212)" }}
    >
      {item.id === topPostId && (
        <div className="absolute top-[-8px] right-[-8px] flex items-center gap-1 bg-amber-400/90 text-slate-900 font-semibold px-2 py-1 rounded-full shadow-md transform rotate-[5deg] hover:rotate-[2deg] transition-transform duration-300">
          <Image
            src={topPostImage}
            alt="Featured"
            width={16}
            height={16}
            className="drop-shadow-sm"
          />
          <p className="text-xs font-medium tracking-wide">TOP COMMENT</p>
        </div>
      )}

      <blockquote>
        <p className="relative z-20 text-sm leading-[1.6] text-slate-100 font-normal">
          {item.response}
        </p>
        <div className="relative z-20 mt-2 flex flex-row items-center">
          <span className="text-sm leading-[1.6] text-slate-400 font-normal">
            @{item.fictitiousName}
          </span>
        </div>
      </blockquote>

      <div className="flex items-center mt-3 justify-start">
        <button
          onClick={() => handleLike(index)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center space-x-2 transition-colors duration-200 p-1 rounded-md hover:bg-slate-800/50"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isAnimating ? "scale-105" : "scale-100"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{
              color: isLiked
                ? "#E53E3E"
                : isHovered
                ? "#FC8181"
                : "#A0AEC0",
            }}
          >
            <path
              fillRule="evenodd"
              d={HEART_PATH}
              clipRule="evenodd"
            />
          </svg>
          <span
            className={`text-sm font-medium transition-transform duration-300 ${
              isAnimating ? "scale-105" : "scale-100"
            } text-slate-300`}
          >
            {item.likesPerPost || 0}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ResponseCard;