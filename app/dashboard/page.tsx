"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";
import Image from "next/image";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import Footer from "@/components/ui/Footer";
import { Luckiest_Guy } from "next/font/google";
import  topPost  from "@/assets/fire_local.png";
import { set } from "firebase/database";

interface Response {
  id: string;
  fictitiousName: string;
  response: string;
  likesPerPost: number;
}

const title = "[we feelin' like...]";

export default function Dashboard() {
  const router = useRouter();
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [earthVisible, setEarthVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [topPostId, setTopPostId] = useState<string | null>(null);

  useEffect(() => {
    fetchResponses();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      setScrollProgress((scrollY / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchResponses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "responses"));
      const fetchedResponses = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Response[];
      setResponses(fetchedResponses);
      if (fetchedResponses.length > 0) {
        const topPost = fetchedResponses.reduce((prev, current) => (prev.likesPerPost > current.likesPerPost ? prev : current));
        console.log("Top post:", topPost.likesPerPost);
        console.log("Top post:", topPost.id);
        setTopPostId(topPost.id);
      };
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
    const response = responses[index];
    const newLikeCount = response.likesPerPost + 1;
    try {
      await updateDoc(doc(db, "responses", response.id), {
        likesPerPost: newLikeCount,
      });
      setResponses((prevResponses) => {
        const updatedResponses = [...prevResponses];
        updatedResponses[index] = { ...response, likesPerPost: newLikeCount };
        return updatedResponses;
      });

      const topPost = responses.reduce((prev, current) => (prev.likesPerPost > current.likesPerPost ? prev : current));
      //console.log("Top post:", topPost.likesPerPost);
      //console.log("Top post:", topPost.id);
      setTopPostId(topPost.id);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="min-h-screen w-screen relative bg-black text-white">
      <div className="fixed inset-0 z-0 will-change-transform">
        {earthVisible && (
          <StarsBackground
            starDensity={0.005}
            allStarsTwinkle={false}
            twinkleProbability={1}
            minTwinkleSpeed={0.5}
            maxTwinkleSpeed={0.8}
          />
        )}
      </div>

      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center p-3">
          <h1 className="text-4xl cursor-pointer font-mono mt-10 mb-4 text-arial text-amber-300 drop-shadow-glow">
            {title}
          </h1>

          <div className="flex flex-row items-center gap-4 mb-4">
            <a className="text-md cursor-pointer text-gray-300 hover:text-yellow-300 transition duration-300 underline" onClick={() => router.push("/about")}>
              /about
            </a>
            <p>|</p>
            <a className="text-md cursor-pointer text-gray-300 hover:text-blue-200 transition duration-300 underline" onClick={() => router.push("/help")}>
              /help
            </a>
            <p>|</p>
            <a className="text-md cursor-pointer text-gray-300 hover:text-orange-200 transition duration-300 underline" onClick={() => router.push("/main")}>
              /survey
            </a>
          </div>

          <div className="relative w-full max-w-lg mb-10 px-4 pt-4 sm:px-0">
            <input
              type="text"
              placeholder="Search responses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black-500 transition duration-300 shadow-md"
            />
          </div>

          <div className="flex pb-10 flex-wrap justify-center gap-8 w-full max-w-6xl">
            {filteredResponses.map((item, index) => (
              <div
                key={index}
                className="w-[350px] max-w-full rounded-2xl border border-slate-700 px-4 py-4 sm:px-8 sm:py-6 md:w-[450px] transition-transform duration-300 hover:-translate-y-2 shadow-lg hover:shadow-white/20"
                style={{ background: "linear-gradient(180deg, #1E1E1E, #121212)" }}
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
                  <button onClick={() => handleLike(index)} className="flex items-center space-x-2 transition-colors duration-200 text-gray-300 hover:text-red-400">
                    <svg className="w-3.5 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-s">{item.likesPerPost || 0}</span>
                  </button>
                </div>
                {/** Top post badge */}
                {item.id === topPostId && (
                  <div className="flex items-center gap-2 bg-yellow-400/90 text-black font-bold px-4 py-1 rounded-full shadow-lg 
                  mt-0 mx-20 self-end">
                    <Image
                      src={topPost}
                      alt="Top Post"
                      width={20}
                      height={20}
                      className="drop-shadow-md animate-pulse"
                    />
                    <p className="text-sm font-mono tracking-wide">TOP POST OF THE NIGHT</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}