// ERROR PAGE DEFAULT FOR ROUTE:

"use client";
import React from 'react';
import { useRouter } from 'next/router';

export default function ErrorPage() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </div>
    )
}
