
import React, { useState } from 'react';
import { Course, Exam, QuestionType } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface ExamViewProps {
  course: Course;
  exam: Exam;
  onBack: () => void;
}

const ExamView: React.FC<ExamViewProps> = ({ course, exam, onBack }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit answers to a server.
    alert('Exam submitted successfully!');
    onBack();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition mb-4">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back to Course
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{exam.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{course.id}: {course.name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Duration: {exam.durationMinutes} minutes</p>
      </header>

      <div className="space-y-8">
        {exam.questions.map((question, index) => (
          <div key={question.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
            <p className="font-semibold text-lg mb-4">Question {index + 1}: {question.text}</p>
            {question.type === QuestionType.MultipleChoice && question.options && (
              <div className="space-y-3">
                {question.options.map(option => (
                  <label key={option} className="flex items-center p-3 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value={option}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-slate-700 dark:text-slate-300">{option}</span>
                  </label>
                ))}
              </div>
            )}
            {question.type === QuestionType.ShortAnswer && (
              <textarea
                rows={4}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-md dark:bg-slate-700 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your answer..."
              ></textarea>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default ExamView;
