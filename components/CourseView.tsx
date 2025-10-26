
import React from 'react';
import { Course, Assignment } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface CourseViewProps {
  course: Course;
  onBack: () => void;
  onStartExam: (examId: string, courseId: string) => void;
  onUpdateAssignmentStatus: (courseId: string, assignmentId: string, newStatus: Assignment['status']) => void;
}

const CourseView: React.FC<CourseViewProps> = ({ course, onBack, onStartExam, onUpdateAssignmentStatus }) => {
  const getStatusColor = (status: 'Pending' | 'Submitted' | 'Graded') => {
    switch (status) {
      case 'Graded': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition mb-4">
          <ChevronLeftIcon className="w-5 h-5 mr-1" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{course.id}: {course.name}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Taught by {course.teacher} | {course.credits} Credits</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Assignments Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Assignments</h2>
          <div className="space-y-4">
            {course.assignments.map(assignment => (
              <div key={assignment.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{assignment.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Due: {assignment.dueDate.toLocaleDateString()}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2 text-right">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(assignment.status)}`}>
                      {assignment.status} {assignment.status === 'Graded' && `(${assignment.grade})`}
                    </span>
                    {assignment.status === 'Pending' && (
                        <button
                            onClick={() => onUpdateAssignmentStatus(course.id, assignment.id, 'Submitted')}
                            className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
                        >
                            Mark as Submitted
                        </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exams Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Exams</h2>
          <div className="space-y-4">
            {course.exams.map(exam => (
              <div key={exam.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{exam.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date: {exam.date.toLocaleString()}</p>
                  </div>
                  {new Date() < exam.date && exam.questions.length > 0 &&
                    <button 
                        onClick={() => onStartExam(exam.id, course.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
                        Start Exam
                    </button>
                  }
                   {new Date() > exam.date &&
                    <span className="text-sm font-medium text-slate-500">Completed</span>
                  }
                  {exam.questions.length === 0 &&
                    <span className="text-sm font-medium text-slate-500">Upcoming</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
