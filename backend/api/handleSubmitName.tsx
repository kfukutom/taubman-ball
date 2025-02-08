import { doc, setDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

const writeToDb = async (fictitiousName: string, inputValue: string): Promise<void> => {
  if (fictitiousName.trim().length > 0 && inputValue.trim().length > 0) {
    try {
      const docId = `${Date.now()}`;

      await setDoc(doc(db, "responses", docId), {
        fictitiousName,
        response: inputValue,
        timestamp: new Date().toISOString(),
        likesPerPost: 0,
        likesLeft: 3,
      });

      console.log("Data saved to Firestore");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      throw error;
    }
  } else {
    throw new Error("Please enter both a response and a fictitious name.");
  }
};

export default writeToDb;