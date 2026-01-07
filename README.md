# 🔥 Flame On - AI-Powered Recipe Tracking App

A Next.js application that helps users generate, track, and evaluate their cooking attempts using AI-powered image analysis.

## ✨ Features

### 🍳 Recipe Generation
- **AI-Powered Recipe Creation**: Generate custom recipes based on ingredients and cuisine preferences
- **Step-by-Step Instructions**: Detailed cooking instructions with estimated times and equipment
- **Image Generation**: AI-generated recipe images for visual appeal

### 📸 Smart Cooking Evaluation
- **Image Analysis**: Upload photos of your cooking progress for AI evaluation
- **Real-time Feedback**: Get instant feedback on cooking quality, doneness, and technique
- **Step Validation**: AI validates each cooking step against the recipe instructions
- **Progress Tracking**: Visual indicators for completed steps

### 📊 Attempt Management
- **Multiple Attempts**: Track multiple attempts for the same recipe
- **Progress Tracking**: Monitor your cooking progress across different attempts
- **Completion Status**: Mark attempts as in-progress, completed, or abandoned
- **Dashboard View**: Centralized view of all your recipes and attempts

### 🔐 User Authentication
- **Secure Login/Signup**: User authentication with Supabase
- **Password Management**: Forgot password and password update functionality
- **User Profiles**: Personalized experience with user-specific data

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI Integration**: Google Gemini AI
- **Image Processing**: Base64 conversion, AI image analysis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackknight2025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

  

## 🔧 Key Features Implementation

### Recipe Attempt Tracking
- **Automatic Attempt Creation**: New attempts are created when users upload images
- **Progress Monitoring**: Track completion status of each attempt
- **Multiple Attempts**: Support for multiple attempts per recipe
- **Status Management**: In-progress, completed, and abandoned states

### AI-Powered Evaluation
- **Image Analysis**: Uses Google Gemini AI to analyze cooking photos
- **Quality Assessment**: Evaluates food doneness, quality issues, and technique
- **Step Validation**: Compares user progress against recipe instructions
- **Real-time Feedback**: Instant evaluation results with advice

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive UI**: Smooth animations with Framer Motion
- **Accessibility**: Built with Radix UI components
- **Real-time Updates**: Dynamic content updates without page refresh


## 🔌 API Endpoints

### Recipe Management
- `POST /api/generate-recipe` - Generate new recipes
- `GET /api/recipe-steps` - Get recipe steps
- `POST /api/validate-step` - Validate cooking steps with AI

### Attempt Tracking
- `GET /api/recipe-attempts` - Fetch user attempts
- `POST /api/recipe-attempts` - Create new attempt
- `PUT /api/recipe-attempts` - Update attempt status

### Image Processing
- `POST /api/save-step-image` - Save cooking progress images

## 🎨 UI Components

### Core Components
- **UserAttempts**: Displays user's cooking attempts with status indicators
- **RecipeSteps**: Shows recipe instructions with completion tracking
- **EvaluateButton**: Handles image upload and evaluation
- **EvaluationResults**: Displays AI analysis results



## 🔒 Security Features

- **Row Level Security**: Database-level access control
- **User Authentication**: Secure login with Supabase Auth
- **API Protection**: Authenticated endpoints
- **Data Isolation**: Users can only access their own data


## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Supabase** for backend services and authentication
- **Google AI** for image analysis capabilities
- **Next.js** for the React framework
- **Tailwind CSS** for styling
- **Radix UI** for accessible components

