"use client";

import Image from "next/image";

interface RecipeStep {
  id: number;
  recipe_id: number;
  step_number: number;
  instruction: string;
  image_required: boolean;
  estimated_time_minutes?: number;
  temperature?: string;
  equipment?: string[];
}

interface EvaluateButtonProps {
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEvaluateStep: () => void;
  uploadedImage: string | null;
  evaluating: boolean;
  selectedStep: RecipeStep | null;
  fileInputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function EvaluateButton({ 
  onImageUpload, 
  onEvaluateStep, 
  uploadedImage, 
  evaluating, 
  selectedStep,
  fileInputRef
}: EvaluateButtonProps) {
  return (
    <>
      {selectedStep ? (
        <div>
          <h2 className="text-xl font-bold text-yellow-600 mb-4">
            Step {selectedStep.step_number}: {selectedStep.instruction}
          </h2>
          
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image for This Step
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            
            {uploadedImage && (
              <div className="mt-4">
                <Image
                  src={uploadedImage}
                  alt="Uploaded step"
                  width={400}
                  height={256}
                  className="max-w-full h-64 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Evaluate Button */}
          <button
            onClick={onEvaluateStep}
            disabled={!uploadedImage || evaluating}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {evaluating ? 'Evaluating...' : 'Evaluate Step'}
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-bold text-yellow-600 mb-4">Select a Step</h2>
          <p>Click on a recipe step from the left to start evaluating.</p>
        </div>
      )}
    </>
  );
}
