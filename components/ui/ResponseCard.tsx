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

  useEffect(() => {
    if (isLiked) {
      //setIsAnimating(null);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isLiked]);

  // main:
  return (
    <div
      key={item.id}
      className="relative w-[350px] max-w-full rounded-xl border 
                border-slate-700/40 px-5 py-6 sm:px-7 sm:py-6 md:w-[450px] 
                transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl
                bg-gradient-to-b from-slate-800 to-slate-900 backdrop-blur-sm
                hover:border-slate-600/60 group"
    >
      {item.id === topPostId && (
        <div className="absolute top-[-12px] right-[-8px] flex items-center gap-1 
                      bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 
                      font-semibold px-3 py-1 rounded-full shadow-lg transform 
                      rotate-[5deg] hover:rotate-[2deg] transition-all duration-300
                      hover:scale-105 border border-amber-300/20">
          <Image
            src={topPostImage}
            alt="Featured"
            width={18}
            height={18}
            className="drop-shadow-md"
          />
          <p className="text-xs font-bold tracking-wide">TOP COMMENT</p>
        </div>
      )}

      <blockquote className="relative">
        <div className="absolute -top-4 -left-2 text-slate-600 opacity-30 text-4xl">"</div>
        <p className="relative z-20 text-sm leading-[1.7] text-slate-100 font-normal 
                    mb-3 group-hover:text-white transition-colors duration-300">
          {item.response}
        </p>
        <div className="relative z-20 mt-4 flex flex-row items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 
                        flex items-center justify-center text-white font-medium mr-3">
            {item.fictitiousName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm leading-[1.6] text-slate-300 font-medium">
            @{item.fictitiousName}
          </span>
        </div>
      </blockquote>

      <div className="flex items-center mt-5 pt-3 border-t border-slate-700/30 justify-between">
        <button
          onClick={() => handleLike(index)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center space-x-2 transition-all duration-200 p-2 rounded-lg 
                  hover:bg-slate-800/80 active:bg-slate-700/50"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${
              isAnimating ? "scale-125" : "scale-100"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{
              color: isLiked
                ? "#F56565"
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
            className={`text-sm font-medium transition-all duration-300 ${
              isAnimating ? "scale-110" : "scale-100"
            } ${isLiked ? "text-red-400" : "text-slate-300"}`}
          >
            {item.likesPerPost || 0}
          </span>
        </button>
        
        {/*
        <div className="text-xs text-slate-500 font-medium">
          {formatMood()}
        </div>*/}
      </div>
    </div>
  );
}; // ResponseCard()

export default ResponseCard;