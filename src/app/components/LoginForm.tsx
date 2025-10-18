"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Logged in:", data.user);
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 border border-orange-200 rounded-2xl p-6 shadow-lg bg-white"
    >
      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-orange-500">
        Login
      </h1>

      {/* Error */}
      {error && (
        <div className="text-red-600 text-sm text-center font-medium">
          {error}
        </div>
      )}

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-orange-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-orange-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white font-bold py-2 rounded-full hover:scale-105 hover:brightness-110 transition-transform disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Links */}
      <div className="flex flex-col items-center text-sm text-gray-600 mt-2 space-y-1">
        <button
          type="button"
          onClick={() => router.push("/auth/forgot-password")}
          className="text-orange-500 hover:underline"
        >
          Forgot password?
        </button>
        <div>
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/sign-up")}
            className="text-orange-500 hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}
