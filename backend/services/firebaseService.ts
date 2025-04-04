// firebaseService.tsx -> fetchResponses() + updateLike()
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

// Let this file be in tact w/ dashboard/app.tsx + ui/ResponseCard.tsx
export interface Response {
  timestamp(timestamp: any): import("react").ReactNode;
  id: string;
  fictitiousName: string;
  response: string;
  likesPerPost: number;
}

export const fetchResponses = async (): Promise<Response[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "responses"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Response[];
  } catch (error) {
    console.error("Error fetching responses:", error);
    return [];
  }
}; // fetchResponses()

export const updateLike = async (responseId: string, newLikeCount: number) => {
  try {
    await updateDoc(doc(db, "responses", responseId), {
      likesPerPost: newLikeCount,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}; // updateLike() <-- query

export const updateLeftLikes = async (userId: string, newCount: number) => {
  try {
    await updateDoc(doc(db, "users", userId), {
      postsAvailable: newCount,
    });
  } catch (error) {
    console.error("Error updating likes:", error);
  }
}; // updateLeftLikes()