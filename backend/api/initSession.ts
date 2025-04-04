"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";
import { useRouter } from "next/navigation";

// User schema:
interface UserSession {
  userId: string;
  username: string;
  postsAvailable: number;
  likedPosts: { postId: string }[];
}

const useSession = () => {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);

  // Initialize session: Check Firestore first, then create if necessary
  const initializeSession = async (fictitiousName?: string) => {

    try {
        const userId = uuidv4(); // new uuid will be generated
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            // firebase Route:
            console.log("Existing user session found in Firestore.");
            const userData = userSnap.data() as UserSession;
            localStorage.setItem("sessionToken", userData.userId);
            setSession(userData);
        } else {
            // new sesh loading...
            console.log("No user session found, creating a new one...");
            const newUser: UserSession = {
            userId,
            username: fictitiousName || `guest-${Math.random().toString(36).substr(2, 6)}`,
            postsAvailable: 3, // Default like limit for new users
            likedPosts: [],
            };
        
        await setDoc(userRef, newUser);
        localStorage.setItem("sessionToken", newUser.userId);

        setSession(newUser);
        console.log("New user session saved successfully.");
      }
    } catch (error) {
      console.error("Error initializing session:", error);
      router.push("/error");
    }
  };

  const fetchSession = async () => {
    let token = localStorage.getItem("sessionToken");

    if (token) {
      const userRef = doc(db, "users", token);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("Fetched session from Firestore.");
        const updatedSession = userSnap.data() as UserSession;
        setSession(updatedSession);
        localStorage.setItem("sessionToken", updatedSession.userId); // Sync with Firestore
      } else {
        console.error("Session not found in Firestore, clearing localStorage.");
        localStorage.removeItem("sessionToken");
        setSession(null);
      }
    }
  };

  const clearSession = () => {
    localStorage.removeItem("sessionToken");
    setSession(null);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return { session, initializeSession, clearSession, fetchSession };
};

export default useSession;