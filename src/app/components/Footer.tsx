import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white border-t border-orange-200 bg-[#c74956] flex flex-col items-center justify-center text-center">
      
      {/* Social Media Icons */}
      <div className="flex justify-center gap-6 mt-4">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-200 transition-colors"
        >
          <Instagram size={38} />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-200 transition-colors"
        >
          <Youtube size={38} />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M18.244 2H21.5l-7.5 8.571L22 22h-6.244l-4.756-5.758L6.244 22H3l7.839-8.951L2 2h6.244l4.244 5.171L18.244 2z" />
          </svg>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-orange-200 transition-colors"
        >
          <Facebook size={38} />
        </a>
      </div>

      {/* Navbar Links */}
      <nav className="flex flex-wrap justify-center gap-10 mt-4 text-lg font-medium">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/recipes" className="hover:underline">
          Recipes
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
        <Link href="/contact" className="hover:underline">
          Contact
        </Link>
      </nav>

      {/* Main Footer Text */}
      <div className="py-5 text-sm">
        © {new Date().getFullYear()} Flame On — Perfect your cook every time 🔥
      </div>
    </footer>
  );
}
