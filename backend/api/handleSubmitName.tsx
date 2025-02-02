import { doc, setDoc } from "firebase/firestore";
import { db } from "@/backend/firebase-config";

/**
 * Writes a user's response and fictitious name to Firestore
 * @param {string} fictitiousName - The fictitious name entered by the user
 * @param {string} inputValue - The user's response
 * @returns {Promise<void>} - Resolves when the data is written
 */

const writeToDb = async (fictitiousName: string, inputValue: string): Promise<void> => {
  if (fictitiousName.trim().length > 0 && inputValue.trim().length > 0) {
    try {
      const docId = `${Date.now()}`;

      await setDoc(doc(db, "responses", docId), {
        fictitiousName,
        response: inputValue,
        timestamp: new Date().toISOString(),
      });

      console.log("Data saved to Firestore");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
      throw error;
    }
  } else {
    throw new Error("Both fictitious name and response are required.");
  }
};

export default writeToDb;