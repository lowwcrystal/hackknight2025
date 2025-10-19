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

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) return setError(error.message);

      router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col gap-4 border border-orange-200 rounded-2xl p-6 shadow-lg bg-white"
    >
      {/* Form Title */}
      <h1 className="text-2xl font-bold text-center text-orange-500">Sign Up</h1>

      {/* Error Message */}
      {error && (
        <div className="text-red-600 text-sm text-center font-medium">{error}</div>
      )}

      {/* Email Input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-orange-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-orange-300 rounded-lg px-3 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white font-bold py-2 rounded-full hover:scale-105 hover:brightness-110 transition-transform disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Sign Up"}
      </button>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-orange-500 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
