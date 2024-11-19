import React from 'react';
import { Clock } from 'lucide-react';
import SentimentDetails from './SentimentDetails';

interface HistoryItem {
  text: string;
  sentiment: string;
  intensity: string;
  emoji: string;
  timestamp: Date;
  color: string;
  score: number;
  details: {
    positiveWords: string[];
    negativeWords: string[];
    suggestions: string[];
  };
}

interface SentimentHistoryProps {
  history: HistoryItem[];
}

export default function SentimentHistory({ history }: SentimentHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Analysis History
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 transition-all hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-gray-600 flex-1">{item.text}</p>
              <div className="ml-4 flex items-center gap-2">
                <span className={`font-medium ${item.color}`}>
                  {item.sentiment} {item.emoji}
                </span>
                <span className="text-xs text-gray-400">
                  {item.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <SentimentDetails
              score={item.score}
              intensity={item.intensity}
              positiveWords={item.details.positiveWords}
              negativeWords={item.details.negativeWords}
              suggestions={item.details.suggestions}
            />
          </div>
        ))}
      </div>
    </div>
  );
}