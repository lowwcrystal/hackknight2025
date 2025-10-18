import Image from "next/image";
export default function Recipe() {
    return (
        <a
            key={1}  
            href={"/recipe"}  
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform block"
            >
                <div className="p-4">
                <h4 className="font-semibold text-lg text-gray-800">{"Pizza"}</h4> {/* input recipe name from data base*/}
                </div>
            <div className="relative w-full h-32">
                <Image
                src={"/popular_recipes/rata.jpg"} 
                alt={"/popular_recipes/rata.jpg"}
                fill
                style={{ objectFit: "cover" }}
                />
            </div>
            </a>
    );
}