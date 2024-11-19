export interface SentimentResult {
  score: number;
  intensity: 'strong' | 'moderate' | 'mild' | 'neutral';
  sentiment: 'positive' | 'negative' | 'neutral';
  emoji: string;
  color: string;
  details: {
    positiveWords: string[];
    negativeWords: string[];
    suggestions: string[];
  };
}