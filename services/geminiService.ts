
import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedQuestion } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for development. In a real environment, the key would be set.
  // The platform injects the API key at runtime.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
  process.env.API_KEY = "YOUR_API_KEY_HERE";
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateExamQuestions(topic: string, numQuestions: number, questionType: string): Promise<GeneratedQuestion[]> {
  try {
    const model = 'gemini-2.5-flash';

    const questionSchema = {
        type: Type.OBJECT,
        properties: {
            questionText: { type: Type.STRING, description: 'The text of the question.' },
            options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: 'An array of possible answers. Only for Multiple Choice.'
            },
            correctAnswer: { type: Type.STRING, description: 'The correct answer.' },
        },
        required: ['questionText', 'correctAnswer'],
    };

    const responseSchema = {
      type: Type.ARRAY,
      items: questionSchema,
    };
    
    const prompt = `Generate ${numQuestions} ${questionType} questions about the topic: "${topic}". For each question, provide the question text, 4 options (if multiple choice), and the correct answer.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const questions = JSON.parse(jsonText);
    
    if (!Array.isArray(questions)) {
        throw new Error("API did not return a valid array of questions.");
    }

    return questions as GeneratedQuestion[];

  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions. Please check the topic and try again.");
  }
}
