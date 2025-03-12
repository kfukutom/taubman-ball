"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { fetchResponses, updateLike, Response, updateLeftLikes } from "@/backend/services/firebaseService";
import useSession from "@/backend/api/initSession";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

// UI-Components
import { StarsBackground } from "@/components/ui/stars-background";
import Footer from "@/components/ui/Footer";
import NavigationLinks from "@/components/ui/NavigationLinks";
import ResponseCard from "@/components/ui/ResponseCard";
import topPostImage from "@/assets/fire_local.png";
import { HashLoader } from "react-spinners";

// HeroUI Component
import { Alert } from "@/components/ui/alert";

const title = "TAB 2025 Thread"; // idk what fits, swasti task

export default function Dashboard() {
  const router = useRouter();
  const { session, initializeSession, clearSession, fetchSession } = useSession();
  const [responses, setResponses] = useState<Response[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [topPostId, setTopPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [showStars, setShowStars] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      setIsLoading(true);
      await fetchSession();
      setIsLoading(false);
    };
    loadSession();
    
    // Defer stars loading
    const timer = setTimeout(() => setShowStars(true), 100);
    return () => clearTimeout(timer);
  }, []); // run once on mount

  useEffect(() => {
    const loadResponses = async () => {
      if (session) {
        setIsLoading(true);
        console.log("Successfully fetched info for session");
        const fetchedResponses = await fetchResponses();
        setResponses(fetchedResponses);
        console.log("Fetched a total of", fetchedResponses.length, "responses.");

        // Load liked posts from session data
        const likedMapping = session.likedPosts.reduce((acc, item) => {
          acc[item.postId] = true;
          return acc;
        }, {} as { [key: string]: boolean });
        setLikedPosts(likedMapping);

        if (fetchedResponses.length > 0) {
          setTopPostId(
            fetchedResponses.reduce((prev, current) =>
              prev.likesPerPost > current.likesPerPost ? prev : current
            ).id
          );
        }
        setIsLoading(false);
      }
    };
    loadResponses();
  }, [session]); // run when session changes

  useEffect(() => {
    if (session) {
      console.log("Session User:", session.username);
      console.log("You can like: ", session.postsAvailable, "more posts.");
    }
  }, [session]);

  const handleLike = useCallback(async (index: number) => {
    if (!session) return;

    const response = responses[index];
    const currentlyLiked = session.likedPosts.some((item) => item.postId === response.id);

    if (!currentlyLiked) {
      if (session.postsAvailable <= 0) return;
      
      // Optimistic UI update
      setResponses((prev) => {
        const updated = [...prev];
        updated[index] = { ...response, likesPerPost: response.likesPerPost + 1 };
        return updated;
      });
      setLikedPosts((prev) => ({ ...prev, [response.id]: true }));
      
      await updateLike(response.id, response.likesPerPost + 1);
      await updateLeftLikes(session.userId, session.postsAvailable - 1);
      session.postsAvailable--;
      
      const userRef = doc(db, "users", session.userId);
      const newLikedPosts = [...session.likedPosts, { postId: response.id }];
      await setDoc(userRef, { likedPosts: newLikedPosts }, { merge: true });
      session.likedPosts = newLikedPosts;
    } else {
      // Optimistic UI update
      setResponses((prev) => {
        const updated = [...prev];
        updated[index] = { ...response, likesPerPost: response.likesPerPost - 1 };
        return updated;
      });
      setLikedPosts((prev) => ({ ...prev, [response.id]: false }));
      
      await updateLike(response.id, response.likesPerPost - 1);
      await updateLeftLikes(session.userId, session.postsAvailable + 1);
      session.postsAvailable++;
      
      const userRef = doc(db, "users", session.userId);
      const newLikedPosts = session.likedPosts.filter((item) => item.postId !== response.id);
      await setDoc(userRef, { likedPosts: newLikedPosts }, { merge: true });
      session.likedPosts = newLikedPosts;
    }

    setTopPostId(
      responses.reduce((prev, current) =>
        prev.likesPerPost > current.likesPerPost ? prev : current
      ).id
    );
  }, [responses, session]); //handleLikes()

  // Sorted responses: newest first (left to right)
  const sortedResponses = useMemo(() => responses
    .filter(
      ({ response, fictitiousName }) =>
        response.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fictitiousName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()), 
    [responses, searchQuery]);
  
  return (
    <div className="min-h-screen w-screen relative bg-gradient-to-b from-black to-gray-900 text-white">
      {showStars && (
        <div className="fixed inset-0 z-0 will-change-transform">
          <StarsBackground
            starDensity={0.0005}
            allStarsTwinkle={false}
            twinkleProbability={0.7}
            minTwinkleSpeed={0.3}
            maxTwinkleSpeed={0.6}
          />
        </div>
      )}

      <div className="relative z-10 min-h-screen overflow-y-auto">
        <div className="flex flex-col items-center p-4 sm:p-6 max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-5xl mt-4 sm:mt-6 mb-3 sm:mb-5 text-amber-300 drop-shadow-glow animate-none">
            {title}
          </h1>

          {/* optional, navlink */}
          <NavigationLinks />

          {session && (
            <div className="mb-6 sm:mb-10 bg-gray-800 bg-opacity-50 p-3 sm:p-4 rounded-lg border border-gray-700 w-full max-w-sm">
              <p className="text-sm sm:text-base text-amber-200">
                Welcome, <span className="font-semibold">{session.username}</span>! 
                You are to like <span className="font-bold text-yellow-500 ">3</span> posts that <span className="font-bold text-yellow-500 ">YOU</span> absolutely love!
              </p>
            </div>
          )}

          {/*<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />*/}

          {isLoading ? (
            <div className="flex justify-center items-center h-32 sm:h-64">
              <HashLoader color="#FFEE58" loading={isLoading} size={50} />
            </div>
          ) : sortedResponses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 w-full max-w-6xl pb-8 sm:pb-16">
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
              {/* FIX LATER??*/}
            </div>
          ) : (
            <div className="flex justify-center items-center h-32 sm:h-64">
              <p className="text-lg sm:text-xl text-gray-300">No responses found! 💀</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}// Dashboard()