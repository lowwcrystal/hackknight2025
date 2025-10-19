import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface RecipeAttempt {
  id?: number;
  user_id: string;
  recipe_id: string;
  attempt_number: number;
  status: 'in_progress' | 'completed' | 'abandoned';
  created_at?: string;
}

// GET - Fetch attempts for a specific recipe and user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get('recipe_id');
    const userId = searchParams.get('user_id');

    if (!recipeId || !userId) {
      return NextResponse.json({ error: "Missing recipe_id or user_id" }, { status: 400 });
    }

    const supabase = await createClient();
    
    console.log('Fetching attempts for recipe:', recipeId, 'user:', userId);
    
    const { data, error } = await supabase
      .from('recipe_attempts')
      .select('*')
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
      .order('attempt_number', { ascending: true });

    if (error) {
      console.error('Error fetching recipe attempts:', error);
      return NextResponse.json({ error: "Failed to fetch attempts", details: error.message }, { status: 500 });
    }

    console.log('Found attempts:', data);
    return NextResponse.json({ attempts: data || [] });

  } catch (error: unknown) {
    console.error("Error in GET recipe-attempts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - Create a new attempt
export async function POST(req: NextRequest) {
  try {
    const { user_id, recipe_id, status = 'in_progress' }: Partial<RecipeAttempt> = await req.json();

    if (!user_id || !recipe_id) {
      return NextResponse.json({ error: "Missing user_id or recipe_id" }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Get the next attempt number for this user and recipe
    const { data: existingAttempts, error: fetchError } = await supabase
      .from('recipe_attempts')
      .select('attempt_number')
      .eq('recipe_id', recipe_id)
      .eq('user_id', user_id)
      .order('attempt_number', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Error fetching existing attempts:', fetchError);
      return NextResponse.json({ error: "Failed to fetch existing attempts" }, { status: 500 });
    }

    const nextAttemptNumber = existingAttempts && existingAttempts.length > 0 
      ? existingAttempts[0].attempt_number + 1 
      : 1;

    // Create new attempt
    const { data, error } = await supabase
      .from('recipe_attempts')
      .insert([
        {
          user_id,
          recipe_id,
          attempt_number: nextAttemptNumber,
          status
        }
      ])
      .select('*')
      .single();

    if (error) {
      console.error('Error creating recipe attempt:', error);
      return NextResponse.json({ error: "Failed to create attempt" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      attempt: data 
    });

  } catch (error: unknown) {
    console.error("Error in POST recipe-attempts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT - Update an existing attempt
export async function PUT(req: NextRequest) {
  try {
    const { id, status }: Partial<RecipeAttempt> & { id: number } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('recipe_attempts')
      .update({ status })
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Error updating recipe attempt:', error);
      return NextResponse.json({ error: "Failed to update attempt" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      attempt: data 
    });

  } catch (error: unknown) {
    console.error("Error in PUT recipe-attempts:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
