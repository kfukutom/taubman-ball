"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchResponses, updateLike, Response, updateLeftLikes } from "@/backend/services/firebaseService";
import useSession from "@/backend/api/initSession";

// UI-Components
import { StarsBackground } from "@/components/ui/stars-background";
import Footer from "@/components/ui/Footer";
import SearchBar from "@/components/ui/SearchBar";
import NavigationLinks from "@/components/ui/NavigationLinks";
import ResponseCard from "@/components/ui/ResponseCard";
import topPostImage from "@/assets/fire_local.png";
import { HashLoader } from "react-spinners";

// HeroUI Component
import { Alert } from "@/components/ui/alert";

const title = "TAB 2025 ⭐"; // idk what fits, swasti task

export default function Dashboard() {
  const router = useRouter();
  const { session, initializeSession, clearSession, fetchSession } = useSession();
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topPostId, setTopPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const loadSessionAndResponses = async () => {
      setIsLoading(true);
      await fetchSession();
      console.log("Successfully fetched info for session");
      const currentSession = JSON.parse(localStorage.getItem("userSession") || "null");

      if (currentSession) {
        const fetchedResponses = await fetchResponses();
        setResponses(fetchedResponses);
        console.log("Fetched a total of", fetchedResponses.length, "responses.");

        // Load liked posts from localStorage
        const storedLikes = JSON.parse(localStorage.getItem("likedPosts") || "{}");
        setLikedPosts(storedLikes);

        if (fetchedResponses.length > 0) {
          setTopPostId(
            fetchedResponses.reduce((prev, current) =>
              prev.likesPerPost > current.likesPerPost ? prev : current
            ).id
          );
        }
      }
      setIsLoading(false);
    }; // loadSessionAndResponses()

    loadSessionAndResponses();
  }, []);

  useEffect(() => {
    if (session) {
      console.log("Session User:", session.username);
      console.log("You can like: ", session.postsAvailable, "more posts.");
    }
  }, [session]);

  const handleLike = async (index: number) => {
    if (!session) return;

    const response = responses[index];
    const currentlyLiked = likedPosts[response.id];

    if (!currentlyLiked) {
      if (session.postsAvailable <= 0) return;
      await updateLike(response.id, response.likesPerPost + 1);
      await updateLeftLikes(session.userId, session.postsAvailable - 1);
      session.postsAvailable--;
      setResponses((prev) => {
        const updated = [...prev];
        updated[index] = { ...response, likesPerPost: response.likesPerPost + 1 };
        return updated;
      });
      setLikedPosts((prev) => {
        const newLikes = { ...prev, [response.id]: true };
        localStorage.setItem("likedPosts", JSON.stringify(newLikes));
        return newLikes;
      });
    } else {
      await updateLike(response.id, response.likesPerPost - 1);
      await updateLeftLikes(session.userId, session.postsAvailable + 1);
      session.postsAvailable++;
      setResponses((prev) => {
        const updated = [...prev];
        updated[index] = { ...response, likesPerPost: response.likesPerPost - 1 };
        return updated;
      });
      setLikedPosts((prev) => {
        const newLikes = { ...prev, [response.id]: false };
        localStorage.setItem("likedPosts", JSON.stringify(newLikes));
        return newLikes;
      });
    }

    setTopPostId(
      responses.reduce((prev, current) =>
        prev.likesPerPost > current.likesPerPost ? prev : current
      ).id
    );
  }; // handleLikes()

  const sortedResponses = responses
    .filter(
      ({ response, fictitiousName }) =>
        response.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fictitiousName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen w-screen relative bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="fixed inset-0 z-0 will-change-transform">
        <StarsBackground
          starDensity={0.002}
          allStarsTwinkle={true}
          twinkleProbability={1}
          minTwinkleSpeed={0.5}
          maxTwinkleSpeed={0.8}
        />
      </div>

      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center p-6 max-w-7xl mx-auto">
          <h1 className="text-5xl font-mono mt-12 mb-6 text-amber-300 drop-shadow-glow animate-none">
            {title}
          </h1>

          {/* optional, navlink */}
          {/*<NavigationLinks />*/}

          {session && (
            <div className="mb-8 bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
              <p className="text-amber-200">
                Welcome, <span className="font-semibold">{session.username}</span>! 
                You have <span className="font-bold text-yellow-500">{session.postsAvailable}</span> likes remaining.
              </p>
            </div>
          )}

          {/*<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />*/}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <HashLoader color="#FFEE58" loading={isLoading} size={80} />
            </div>
          ) : sortedResponses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl pb-16">
              {sortedResponses.map((item) => (
                <ResponseCard
                  key={item.id}
                  item={item}
                  index={responses.findIndex((r) => r.id === item.id)}
                  handleLike={handleLike}
                  topPostId={topPostId}
                  topPostImage={topPostImage}
                  isLiked={likedPosts[item.id] || false}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-400">No responses found</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
} // Dashboard()