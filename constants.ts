
import { User, Course, QuestionType } from './types';

export const OMAR_USER: User = {
  id: '190203020042',
  name: 'Omar Shifullah Khan Saad',
  university: 'North Western University, Khulna',
  avatarUrl: 'https://picsum.photos/seed/omar/100/100',
};

export const COURSES: Course[] = [
  {
    id: 'CSE-311',
    name: 'Database Management Systems',
    teacher: 'Dr. Anisur Rahman',
    credits: 3,
    assignments: [
      { id: 'cse311-a1', title: 'ER Diagram Design', dueDate: new Date('2024-09-15'), status: 'Graded', grade: 'A+' },
      { id: 'cse311-a2', title: 'Normalization Assignment', dueDate: new Date('2024-10-01'), status: 'Submitted' },
    ],
    exams: [
      {
        id: 'cse311-e1',
        title: 'Midterm Exam',
        date: new Date('2024-10-10T10:00:00'),
        durationMinutes: 90,
        questions: [
          { id: 'q1', text: 'What is a Primary Key?', type: QuestionType.ShortAnswer },
          { id: 'q2', text: 'Define 3NF.', type: QuestionType.ShortAnswer },
          { id: 'q3', text: 'Which SQL statement is used to extract data from a database?', type: QuestionType.MultipleChoice, options: ['GET', 'SELECT', 'OPEN', 'EXTRACT'], answer: 'SELECT' },
        ],
      },
    ],
  },
  {
    id: 'CSE-321',
    name: 'Software Engineering',
    teacher: 'Prof. Selina Parvin',
    credits: 3,
    assignments: [
      { id: 'cse321-a1', title: 'Requirement Analysis Document', dueDate: new Date('2024-09-20'), status: 'Graded', grade: 'A' },
      { id: 'cse321-a2', title: 'UML Diagrams', dueDate: new Date('2024-10-12'), status: 'Pending' },
    ],
    exams: [
      {
        id: 'cse321-e1',
        title: 'Midterm Exam',
        date: new Date('2024-10-15T14:00:00'),
        durationMinutes: 90,
        questions: [
          { id: 'q1', text: 'Describe the Agile methodology.', type: QuestionType.ShortAnswer },
          { id: 'q2', text: 'What is the purpose of a Use Case diagram?', type: QuestionType.ShortAnswer },
        ],
      },
      {
        id: 'cse321-e2',
        title: 'Final Exam',
        date: new Date('2024-12-20T14:00:00'),
        durationMinutes: 120,
        questions: [],
      }
    ],
  },
  {
    id: 'MAT-211',
    name: 'Linear Algebra',
    teacher: 'Mr. Firoz Iqbal',
    credits: 2,
    assignments: [
      { id: 'mat211-a1', title: 'Vector Spaces Problem Set', dueDate: new Date('2024-09-25'), status: 'Submitted' },
    ],
    exams: [
      {
        id: 'mat211-e1',
        title: 'Quiz 1',
        date: new Date('2024-10-05T11:00:00'),
        durationMinutes: 30,
        questions: [
          { id: 'q1', text: 'Find the determinant of a 2x2 matrix.', type: QuestionType.ShortAnswer },
        ],
      },
    ],
  },
];
