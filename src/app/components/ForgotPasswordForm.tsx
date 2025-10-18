"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

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

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
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
      className="flex flex-col gap-4 border border-orange-200 rounded-2xl p-8 shadow-lg bg-white"
    >
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-4">
        Forgot Password
      </h1>

      {error && <div className="text-red-600 text-sm text-center font-medium">{error}</div>}
      {message && <div className="text-green-600 text-sm text-center font-medium">{message}</div>}

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-orange-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white font-bold py-2 rounded-full hover:scale-105 hover:brightness-110 transition-transform disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-2">
        <Link href="/auth/login" className="text-orange-500 hover:underline">
          Back to login
        </Link>
      </p>
    </form>
  );
}
