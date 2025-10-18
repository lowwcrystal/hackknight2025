"use client";

import {useState} from "react";
import Image from "next/image";
import "./globals.css";
import * as Tabs from "@radix-ui/react-tabs";
import NavBar from "./components/NavBar";

export default function Home() {
    const [meat, setMeat] = useState("");
  const [veggies, setVeggies] = useState("");
  const [cuisine, setCuisine] = useState("");

  // Popular recipes with images and links
  const popularRecipes = [
    {
      name: "Spaghetti Carbonara",
      meat: "Pork",
      veggies: "None",
      cuisine: "Italian",
      image: "/popular_recipes/carbonara-recipe-1-1200px.jpg",
      link: "https://www.recipesfromitaly.com/spaghetti-carbonara-original-recipe/"
    },
    {
      name: "General Tso's Chicken",
      meat: "Chicken",
      veggies: "Broccoli",
      cuisine: "Chinese",
      image: "/popular_recipes/General-Tsos-Chicken-4-1024x1536.jpg",
      link: "https://natashaskitchen.com/general-tsos-chicken/"
    },
    {
      name: "Pad Thai",
      meat: "Shrimp",
      veggies: "Bean Sprouts",
      cuisine: "Thai",
      image: "/popular_recipes/pad_thai.jpg",
      link: "https://www.gimmesomeoven.com/pad-thai/"
    },
    {
      name: "Beef Tacos",
      meat: "Beef",
      veggies: "Lettuce, Tomato",
      cuisine: "Mexican",
      image: "/popular_recipes/taco-recipe-13-1.webp",
      link: "https://kristineskitchenblog.com/ground-beef-tacos/"
    },
    {
      name: "Ratatouille",
      meat: "None",
      veggies: "Eggplant, Zucchini, Tomato",
      cuisine: "French",
      image: "/popular_recipes/rata.jpg",
      link: "https://tasty.co/recipe/ratatouille"
    },
    {
      name: "Chicken Tikka Masala",
      meat: "Chicken",
      veggies: "Onion, Bell Pepper",
      cuisine: "Indian",
      image: "/popular_recipes/chicken tikka.jpg",
      link: "https://cafedelites.com/chicken-tikka-masala/"
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meat || !veggies || !cuisine) {
      alert("Please fill in all fields!");
      return;
        }
    alert(`Analyzing your ${cuisine} dish with ${meat} and ${veggies}... 🍽️`);
  };

  const TabsDemo = () => (
    <Tabs.Root defaultValue="tab1"
            className="bg-white p-4 rounded-lg w-[300px] text-black shadow-md">
            <Tabs.List className="flex gap-2 mb-4 border-b border-orange-300">
        <Tabs.Trigger value="tab1" className="py-1 px-3 hover:bg-orange-100 rounded">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2" className="py-1 px-3 hover:bg-orange-100 rounded">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3" className="py-1 px-3 hover:bg-orange-100 rounded">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
      <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
      <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
    </Tabs.Root>
  );

  return (
    <div className="font-sans text-black bg-gradient-to-b from-white via-orange-50 to-white min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          Check How Cooked Your Dish Is
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl">
          Tell us what’s in your dish, and Flame On will analyze how cooked it should be — meat, veggies, and all! 🍽️
        </p>

        {/* Popular Recipes Section */}
        <section className="w-full max-w-6xl mb-10">
          <h3 className="text-left text-2xl font-bold text-orange-500 mb-4">Popular Recipes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularRecipes.map((recipe, idx) => (
              <a
                key={idx}
                href={recipe.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform block"
              >
                <div className="relative w-full h-32">
                  <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-gray-800">{recipe.name}</h4>
                  <p className="text-sm text-gray-600">{recipe.cuisine} | {recipe.meat} | {recipe.veggies}</p>
                </div>
              </a>
                        ))}
          </div>
        </section>

        {/* Radix Tabs Test */}
        <TabsDemo />

        {/* 3-textbox Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg border border-orange-200 flex flex-col gap-6 w-full max-w-md mt-10"
          id="upload"
        >
          <div className="flex flex-col gap-2">
                        <label htmlFor="meat" className="text-lg font-semibold text-orange-600">Type of Meat</label>
                        <input
              id="meat"
              type="text"
              value={meat}
              onChange={(e) => setMeat(e.target.value)}
              placeholder="Chicken, Beef, Pork..."
              className="bg-white border border-orange-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

                    <div className="flex flex-col gap-2">
            <label htmlFor="veggies" className="text-lg font-semibold text-orange-600">Type of Vegetables</label>
            <input
              id="veggies"
              type="text"
              value={veggies}
              onChange={(e) => setVeggies(e.target.value)}
              placeholder="Broccoli, Carrots, Spinach..."
              className="bg-white border border-orange-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

                    <div className="flex flex-col gap-2">
            <label htmlFor="cuisine" className="text-lg font-semibold text-orange-600">Cuisine Type</label>
            <input
              id="cuisine"
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Chinese, Italian, Vietnamese..."
              className="bg-white border border-orange-300 rounded p-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 text-white font-bold py-2 rounded-full mt-4 hover:scale-105 hover:brightness-110 transition-transform shadow-[0_0_10px_rgba(255,150,0,0.4)]"
                    >
            🔥 Submit
          </button>
        </form>
      </main>
      
      
      
        </div>
    );
}
