import React from 'react';
import { ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';

interface SentimentDetailsProps {
  score: number;
  intensity: string;
  positiveWords: string[];
  negativeWords: string[];
  suggestions: string[];
}

export default function SentimentDetails({
  score,
  intensity,
  positiveWords,
  negativeWords,
  suggestions
}: SentimentDetailsProps) {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">
          Intensity: <span className="font-medium">{intensity}</span>
        </span>
        <span className="text-gray-600">
          Score: <span className="font-medium">{score}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {positiveWords.length > 0 && (
          <div className="bg-green-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-700 font-medium mb-2">
              <ThumbsUp className="w-4 h-4" />
              Positive Words
            </div>
            <div className="flex flex-wrap gap-2">
              {positiveWords.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}

        {negativeWords.length > 0 && (
          <div className="bg-red-50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
              <ThumbsDown className="w-4 h-4" />
              Negative Words
            </div>
            <div className="flex flex-wrap gap-2">
              {negativeWords.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {suggestions.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-700 font-medium mb-2">
            <Lightbulb className="w-4 h-4" />
            Suggestions
          </div>
          <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}