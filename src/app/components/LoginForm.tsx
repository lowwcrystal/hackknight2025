"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {createClient} from "@/utils/supabase/client";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setLoading(true);
        setError(null);

        const {data, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            console.log("Logged in:", data.user);
            router.push("/dashboard"); // redirect to your protected page
        }

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
        >
            <h1 className="text-xl font-semibold text-center">Login</h1>

            {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )}

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
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Logging in..." : "Login"}
            </button>

            <div className="flex flex-col items-center text-sm text-gray-600 mt-2 space-y-1">
                <button
                    type="button"
                    onClick={() => router.push("/auth/forgot-password")}
                    className="text-blue-600 hover:underline"
                >
                    Forgot password?
                </button>
                <div>
                    Don’t have an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/auth/sign-up")}
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </form>
    );
}
