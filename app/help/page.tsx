// Troubleshooting Page
"use client";
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function Troubleshooting() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col p-10 min-h-screen">
                <h1 className="text-4xl font-bold">Troubleshooting</h1>
                <p className="text-s">If you are experiencing any troubleshooting issues, please contact one of the event staffs as they will be able to provide assitance.</p>
            </div>
        </div>
    )
}