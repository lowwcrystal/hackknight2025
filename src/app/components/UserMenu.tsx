"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function UserMenu() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // prevent SSR mismatch

  const supabase = createClient();

  useEffect(() => {
    setMounted(true);

    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase.auth]);

  if (!mounted) return null; // don't render on server

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    router.push("/"); // redirect after logout
  };

  if (!session) {
    // Show login/signup buttons
    return (
      <div className="flex gap-2">
        <button
          onClick={() => router.push("/auth/login")}
          className="px-4 py-2 rounded-full border-2 border-orange-400 text-orange-400 font-medium hover:bg-orange-400 hover:text-white hover:shadow-lg transition-all"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/auth/sign-up")}
          className="px-4 py-2 rounded-full border-2 border-orange-400 text-orange-400 font-medium hover:bg-orange-400 hover:text-white hover:shadow-lg transition-all"
        >
          Sign Up
        </button>
      </div>
    );
  }

  // Logged in: derive initials
  const initials = (() => {
    const email = session.user?.email || "";
    if (!email) return "U";
    return email
      .split("@")[0] // take the part before @
      .split(".") // split by dot if email has first.last
      .map((part: string) => part[0].toUpperCase())
      .join("");
  })();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => router.push("/dashboard")}
        className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white flex items-center justify-center font-bold shadow-lg hover:scale-105 transition-transform"
      >
        {initials}
      </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-full border-2 border-red-400 text-red-400 font-medium hover:bg-red-400 hover:text-white hover:shadow-lg transition-all"
      >
        Logout
      </button>
    </div>
  );
}
