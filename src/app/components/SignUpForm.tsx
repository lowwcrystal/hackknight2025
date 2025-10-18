"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {createClient} from "@/utils/supabase/client";

export default function SignUpForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setError(null);
        setLoading(true);

        const {error} = await supabase.auth.signUp({email, password});
        setLoading(false);

        if (error) return setError(error.message);

        // alert("Check your email for confirmation!");
        router.push("/auth/login");
    };

    return (
        <form
            onSubmit={handleSignUp}
            className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
        >
            <h1 className="text-xl font-semibold text-center">Sign Up</h1>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
                {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
            </p>
        </form>
    );
}
