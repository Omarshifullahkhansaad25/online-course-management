
import React, { useState, useCallback } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CourseView from './components/CourseView';
import ExamView from './components/ExamView';
import TeacherView from './components/TeacherView';
import { User, Course, Exam, View, Assignment } from './types';
import { OMAR_USER, COURSES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [currentView, setCurrentView] = useState<View>(View.Login);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const handleLogin = useCallback((userId: string) => {
    if (userId === OMAR_USER.id) {
      setUser(OMAR_USER);
      setCurrentView(View.Dashboard);
    } else {
      alert('Invalid University ID');
    }
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCourses(COURSES); // Reset course data on logout
    setCurrentView(View.Login);
  }, []);

  const handleUpdateAssignmentStatus = useCallback((courseId: string, assignmentId: string, newStatus: Assignment['status']) => {
    setCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? {
              ...course,
              assignments: course.assignments.map(assignment => 
                assignment.id === assignmentId 
                  ? { ...assignment, status: newStatus }
                  : assignment
              ),
            }
          : course
      )
    );
  }, []);
  
  const navigateToCourse = useCallback((courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setCurrentView(View.Course);
    }
  }, [courses]);

  const navigateToExam = useCallback((examId: string, courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    const exam = course?.exams.find(e => e.id === examId);
    if (exam) {
        setSelectedExam(exam);
        setCurrentView(View.Exam);
    }
  }, [courses]);

  const navigateToDashboard = useCallback(() => {
    setCurrentView(View.Dashboard);
    setSelectedCourse(null);
    setSelectedExam(null);
  }, []);

  const navigateToTeacherView = useCallback(() => {
    setCurrentView(View.Teacher);
  }, []);

  const renderContent = () => {
    if (!user) {
        return <Login onLogin={handleLogin} />;
    }

    // Ensure views get the latest course data after state updates
    const currentSelectedCourse = selectedCourse ? courses.find(c => c.id === selectedCourse.id) : null;

    switch (currentView) {
      case View.Dashboard:
        return <Dashboard user={user} courses={courses} onSelectCourse={navigateToCourse} onSwitchToTeacherView={navigateToTeacherView} onLogout={handleLogout} />;
      case View.Course:
        return currentSelectedCourse && <CourseView course={currentSelectedCourse} onBack={navigateToDashboard} onStartExam={navigateToExam} onUpdateAssignmentStatus={handleUpdateAssignmentStatus} />;
      case View.Exam:
        return currentSelectedCourse && selectedExam && <ExamView course={currentSelectedCourse} exam={selectedExam} onBack={() => navigateToCourse(currentSelectedCourse.id)} />;
      case View.Teacher:
        return <TeacherView onBack={navigateToDashboard} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <main>{renderContent()}</main>
    </div>
  );
};

export default App;
