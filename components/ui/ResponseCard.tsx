import React from "react";
import Image, { StaticImageData } from "next/image";
import { Response } from "@/backend/services/firebaseService";

interface ResponseCardProps {
  item: Response;
  index: number;
  handleLike: (index: number) => void;
  topPostId: string | null;
  //topPostImage: string;
  topPostImage: StaticImageData;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ item, index, handleLike, topPostId, topPostImage }) => {
  return (
    <div
      key={item.id}
      className="w-[350px] max-w-full rounded-2xl border 
                border-slate-700 px-4 py-4 sm:px-8 sm:py-6 md:w-[450px] 
                transition-transform duration-300 hover:-translate-y-2 shadow-lg hover:shadow-white/10"
      style={{ background: "linear-gradient(180deg, #1E1E1E, #121212)" }}
    >
      <blockquote>
        <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">{item.response}</span>
        <div className="relative z-20 mt-2 flex flex-row items-center">
          <span className="text-sm leading-[1.6] text-gray-400 font-normal">@{item.fictitiousName}</span>
        </div>
      </blockquote>

      <div className="flex items-center mt-3">
        <button
          onClick={() => handleLike(index)}
          className="flex items-center space-x-2 transition-colors duration-200 text-gray-300 hover:text-red-400"
        >
          <svg className="w-3.5 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-s">{item.likesPerPost || 0}</span>
        </button>
      </div>

      {item.id === topPostId && (
        <div className="flex items-center gap-2 bg-yellow-400/90 text-black font-bold px-4 py-1 rounded-full shadow-lg 
        mt-0 mx-20 self-end">
          <Image
            src={topPostImage}
            alt="Top Post"
            width={20}
            height={20}
            className="drop-shadow-md animate-pulse"
          />
          <p className="text-sm font-mono tracking-wide">TOP POST OF THE NIGHT</p>
        </div>
      )}
    </div>
  );
};

export default ResponseCard;