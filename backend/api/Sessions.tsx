import { promises } from "dns";
import { getDatabase, ref, set } from "firebase/database";
import { metadata } from "motion/react-client";

// Session ID :
function generateID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

async function createSession(username: string): promises<void> {
    const db = getDatabase();
    const sessionID = generateID();

    await set (ref(db, `sessions/${sessionID}`), {
        sessionID: sessionID,
        timestamp: new Date().toISOString(),
    });
    sessionStorage.setItem('sessionID', sessionID);
    //return sessionID;
}

// Finish the Rest by Around End of Feb.