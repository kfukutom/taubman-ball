import { collection, addDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

const writeToDb = async (fictitiousName: string, inputValue: string): Promise<void> => {
  if (!fictitiousName.trim() || !inputValue.trim()) {
    throw new Error("Please enter both a response and a fictitious name.");
  }

  try {
    await addDoc(collection(db, "responses"), {
      fictitiousName,
      response: inputValue,
      timestamp: new Date().toISOString(),
      likesPerPost: 0,
    });
    console.log("Data saved to Firestore, we're moving on to next args.");
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    throw error;
  }
};

export default writeToDb;