import { NextRequest, NextResponse } from "next/server";
import { getDatabase, ref, get, set } from "firebase/database";
import { app } from "@/backend/firebase-config";
import { getAuth } from "firebase/auth";

const db = getDatabase(app);
const auth = getAuth(app);

export async function middleware(req: NextRequest) {
    const sessionID = req.cookies.get("sessionID")?.value;

    if (!sessionID) {
        const newSessionID = generateID();
        await set(ref(db, `sessions/${newSessionID}`), {
            sessionID: newSessionID,
            timestamp: new Date().toISOString(),
        });

        const res = NextResponse.next();
        res.cookies.set("sessionID", newSessionID, { httpOnly: true, secure: true });
        return res;
    }

    const sessionRef = ref(db, `sessions/${sessionID}`);
    const sessionSnapshot = await get(sessionRef);

    if (!sessionSnapshot.exists()) {
        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("sessionID");
        return res;
    }

    return NextResponse.next();
}

function generateID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};