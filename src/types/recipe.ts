export interface Recipe {
    name: string;
    description: string;
    calories: {
        total: number;
        protein: number;
        carbs: number;
        fat: number;
    }
    image_url: string;
    ingredients: string[];
    steps: string[];
}