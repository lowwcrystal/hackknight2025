export default function NavBar() {
    return (
        <nav
            className="w-full bg-white/80 backdrop-blur-md border-b border-orange-300 flex justify-between items-center px-8 py-4 sticky top-0 z-50">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                Flame On
            </h1>
            <ul className="flex gap-8 text-orange-700">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Home</a></li>
                <li><a href="#upload" className="hover:text-orange-500 transition-colors">Upload</a></li>
                <li><a href="#profile" className="hover:text-orange-500 transition-colors">Profile</a></li>
            </ul>
        </nav>
    );
}