import { sentimentLexicon } from './sentimentLexicon';
import { intensifiers } from './intensifiers';

interface SentimentResult {
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

// Sentiment weights for different word categories
const sentimentWeights = {
  strong: 2,
  moderate: 1.5,
  mild: 1
};

function getSuggestions(sentiment: string, intensity: string): string[] {
  const suggestions = {
    positive: {
      strong: [
        'Your message conveys powerful positivity!',
        'This tone is perfect for celebrations and major achievements.',
        'The enthusiasm in your message is contagious.',
        'Consider adding specific examples to reinforce this positive impact.'
      ],
      moderate: [
        'Your message has a good positive tone.',
        'Consider adding specific details to strengthen the impact.',
        'You could enhance this by highlighting key achievements.',
        'Try incorporating more descriptive positive words.'
      ],
      mild: [
        'Your message is mildly positive.',
        'Try using more descriptive positive words for stronger impact.',
        'Consider adding emotional context to strengthen the message.',
        'You could emphasize specific positive aspects more clearly.'
      ]
    },
    negative: {
      strong: [
        'Your message conveys intense negativity.',
        'Consider softening the tone for professional contexts.',
        'Try balancing criticism with constructive suggestions.',
        'Think about including potential solutions or improvements.'
      ],
      moderate: [
        'Your message has a negative tone.',
        'Consider adding balanced perspectives.',
        'Try focusing on specific issues rather than general complaints.',
        'Include potential solutions or improvements.'
      ],
      mild: [
        'Your message is mildly negative.',
        'Consider if this aligns with your intended tone.',
        'Try being more specific about concerns.',
        'You might want to add constructive suggestions.'
      ]
    },
    neutral: {
      neutral: [
        'Your message appears neutral in tone.',
        'Add emotional words if you want to convey specific sentiments.',
        'Consider using more descriptive language to convey your intent.',
        'Try incorporating specific examples or details.'
      ]
    }
  };

  return suggestions[sentiment as keyof typeof suggestions][intensity as keyof (typeof suggestions)['positive']] || [];
}

export function analyzeSentiment(text: string): SentimentResult {
  const words = text.toLowerCase().match(/\b(\w+)\b/g) || [];
  let score = 0;
  let intensifierCount = 0;
  const foundPositiveWords: string[] = [];
  const foundNegativeWords: string[] = [];

  // First pass: count intensifiers
  words.forEach((word, index) => {
    if (intensifiers.has(word)) {
      intensifierCount++;
      // Check next word for sentiment
      const nextWord = words[index + 1];
      if (nextWord) {
        for (const [intensity, wordSet] of Object.entries(sentimentLexicon.positive)) {
          if (wordSet.has(nextWord)) {
            score += sentimentWeights[intensity as keyof typeof sentimentWeights] * 0.5;
          }
        }
        for (const [intensity, wordSet] of Object.entries(sentimentLexicon.negative)) {
          if (wordSet.has(nextWord)) {
            score -= sentimentWeights[intensity as keyof typeof sentimentWeights] * 0.5;
          }
        }
      }
    }
  });

  // Second pass: analyze sentiment
  words.forEach(word => {
    for (const [intensity, wordSet] of Object.entries(sentimentLexicon.positive)) {
      if (wordSet.has(word)) {
        score += sentimentWeights[intensity as keyof typeof sentimentWeights];
        foundPositiveWords.push(word);
      }
    }
    for (const [intensity, wordSet] of Object.entries(sentimentLexicon.negative)) {
      if (wordSet.has(word)) {
        score -= sentimentWeights[intensity as keyof typeof sentimentWeights];
        foundNegativeWords.push(word);
      }
    }
  });

  // Apply intensifier bonus
  score *= (1 + (intensifierCount * 0.2));

  // Determine intensity based on score
  let intensity: SentimentResult['intensity'] = 'neutral';
  let sentiment: SentimentResult['sentiment'] = 'neutral';
  let emoji = '😐';
  let color = 'text-gray-600';

  if (score !== 0) {
    if (Math.abs(score) > 4) {
      intensity = 'strong';
    } else if (Math.abs(score) > 2) {
      intensity = 'moderate';
    } else {
      intensity = 'mild';
    }

    if (score > 0) {
      sentiment = 'positive';
      emoji = score > 4 ? '😊' : score > 2 ? '🙂' : '😌';
      color = 'text-green-600';
    } else {
      sentiment = 'negative';
      emoji = score < -4 ? '😔' : score < -2 ? '😕' : '🙁';
      color = 'text-red-600';
    }
  }

  return {
    score: Number(score.toFixed(2)),
    intensity,
    sentiment,
    emoji,
    color,
    details: {
      positiveWords: [...new Set(foundPositiveWords)],
      negativeWords: [...new Set(foundNegativeWords)],
      suggestions: getSuggestions(sentiment, intensity)
    }
  };
}