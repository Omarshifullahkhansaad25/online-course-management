
import React, { useState } from 'react';
import { AcademicCapIcon } from './icons/AcademicCapIcon';

interface LoginProps {
  onLogin: (userId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) {
      onLogin(userId.trim());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="text-center">
            <div className="flex justify-center mb-4">
                <AcademicCapIcon className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">NWU Course Companion</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Sign in with your University ID</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user-id" className="sr-only">
                University ID
              </label>
              <input
                id="user-id"
                name="userid"
                type="text"
                autoComplete="off"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-slate-300 dark:border-slate-600 placeholder-slate-500 text-slate-900 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="e.g., 190203020042"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-transform transform hover:scale-105"
            >
              Sign In
            </button>
          </div>
        </form>
         <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
           North Western University, Khulna
        </p>
      </div>
    </div>
  );
};

export default Login;
