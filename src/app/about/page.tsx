"use client";

import {motion} from "framer-motion";

export default function AboutPage() {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      
      {/* Hero Section - The Hook */}
      <header className="py-16 px-8 text-center bg-gradient-to-br from-orange-100 to-yellow-50">
        <h1
          className="text-6xl font-extrabold mb-4 
            bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500 
            bg-clip-text text-transparent tracking-tight"
        >
          Ready to Ignite Your Health?
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We exist to help you move past the &#34;takeout trap&#34; and into the powerful solution of cooking for
            yourself.
          Flame On is your command center for healthy, homemade nutrition.
        </p>
      </header>

      {/* Main Content - The Story & Solution */}
      <main className="flex-grow flex flex-col items-center justify-start p-8 md:p-12 lg:p-16 space-y-16">
        
        {/* Problem Section */}
        <motion.section
          className="max-w-4xl w-full mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold mb-4 text-red-600 text-center">
            The Takeout Trap is Real
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center">
              You know the drill: Exhaustion hits, the motivation to cook vanishes, and suddenly, you&#39;ve spent
              $50 on food that leaves you feeling sluggish and guilty. It&#39;s not a lack of desire—it&#39;s a lack of
              a clear,
            supported plan for your busy life.
          </p>
          <div className="flex justify-center space-x-8 text-2xl text-orange-500 font-semibold">
            <p>💸 Expensive</p>
            <p>🛋️ Unhealthy</p>
            <p>🤯 Overwhelming</p>
          </div>
        </motion.section>

        {/* Value Proposition Section */}
        <motion.section
          className="max-w-5xl w-full mb-12 py-10 rounded-xl shadow-xl border border-orange-200 bg-yellow-50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          <h2
            className="text-4xl font-bold mb-8 text-center 
              bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
          >
            Our Mission: Ignite Your Inner Chef
          </h2>
          <div className="grid md:grid-cols-3 gap-8 px-6">
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-orange-500">
              <h3 className="text-2xl font-semibold mb-3 text-orange-500">
                1. The Blueprint
              </h3>
              <p className="text-gray-700">
                Simple, flavorful recipes that fit your specific dietary needs and busy schedule. We eliminate the guesswork so you can confidently create wholesome meals.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-red-600">
              <h3 className="text-2xl font-semibold mb-3 text-red-600">
                2. The Fuel Gauge
              </h3>
              <p className="text-gray-700">
                Our integrated tools make it easy to monitor your nutrition for every meal. Track your macros and calories without the complexity of traditional food logging.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border-t-4 border-yellow-500">
              <h3 className="text-2xl font-semibold mb-3 text-yellow-500">
                3. The Mentor
              </h3>
              <p className="text-gray-700">
                Get paired with a professional AI assistant who reviews your progress, offers tailored tips, and provides the personal guidance you need to achieve sustainable results.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="max-w-2xl w-full text-center mt-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Ready to Feel the Energy of Control?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Stop settling for takeout. Start cooking food that makes you feel amazing.
          </p>
          <a
            href="/"
            className="inline-block px-12 py-4 text-xl font-bold text-white uppercase rounded-full shadow-lg transition duration-300 
               bg-red-600 hover:bg-red-700 transform hover:scale-105"
          >
            Turn Your Flame On!
          </a>
        </motion.section>
      </main>
    </div>
  );
}
