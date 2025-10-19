export default function EvaluatorPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 bg-orange-100 flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">Left Side</h1>
          <p className="text-gray-700">
            Add your content, images, or text here.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 bg-yellow-100 flex items-center justify-center p-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-600 mb-4">Right Side</h1>
          <p className="text-gray-700">
            This could hold a form, dashboard, or anything else.
          </p>
        </div>
      </div>
    </div>
  );
}
