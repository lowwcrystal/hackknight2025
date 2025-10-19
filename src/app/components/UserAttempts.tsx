"use client";

import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import Link from "next/link";

interface Attempt {
  id: number;
  user_id: string;
  recipe_id: string;
  attempt_number: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  created_at: string;
}

interface UserAttemptsProps {
  recipeId: string;
}

export default function UserAttempts({ recipeId }: UserAttemptsProps) {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndAttempts = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          setUser(user);
          console.log('Fetching attempts for user:', user.id, 'recipe:', recipeId);
          
          // Fetch attempts for this recipe and user
          const response = await fetch(`/api/recipe-attempts?recipe_id=${recipeId}&user_id=${user.id}`);
          console.log('Response status:', response.status);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Attempts data:', data);
            setAttempts(data.attempts || []);
          } else {
            const errorData = await response.json();
            console.error('API error:', errorData);
          }
        }
      } catch (err) {
        console.error('Error fetching user and attempts:', err);
      } finally {
        setLoading(false);
        }
    };

    fetchUserAndAttempts();
  }, [recipeId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'abandoned':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'abandoned':
        return 'Abandoned';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <h4 className="text-5xl font-bold mb-5 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
          Your Attempts
        </h4>
        <div className="text-center py-4">Loading attempts...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4">
      </div>
    );
  }

  return (
    <div className="p-4">
      <h4 className="text-5xl font-bold mb-5 bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
        Your Attempts
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
        {/* Display existing attempts */}
        {attempts.map((attempt) => (
          <Link
            key={attempt.id}
            href={`/recipe/${recipeId}/evaluator`}
            className="bg-gradient-to-b from-yellow-100 to-orange-50 rounded-xl shadow-md border border-orange-200 p-4 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="text-center">
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${getStatusColor(attempt.status)}`}></div>
              <div className="text-sm font-semibold text-gray-800">
                Attempt #{attempt.attempt_number}
              </div>
              <div className="text-xs text-gray-600">
                {getStatusText(attempt.status)}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(attempt.created_at).toLocaleDateString()}
              </div>
            </div>
          </Link>
        ))}
        
        {/* Add new attempt button */}
        <Link
          href={`/recipe/${recipeId}/evaluator`}
          className="bg-gradient-to-b from-yellow-100 to-orange-50 rounded-xl shadow-md border border-orange-200 p-0 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="bg-orange-500 text-white text-lg font-semibold py-25 text-center">
            +
          </div>
        </Link>
      </div>
    </div>
  );
}
