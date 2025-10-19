import React from "react";

interface RoundedLike {
    children: React.ReactNode;
    className?: string;
}

export default function RoundedLike({children, className = ""}: RoundedLike) {
    return (
        <div
            className={`bg-white rounded-xl shadow-md border border-orange-100 p-4 ${className}`}
        >
            {children}
        </div>
    );
}
