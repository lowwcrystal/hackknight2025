import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const runtime = "nodejs";

interface SaveStepImageRequest {
  step_id: number;
  image_url: string;
  ai_response: any;
  accuracy: number;
  user_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const { step_id, image_url, ai_response, accuracy, user_id }: SaveStepImageRequest = await req.json();

    if (!step_id || !image_url || !ai_response || accuracy === undefined || !user_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Insert the step image with AI response
    const { data, error } = await supabase
      .from('step_images')
      .insert([
        {
          step_id,
          image_url,
          ai_response: JSON.stringify(ai_response),
          accuracy,
          user_id
        }
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error inserting step image:', error);
      return NextResponse.json({ error: "Failed to save step image" }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      step_image_id: data.id 
    });

  } catch (error: unknown) {
    console.error("Error saving step image:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
