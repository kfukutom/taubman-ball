"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";


// Image Assets:
import Image from "next/image";
import Earth from "@/assets/corner-earth.png";

interface Response {
  fictitiousName: string;
  response: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [likes, setLikes] = useState<number[]>([]);
  // State to control the fade-in animation for the Earth image
  const [earthVisible, setEarthVisible] = useState(false);

  // fade trigger w/ state updates and changes
  useEffect(() => {
    setEarthVisible(true);
  }, []);

  useEffect(() => {
    // firestore fetch responses:
    const fetchResponses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "responses"));
        const fetchedResponses = querySnapshot.docs.map(
          (doc) => doc.data() as Response
        );
        setResponses(fetchedResponses);
        // Initialize likes for each response with 0
        setLikes(new Array(fetchedResponses.length).fill(0));
      } catch (error) {
        console.error("Error fetching responses:", error);
      }
    };

    fetchResponses();
  }, []);

  // Filter responses based on search query
  const filteredResponses = responses.filter(
    (item) =>
      item.response.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fictitiousName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLike = (index: number) => {
    setLikes((prevLikes) => {
      const updatedLikes = [...prevLikes];
      updatedLikes[index] = (updatedLikes[index] || 0) + 1;
      return updatedLikes;
    });
  };

  return (
    <div className="min-h-screen w-screen relative bg-black text-white overflow-hidden">
      {/* Night-sky background */}
      <StarsBackground
        className="absolute top-0 left-0 w-full h-full z-0"
        starDensity={0.0054}
        allStarsTwinkle={false}
        twinkleProbability={1}
        minTwinkleSpeed={0.5}
        maxTwinkleSpeed={0.8}
      />
      <ShootingStars
        className="absolute top-0 left-0 w-full h-full z-0"
        minSpeed={5}
        maxSpeed={30}
        minDelay={3000}
        maxDelay={6000}
        starColor="#FFFFFF"
        trailColor="#9E00FF"
        starWidth={30}
        starHeight={2.25}
      />

      <div className="relative z-10 flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-6 drop-shadow-md">
          How We Feeling?
        </h1>

        <div className="relative w-full max-w-lg mb-8">
          <input
            type="text"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
          <svg
            className="w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {filteredResponses.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-gray-700 rounded-md shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ease-in-out transform"
            >
              <p>
                <span className="font-bold text-amber-100">
                  {item.fictitiousName}
                </span>{" "}
                says:
              </p>
              <div className="mt-2">
                <hr className="border-gray-600 mt-1 mb-1" />
                <p className="text-gray-300">{item.response}</p>
              </div>

              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={() => handleLike(index)}
                  className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{likes[index] || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`fixed bottom-0 right-0 transition-opacity duration-1000 ${
          earthVisible ? "opacity-90" : "opacity-0"
        }`}
        style={{
          width: "25rem",
          filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))",
        }}
      >
        <Image src={Earth} alt="Earth" layout="responsive" />
      </div>
    </div>
  );
}