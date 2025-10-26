
import React, { useState } from 'react';
import { generateExamQuestions } from '../services/geminiService';
import { GeneratedQuestion } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface TeacherViewProps {
  onBack: () => void;
}

const TeacherView: React.FC<TeacherViewProps> = ({ onBack }) => {
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      setError('Please enter a topic.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedQuestions([]);
    try {
      const questions = await generateExamQuestions(topic, numQuestions, questionType);
      setGeneratedQuestions(questions);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition mb-4">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Exam Question Generator</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Powered by Gemini</p>
      </header>
      
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg mb-8">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="md:col-span-2">
            <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Topic</label>
            <input type="text" id="topic" value={topic} onChange={e => setTopic(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-slate-700" placeholder="e.g., React Hooks" />
          </div>
          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-700 dark:text-slate-300"># of Questions</label>
            <input type="number" id="numQuestions" value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} min="1" max="10" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-slate-700" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex justify-center items-center h-10">
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Generate'}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Generated Questions</h2>
        {isLoading && <p className="text-center text-slate-500">Generating, please wait...</p>}
        {generatedQuestions.length > 0 && (
          <div className="space-y-4">
            {generatedQuestions.map((q, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow">
                <p className="font-semibold mb-2">{index + 1}. {q.questionText}</p>
                {q.options && q.options.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    {q.options.map((opt, i) => (
                      <li key={i} className={opt === q.correctAnswer ? 'text-green-600 dark:text-green-400 font-medium' : 'text-slate-600 dark:text-slate-300'}>
                        {opt} {opt === q.correctAnswer && '(Correct)'}
                      </li>
                    ))}
                  </ul>
                )}
                 {(!q.options || q.options.length === 0) && (
                    <p className="text-green-600 dark:text-green-400 font-medium mt-2">Correct Answer: {q.correctAnswer}</p>
                 )}
              </div>
            ))}
             <div className="text-center mt-6">
                 <button className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700">Save Questions</button>
                 <p className="text-xs text-slate-500 mt-2">(This is a demo and does not save)</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherView;
