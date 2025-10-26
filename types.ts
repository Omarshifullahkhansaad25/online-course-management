
export interface User {
  id: string;
  name: string;
  university: string;
  avatarUrl: string;
}

export enum QuestionType {
  MultipleChoice = 'MultipleChoice',
  ShortAnswer = 'ShortAnswer',
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
  answer?: string;
}

export interface Exam {
  id: string;
  title: string;
  date: Date;
  durationMinutes: number;
  questions: Question[];
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: Date;
  status: 'Pending' | 'Submitted' | 'Graded';
  grade?: string;
}

export interface Course {
  id: string;
  name: string;
  teacher: string;
  credits: number;
  assignments: Assignment[];
  exams: Exam[];
}

export interface GeneratedQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export enum View {
  Login = 'LOGIN',
  Dashboard = 'DASHBOARD',
  Course = 'COURSE',
  Exam = 'EXAM',
  Teacher = 'TEACHER',
}
