"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchResponses, updateLike, Response } from "@/backend/services/firebaseService";
import { StarsBackground } from "@/components/ui/stars-background";
import Footer from "@/components/ui/Footer";
import SearchBar from "@/components/ui/SearchBar";
import ResponseCard from "@/components/ui/ResponseCard"
import topPostImage from "@/assets/fire_local.png";

const title = "[we feelin' like...]";

export default function Dashboard() {
  const router = useRouter();
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [topPostId, setTopPostId] = useState<string | null>(null);

  useEffect(() => {
    const loadResponses = async () => {
      const fetchedResponses = await fetchResponses();
      setResponses(fetchedResponses);
      if (fetchedResponses.length > 0) {
        setTopPostId(fetchedResponses.reduce((prev, current) => (prev.likesPerPost > current.likesPerPost ? prev : current)).id);
      }
    };
    loadResponses();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollY / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async (index: number) => {
    const response = responses[index];
    await updateLike(response.id, response.likesPerPost + 1);
    setResponses((prev) => {
      const updated = [...prev];
      updated[index] = { ...response, likesPerPost: response.likesPerPost + 1 };
      return updated;
    });
    setTopPostId(responses.reduce((prev, current) => (prev.likesPerPost > current.likesPerPost ? prev : current)).id);
  };

  return (
    <div className="min-h-screen w-screen relative bg-black text-white">
      <div className="fixed inset-0 z-0 will-change-transform">
        <StarsBackground starDensity={0.005} allStarsTwinkle={false} twinkleProbability={1} minTwinkleSpeed={0.5} maxTwinkleSpeed={0.8} />
      </div>

      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center p-3">
          <h1 className="text-4xl font-mono mt-10 mb-4 text-amber-300 drop-shadow-glow">{title}</h1>

          <div className="flex flex-row items-center gap-4 mb-4">
            {["about", "help", "survey"].map((path) => (
              <a key={path} className="text-md cursor-pointer text-gray-300 hover:text-yellow-300 transition duration-300 underline" onClick={() => router.push(`/${path}`)}>
                /{path}
              </a>
            ))}
          </div>

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="flex pb-10 flex-wrap justify-center gap-8 w-full max-w-6xl">
            {responses.filter(({ response, fictitiousName }) => response.includes(searchQuery) || fictitiousName.includes(searchQuery))
              .map((item, index) => <ResponseCard key={index} {...{ item, index, handleLike, topPostId, topPostImage}} />)}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}