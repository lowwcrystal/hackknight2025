"use client";

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

interface RecipeStepsProps {
  steps: RecipeStep[];
  selectedStep: RecipeStep | null;
  onStepSelect: (step: RecipeStep) => void;
}

export default function RecipeSteps({ steps, selectedStep, onStepSelect }: RecipeStepsProps) {
  return (
    <div className="w-full lg:w-1/2 bg-orange-50 p-6">
      <h1 className="text-2xl font-bold text-orange-600 mb-6">Recipe Steps</h1>
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedStep?.id === step.id
                ? 'border-orange-500 bg-orange-100'
                : 'border-gray-200 bg-white hover:border-orange-300'
            }`}
            onClick={() => onStepSelect(step)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
                    Step {step.step_number}
                  </span>
                  {step.image_required && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Image Required
                    </span>
                  )}
                </div>
                <p className="text-gray-700">{step.instruction}</p>
                {step.estimated_time_minutes && (
                  <p className="text-sm text-gray-500 mt-2">
                    ⏱️ {step.estimated_time_minutes} minutes
                  </p>
                )}
                {step.equipment && step.equipment.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    🍳 {step.equipment.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
