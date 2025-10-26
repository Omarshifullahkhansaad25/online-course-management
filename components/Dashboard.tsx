
import React from 'react';
import { User, Course, Assignment, Exam } from '../types';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';

interface DashboardProps {
  user: User;
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onSwitchToTeacherView: () => void;
  onLogout: () => void;
}

const CourseCard: React.FC<{ course: Course; onSelect: () => void; }> = ({ course, onSelect }) => (
    <div
      onClick={onSelect}
      className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent dark:hover:border-blue-500"
    >
      <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">{course.id}</h3>
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mt-1">{course.name}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Taught by {course.teacher}</p>
      <div className="mt-4 flex justify-between text-sm text-slate-600 dark:text-slate-300">
        <span>{course.assignments.length} Assignments</span>
        <span>{course.exams.length} Exams</span>
      </div>
    </div>
);

const UpcomingTask: React.FC<{ task: Assignment | Exam; courseName: string; type: 'assignment' | 'exam' }> = ({ task, courseName, type }) => (
  <li className="flex items-center justify-between py-3 px-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
    <div>
      <p className="font-semibold text-slate-800 dark:text-slate-200">{task.title}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{courseName}</p>
    </div>
    <div className="text-right">
      <p className={`text-sm font-medium ${type === 'exam' ? 'text-red-500' : 'text-amber-500'}`}>
        {new Date(type === 'exam' ? (task as Exam).date : (task as Assignment).dueDate).toLocaleDateString()}
      </p>
      <p className="text-xs text-slate-400 capitalize">{type}</p>
    </div>
  </li>
);

const Dashboard: React.FC<DashboardProps> = ({ user, courses, onSelectCourse, onSwitchToTeacherView, onLogout }) => {
  const upcomingTasks = courses
    .flatMap(course => [
      ...course.assignments.filter(a => new Date(a.dueDate) > new Date() && a.status === 'Pending').map(a => ({ ...a, courseName: course.name, type: 'assignment' as const })),
      ...course.exams.filter(e => new Date(e.date) > new Date()).map(e => ({ ...e, courseName: course.name, type: 'exam' as const }))
    ])
    .sort((a, b) => new Date( 'dueDate' in a ? a.dueDate : a.date).getTime() - new Date('dueDate' in b ? b.dueDate : b.date).getTime());

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome, {user.name.split(' ')[0]}</h1>
          <p className="text-slate-500 dark:text-slate-400">{user.university}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
              onClick={onSwitchToTeacherView}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900 transition"
          >
              Teacher View
          </button>
          <button 
              onClick={onLogout}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 dark:bg-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition"
          >
              Logout
          </button>
          <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-semibold">Your Courses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} onSelect={() => onSelectCourse(course.id)} />
            ))}
          </div>
        </div>

        {/* Upcoming Tasks Section */}
        <div>
           <div className="flex items-center gap-3 mb-6">
            <ClipboardListIcon className="w-8 h-8 text-amber-500 dark:text-amber-400" />
            <h2 className="text-2xl font-semibold">Upcoming</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg">
            {upcomingTasks.length > 0 ? (
              <ul className="space-y-3">
                {upcomingTasks.slice(0, 5).map(task => (
                  <UpcomingTask key={task.id} task={task} courseName={task.courseName} type={task.type} />
                ))}
              </ul>
            ) : (
              <p className="text-center text-slate-500 dark:text-slate-400 py-4">No upcoming tasks. You're all caught up!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
