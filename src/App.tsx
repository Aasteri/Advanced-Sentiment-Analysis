import React, { useState, useCallback } from 'react';
import { MessageSquare, Send, Trash2, Brain, Database } from 'lucide-react';
import { analyzeSentiment } from './utils/sentimentAnalysis';
import { analyzeWithAI } from './utils/aiAnalysis';
import SentimentHistory from './components/SentimentHistory';
import type { SentimentResult } from './utils/types';

interface HistoryItem extends SentimentResult {
  text: string;
  timestamp: Date;
}

function App() {
  const [text, setText] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisMode, setAnalysisMode] = useState<'system' | 'ai'>('system');
  const [error, setError] = useState<string | null>(null);

  const analyzeText = useCallback(async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = analysisMode === 'ai' 
        ? await analyzeWithAI(text)
        : analyzeSentiment(text);

      const historyItem = {
        ...result,
        text,
        timestamp: new Date()
      };

      setHistory(prev => [historyItem, ...prev]);
      setText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, [text, analysisMode]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeText();
    }
  };

  const clearHistory = () => setHistory([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
              <MessageSquare className="w-8 h-8 text-indigo-600" />
              Advanced Sentiment Analysis
            </h1>
            <p className="text-gray-600">
              Analyze the emotional tone and intensity of your social media content
            </p>
          </div>

          {/* Analysis Mode Toggle */}
          <div className="mb-4 flex justify-center gap-2">
            <button
              onClick={() => setAnalysisMode('system')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                analysisMode === 'system'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <Database className="w-4 h-4" />
              System
            </button>
            <button
              onClick={() => setAnalysisMode('ai')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                analysisMode === 'ai'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <Brain className="w-4 h-4" />
              AI-Powered
            </button>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your text here..."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                disabled={isAnalyzing}
              />
              <button
                onClick={analyzeText}
                disabled={!text.trim() || isAnalyzing}
                className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Analyze
                  </>
                )}
              </button>
            </div>
            {error && (
              <div className="mt-2 text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* History Section */}
          {history.length > 0 && (
            <div className="relative">
              <button
                onClick={clearHistory}
                className="absolute -top-2 right-0 text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Clear History
              </button>
              <SentimentHistory history={history} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;