"use client";

import Image from "next/image";
import { useState } from "react";
import "./globals.css"; // your existing styles
import * as Tabs from "@radix-ui/react-tabs";

export default function Home() {
  const [food, setFood] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo || !food) {
      alert("Please upload a photo and enter what food it is!");
      return;
    }
    alert(`Checking how cooked your ${food} is... 🔥`);
  };

  // ✅ Tabs test
  const TabsDemo = () => {
    return (
      <Tabs.Root defaultValue="tab1" className="bg-black/40 p-4 rounded-lg w-[300px] text-white">
        <Tabs.List className="flex gap-2 mb-4 border-b border-orange-500/50">
          <Tabs.Trigger value="tab1" className="py-1 px-3 hover:bg-orange-500/30 rounded">
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger value="tab2" className="py-1 px-3 hover:bg-orange-500/30 rounded">
            Tab 2
          </Tabs.Trigger>
          <Tabs.Trigger value="tab3" className="py-1 px-3 hover:bg-orange-500/30 rounded">
            Tab 3
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
        <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
        <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
      </Tabs.Root>
    );
  };

  return (
    <div className="font-sans text-white bg-gradient-to-b from-[#2b0000] via-[#3f1300] to-[#1a0000] min-h-screen p-0 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-black/30 backdrop-blur-md border-b border-orange-500/50 flex justify-between items-center px-8 py-4 sticky top-0 z-50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
          Flame On
        </h1>
        <ul className="flex gap-8 text-orange-200">
          <li><a href="#" className="hover:text-orange-400 transition-colors">Home</a></li>
          <li><a href="#upload" className="hover:text-orange-400 transition-colors">Upload</a></li>
          <li><a href="#profile" className="hover:text-orange-400 transition-colors">Profile</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
          Check How Cooked Your Meat Is
        </h2>
        <p className="text-orange-200 mb-8 max-w-xl">
          Upload a photo of your dish, tell us what it is, and let Flame On
          analyze how cooked it looks — from rare to well-done. 🍖
        </p>

        {/* Radix Tabs Test! */}
        <TabsDemo />

        <form
          onSubmit={handleSubmit}
          className="bg-black/40 p-8 rounded-2xl shadow-lg border border-orange-500/40 flex flex-col gap-6 w-full max-w-md mt-10"
          id="upload"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="photo" className="text-lg font-semibold text-orange-300">
              Upload a photo of your food
            </label>
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="bg-black/60 border border-orange-500/50 rounded p-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-orange-600 file:text-white hover:file:bg-orange-500 cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="food" className="text-lg font-semibold text-orange-300">
              What are you cooking?
            </label>
            <input
              id="food"
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              placeholder="e.g. Ribeye steak"
              className="bg-black/60 border border-orange-500/50 rounded p-2 text-white placeholder-orange-300/70 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-black font-bold py-2 rounded-full mt-4 hover:scale-105 hover:brightness-110 transition-transform shadow-[0_0_10px_rgba(255,100,0,0.6)]"
          >
            🔥 Check Cook Level
          </button>
        </form>
      </main>

      {/* 👤 Profile Section Placeholder */}
      <section id="profile" className="bg-black/30 py-8 text-center border-t border-orange-500/50">
        <h3 className="text-2xl font-bold text-orange-400 mb-2">Your Profile</h3>
        <p className="text-orange-200">Coming soon — track your cooking uploads and progress!</p>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-orange-300 border-t border-orange-500/30 bg-black/40">
        © {new Date().getFullYear()} Flame On — Perfect your cook every time 🔥
      </footer>
    </div>
  );
}
