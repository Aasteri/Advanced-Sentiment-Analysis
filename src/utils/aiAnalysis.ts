import OpenAI from 'openai';
import { SentimentResult } from './types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeWithAI(text: string): Promise<SentimentResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a sentiment analysis expert. Analyze the following text and return a JSON object with the sentiment analysis results. Include score (-5 to 5), intensity (strong/moderate/mild/neutral), sentiment (positive/negative/neutral), and detailed feedback."
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.7,
      max_tokens: 200,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Transform AI response to match our format
    return {
      score: result.score || 0,
      intensity: result.intensity || 'neutral',
      sentiment: result.sentiment || 'neutral',
      emoji: getEmoji(result.score || 0),
      color: getColor(result.sentiment || 'neutral'),
      details: {
        positiveWords: result.positive_words || [],
        negativeWords: result.negative_words || [],
        suggestions: result.suggestions || []
      }
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('Failed to analyze with AI');
  }
}

function getEmoji(score: number): string {
  if (score > 3) return '😊';
  if (score > 1) return '🙂';
  if (score > 0) return '😌';
  if (score < -3) return '😔';
  if (score < -1) return '😕';
  if (score < 0) return '🙁';
  return '😐';
}

function getColor(sentiment: string): string {
  switch (sentiment) {
    case 'positive':
      return 'text-green-600';
    case 'negative':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}