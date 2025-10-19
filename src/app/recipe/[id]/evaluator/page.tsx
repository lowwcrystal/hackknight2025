"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import RecipeSteps from "@/app/components/RecipeSteps";
import EvaluateButton from "@/app/components/EvaluateButton";
import EvaluationResults from "@/app/components/EvaluationResults";

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

interface EvaluationResult {
  is_food: boolean;
  label: "raw" | "undercooked" | "cooked" | "overcooked" | "uncertain" | "not_food";
  quality_issues?: string[];
  alignment_score: number;
  alignment_notes?: string;
  confidence: number;
  advice?: string;
}

export default function EvaluatorPage() {
  const params = useParams();
  const recipeId = params.id as string;
  
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<RecipeStep | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchRecipeSteps = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('recipe_steps')
        .select('*')
        .eq('recipe_id', recipeId)
        .order('step_number');

      if (error) {
        setError('Failed to fetch recipe steps');
        console.error('Error fetching steps:', error);
      } else {
        setSteps(data || []);
      }
    } catch (err) {
      setError('Failed to fetch recipe steps');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    if (recipeId) {
      fetchRecipeSteps();
    }
  }, [recipeId, fetchRecipeSteps]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStepSelect = (step: RecipeStep) => {
    setSelectedStep(step);
    setUploadedImage(null);
    setEvaluation(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleEvaluateStep = async () => {
    if (!selectedStep || !uploadedImage) return;

    setEvaluating(true);
    try {
      const response = await fetch('/api/validate-step', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userImageUrl: uploadedImage,
          stepText: selectedStep.instruction,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate step');
      }

      const data = await response.json();
      setEvaluation(data.result);
    } catch (err) {
      console.error('Error evaluating step:', err);
      setError('Failed to evaluate step');
    } finally {
      setEvaluating(false);
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading recipe steps...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!recipeId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">No recipe ID provided</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <RecipeSteps 
        steps={steps} 
        selectedStep={selectedStep} 
        onStepSelect={handleStepSelect} 
      />
      
      <div className="w-full lg:w-1/2 bg-yellow-50 p-6">
        <EvaluateButton
          onImageUpload={handleImageUpload}
          onEvaluateStep={handleEvaluateStep}
          uploadedImage={uploadedImage}
          evaluating={evaluating}
          selectedStep={selectedStep}
          fileInputRef={fileInputRef}
        />
        
        <EvaluationResults evaluation={evaluation} />
      </div>
    </div>
  );
}
