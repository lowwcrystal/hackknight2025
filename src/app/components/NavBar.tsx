import Link from "next/link";

export default function NavBar() {
    return (
        <nav
            className="w-full bg-white/80 backdrop-blur-md border-b border-orange-300 flex justify-between items-center px-8 py-4 sticky top-0 z-50">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                Flame On
            </h1>
            <ul className="flex gap-8 text-orange-700">
                <li><Link href="/" className="hover:text-orange-500 transition-colors">Home</Link></li>
                <li><Link href="/auth/generate" className="hover:text-orange-500 transition-colors">Generate</Link></li>
                <li><Link href="/recipe" className="hover:text-orange-500 transition-colors">Recipes</Link></li>
                <li><Link href="/attempts" className="hover:text-orange-500 transition-colors">Attempts</Link></li>
                <li>
                    <Link href="/auth/login"className="px-4 py-2 rounded-full border-2 border-orange-400 text-orange-400 font-medium transition-all duration-300 hover:bg-orange-400 hover:text-white hover:shadow-lg hover:scale-105">
                        Login
                    </Link>
                </li>
                <li>
                    <Link href="/auth/sign-up" className="px-4 py-2 rounded-full border-2 border-orange-400 text-orange-400 font-medium transition-all duration-300 hover:bg-orange-400 hover:text-white hover:shadow-lg hover:scale-105">
                        Sign Up
                    </Link>
                </li>

            </ul>
        </nav>
    );
}