"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";
import FlameTitle from "@/app/components/FlameIcon";

export default function NavBar() {
    return (
        <nav
            className="w-full bg-white/80 backdrop-blur-md border-b border-orange-300 flex justify-between items-center px-8 py-4 sticky top-0 z-50">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                <FlameTitle/>
            </h1>

            <ul className="flex gap-10 items-center text-orange-700">
                <li>
                    <Link href="/" className="hover:text-orange-500 transition-colors">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="hover:text-orange-500 transition-colors">
                        About
                    </Link>
                </li>

                <li>
                    <Link href="/recipes" className="hover:text-orange-500 transition-colors">
                        Recipes
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard" className="hover:text-orange-500 transition-colors">
                        Dashboard
                    </Link>
                </li>

                {/* Only UserMenu handles Login/Signup or Profile/Logout */}
                <li>
                    <UserMenu/>
                </li>
            </ul>
        </nav>
    );
}
