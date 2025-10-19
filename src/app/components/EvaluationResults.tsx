"use client";

interface EvaluationResult {
  is_food: boolean;
  label: "raw" | "undercooked" | "cooked" | "overcooked" | "uncertain" | "not_food";
  quality_issues?: string[];
  alignment_score: number;
  alignment_notes?: string;
  confidence: number;
  advice?: string;
}

interface EvaluationResultsProps {
  evaluation: EvaluationResult | null;
}

export default function EvaluationResults({ evaluation }: EvaluationResultsProps) {
  const getLabelColor = (label: string) => {
    switch (label) {
      case 'raw': return 'bg-red-100 text-red-800';
      case 'undercooked': return 'bg-orange-100 text-orange-800';
      case 'cooked': return 'bg-green-100 text-green-800';
      case 'overcooked': return 'bg-red-100 text-red-800';
      case 'uncertain': return 'bg-yellow-100 text-yellow-800';
      case 'not_food': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!evaluation) return null;

  return (
    <div className="mt-6 p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-semibold mb-3">Evaluation Results</h3>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <span className={`px-2 py-1 rounded text-sm font-medium ${getLabelColor(evaluation.label)}`}>
            {evaluation.label.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium">Success:</span>
          <span className="text-sm">
            {Math.round(evaluation.alignment_score * 100)}%
          </span>
        </div>

        {evaluation.is_food === false && (
          <div className="p-2 bg-red-100 text-red-800 rounded text-sm">
            ⚠️ This doesn't appear to be food
          </div>
        )}

        {evaluation.quality_issues && evaluation.quality_issues.length > 0 && (
          <div>
            <span className="font-medium">Quality Issues:</span>
            <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
              {evaluation.quality_issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}

        {evaluation.advice && (
          <div>
            <span className="font-medium">Advice:</span>
            <p className="text-sm text-gray-600 mt-1">{evaluation.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
