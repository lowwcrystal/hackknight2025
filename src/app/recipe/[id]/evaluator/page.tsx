"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const recipeId = params.id as string;
  
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<RecipeStep | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [currentAttempt, setCurrentAttempt] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
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
      checkUserAndAttempts();
    }
  }, [recipeId, fetchRecipeSteps]);

  const checkUserAndAttempts = useCallback(async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
        // Check for existing attempts
        const response = await fetch(`/api/recipe-attempts?recipe_id=${recipeId}&user_id=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          const inProgressAttempt = data.attempts.find((attempt: any) => attempt.status === 'in_progress');
          if (inProgressAttempt) {
            setCurrentAttempt(inProgressAttempt);
          }
        }
      }
    } catch (err) {
      console.error('Error checking user and attempts:', err);
    }
  }, [recipeId]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        
        // If user is logged in and no current attempt exists, create a new attempt
        if (user && !currentAttempt) {
          try {
            const response = await fetch('/api/recipe-attempts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: user.id,
                recipe_id: recipeId,
                status: 'in_progress'
              }),
            });
            
            if (response.ok) {
              const data = await response.json();
              setCurrentAttempt(data.attempt);
            }
          } catch (err) {
            console.error('Error creating attempt:', err);
          }
        }
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
    if (!selectedStep || !uploadedImage) {
      return;
    }

    setEvaluating(true);
    try {
      // First, evaluate the step with AI
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

      // Mark this step as completed (no database saving for anonymous users)
      setCompletedSteps(prev => new Set([...prev, selectedStep.id]));
      
      // Check if all steps are completed
      const allStepsCompleted = steps.every(step => 
        completedSteps.has(step.id) || step.id === selectedStep.id
      );
      
      if (allStepsCompleted) {
        // Mark attempt as completed if user is logged in
        if (user && currentAttempt) {
          try {
            await fetch('/api/recipe-attempts', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: currentAttempt.id,
                status: 'completed'
              }),
            });
          } catch (err) {
            console.error('Error completing attempt:', err);
          }
        }
        
        // Show completion message and redirect to dashboard
        alert('🎉 Congratulations! You have completed the entire recipe!');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
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
        completedSteps={completedSteps}
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
