import Image from "next/image";

interface RecipeProps {
  id: string;
  title: string;
  imageUrl?: string | null;
}

export default function Recipe({ id, title, imageUrl }: RecipeProps) {
  return (
    <a
      href={`/recipe/${id}`}
      className="rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
    >
      {/* Header */}
      <div className="p-4 bg-[#fba226ff]">
        <h4 className="font-semibold text-lg text-white textgray-800">{title}</h4>
      </div>

      {/* Image section fills remaining space */}
      <div className="relative w-full h-32">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill style={{objectFit: "cover"}}/> 
          ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
    </a>
  );
}
