"use client";
import {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function FlameTitle() {
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    const handleClick = () => {
        router.push("/"); // navigates to the home page
    };

    return (
        <div
            className="flex items-center space-x-2 cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <div
                className={`relative w-10 h-10 ${
                    hovered ? "scale-150" : "scale-100"
                }`}
            >
                <Image
                    src={hovered ? "/flame1.png" : "/flame0.png"}
                    alt="Flame"
                    fill
                    className="object-contain"
                />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                FLAME ON
            </h1>
        </div>
    );
}