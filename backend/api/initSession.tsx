// initSession.tsx, Ken Fukutomi
"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

// user schema, willing to change anything
interface UserSession {
  userId: string;
  username: string;
  postsAvailable: number;
  likedPosts: { postId: string; }[];
} // UserSession IF

const useSession = () => {

    const [session, setSession] = useState<UserSession | null>(null);
    const initializeSession = async (fictitiousName?: string) => {
        const newUser: UserSession = {
        userId: uuidv4(),
        username: fictitiousName || `user-${Math.random().toString(36).substr(2, 6)}`,
        postsAvailable: 3, // like left basically.
        likedPosts: [],
        };

        try {
            await setDoc(doc(db, "users", newUser.userId), newUser);
            localStorage.setItem("userSession", JSON.stringify(newUser));
            setSession(newUser);
            console.log("Successfully Saved User Session!");
        } catch (error) {
            console.error("Error initializing session:", error);
        }
    };

    const clearSession = () => {
        localStorage.removeItem("userSession");
        setSession(null);
    }; // clearSession() no promises <>

    useEffect(() => {
        const storedSession = localStorage.getItem("userSession");
        if (storedSession) {
        setSession(JSON.parse(storedSession));
        }
  }, []);

  return { session, initializeSession, clearSession };
}; // useSession()

// end()
export default useSession;