// ERROR PAGE DEFAULT FOR ROUTE:

"use client";
import React from 'react';
import { useRouter } from 'next/router';

// comps
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/input-output/Button-demo';

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-black text-white font-[family-name:var(--font-geist-sans)] flex flex-col">
            <main className="flex-grow flex flex-col items-center justify-center p-10">
                <p> Error | 404 </p>
                <p className="text-sm sm:text-sm text-gray-300 mt-4 flex text-center">
                    It seems like you've stumbled upon an error! 😢
                </p>
                <p className="text-sm sm:text-sm text-gray-300 mt-1 flex text-center">
                    Try going back to the main page by clicking on the [TAB] icon below.
                </p>
            </main>
            <Footer />
        </div>
    )
}
