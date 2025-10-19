"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TeamPage() {
  const team = [
    {
      name: "Crystal Low",
      role: "Software Engineer",
      photo: "/linkedin's/275f99923b080b18e7b474ed6155a17f.jpg",
      qr: "/linkedin's/46CB69BC-4B0C-4628-BB59-F1C68DD3EC1C.png",
    },
    {
      name: "William M.",
      role: "Software Engineer",
      photo: "/linkedin's/275f99923b080b18e7b474ed6155a17f.jpg",
      // ❌ No LinkedIn QR
    },
    {
      name: "Animesh Nath",
      role: "Software Engineer",
      photo: "/linkedin's/1724500175677.jpg",
      qr: "/linkedin's/3321AA9E-A4DE-45C5-86CB-C514E3E6AEFB.png",
    },
    {
      name: "Munisa Ilhomova",
      role: "Software Engineer",
      photo: "/linkedin's/1739657305899 (1).jpg",
      qr: "/linkedin's/07892498-E661-4727-BEA2-D033C32BBCB3.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex flex-col items-center py-16 px-6 text-gray-800">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-6 text-center 
                   bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500 
                   bg-clip-text text-transparent"
      >
        Meet the Team
      </motion.h1>

      <p className="text-lg text-gray-600 max-w-2xl text-center mb-12">
        Get to know the passionate innovators behind Flame On — the creators who bring
        flavor, technology, and creativity together to make home cooking powerful and personal.
      </p>

      {/* Team Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl w-full">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow 
                       flex flex-col items-center text-center p-6 border-t-4 border-orange-400"
          >
            {/* Profile Photo */}
            <div className="w-32 h-32 mb-4 rounded-full bg-gray-200 overflow-hidden border-4 border-orange-200">
              <Image
                src={member.photo}
                alt={member.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>

            <h3 className="text-2xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-orange-600 font-medium mb-3">{member.role}</p>

            <p className="text-sm text-gray-500 mb-4">
              Passionate about empowering creativity and healthy living.
            </p>

            {/* LinkedIn QR Code (only if available) */}
            {member.qr && (
              <>
                <div className="w-24 h-24 mt-auto rounded-xl bg-gray-100 overflow-hidden border border-gray-300">
                  <Image
                    src={member.qr}
                    alt={`${member.name}'s LinkedIn QR`}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Scan to connect</p>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Back Button */}
      <motion.a
        href="/"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-16 inline-block bg-red-600 text-white text-lg font-semibold 
                   px-10 py-3 rounded-full shadow-md hover:bg-red-700 hover:scale-105 
                   transition-transform duration-300"
      >
        ← Back to Home
      </motion.a>
    </div>
  );
}
