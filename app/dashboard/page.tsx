"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {db} from "@/backend/firebase-config";

import Image from "next/image";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Footer from "@/components/ui/Footer";

interface Response {
  id: string;
  fictitiousName: string;
  response: string;
  likesPerPost: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState<number[]>([]);
  const [likedResponses, setLikedResponses] = useState<boolean[]>([]);
  const [earthVisible, setEarthVisible] = useState(false);

  useEffect(() => {
    setEarthVisible(true);
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      // Loading Screen
      const querySnapshot = await getDocs(collection(db, "responses"));
      const fetchedResponses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Response[];
      setResponses(fetchedResponses);
      setLikes(fetchedResponses.map((item) => item.likesPerPost || 0));
      setLikedResponses(new Array(fetchedResponses.length).fill(false));
    } catch (error) {
      console.error("Error fetching responses:", error);
    }
  };

  const filteredResponses = responses.filter(
    (item) =>
      item.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fictitiousName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = async (index: number) => {
    if (likedResponses[index]) return;

    const postId = responses[index].id;
    const newLikeCount = likes[index] + 1;

    try {
      await updateDoc(doc(db, "responses", postId), {
        likesPerPost: newLikeCount,
      });

      setLikes((prevLikes) => {
        const updatedLikes = [...prevLikes];
        updatedLikes[index] = newLikeCount;
        return updatedLikes;
      });

      setLikedResponses((prevLiked) => {
        const updatedLiked = [...prevLiked];
        updatedLiked[index] = true;
        return updatedLiked;
      });

    } catch (error) {
      //console.warn("Error updating likes:", error);
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="min-h-screen w-screen relative bg-black text-white overflow-hidden">
      <StarsBackground className="absolute inset-0 z-0" starDensity={0.0054} allStarsTwinkle={false} twinkleProbability={1} minTwinkleSpeed={0.5} maxTwinkleSpeed={0.8} />
      <ShootingStars className="absolute inset-0 z-0" minSpeed={5} maxSpeed={30} minDelay={3000} maxDelay={6000} starColor="#FFFFFF" trailColor="#9E00FF" starWidth={30} starHeight={2.25} />

      <div className="relative z-10 flex flex-col items-center p-3">
        <h1 className="text-4xl cursor-pointer font-sans mt-3 
        mb-3 text-arial text-yellow-200 drop-shadow-glow">
          how we feelin'?!
        </h1>
        <div className="flex flex-row items-center gap-4 mb-4">
          <a className="text-md cursor-pointer text-gray-300 hover:text-yellow-300 transition duration-300" 
                        onClick={() => router.push("/about")}>
            /about
          </a>
          <p>|</p>
          <a className="text-md cursor-pointer text-gray-300 hover:text-blue-200 transition duration-300" onClick={() => router.push("/help")}>
            /help
          </a>
          <p>|</p>
          <a className="text-md cursor-pointer text-gray-300 hover:text-orange-200 transition duration-300" onClick={() => router.push("/main")}>
            /survey
          </a>
        </div>

        <div className="relative w-full max-w-lg mb-10 px-4 sm:px-0">
          <input
            type="text"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500 transition duration-300 shadow-md"
          />
          <svg
            className="w-6 h-6 absolute top-1/2 left-8 sm:left-4 transform -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Responses completely fixed: */}
        <div className="flex pb-10 flex-wrap justify-center gap-8 w-full max-w-6xl">
          {filteredResponses.map((item, index) => (
            <div
              key={index}
              className="w-[350px] max-w-full rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-4 py-4 sm:px-8 sm:py-6 md:w-[450px] transition-transform duration-300 hover:-translate-y-2"
              style={{ background: "linear-gradient(180deg, var(--slate-800), var(--slate-900))" }}
            >
              <blockquote>
                <span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">{item.response}</span>
                <div className="relative z-20 mt-2 flex flex-row items-center">
                  <span className="flex flex-col gap-1">
                    <span className="text-sm leading-[1.6] text-gray-400 font-normal">@{item.fictitiousName}</span>
                  </span>
                </div>
              </blockquote>

              <div className="flex items-center mt-3">
                <button
                  onClick={() => handleLike(index)}
                  className={`flex items-center space-x-2 transition-colors duration-200 ${likedResponses[index] ? "text-red-400" : "text-gray-300 hover:text-red-400"}`}
                >
                  <svg className="w-3.5 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <span className="text-s">{likes[index] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* lets add a footer */}
      <Footer />
    </div>
  );
}