"use client";

import {useState} from "react";
import Link from "next/link";
import {createClient} from "@/utils/supabase/client";

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setLoading(true);
        setError(null);
        setMessage(null);

        const {error} = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/update-password`,
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setMessage("Password reset email sent! Check your inbox.");
        }
    };

    return (
        <form
            onSubmit={handleReset}
            className="flex flex-col gap-4 border border-gray-200 rounded-xl p-6 shadow-sm bg-white"
        >
            <h1 className="text-xl font-semibold text-center">Forgot Password</h1>

            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {message && (
                <div className="text-green-600 text-sm text-center">{message}</div>
            )}

            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm">
                <Link href="/auth/login" className="text-blue-600 hover:underline">
                    Back to login
                </Link>
            </p>
        </form>
    );
}
