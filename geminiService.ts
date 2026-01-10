
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getOJTCareerAdvice(studentProfile: string, currentLogs: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert career coach for students. 
      Student Profile: ${studentProfile}
      Current Work Logs: ${currentLogs}
      
      Provide 3 actionable tips for this student to excel in their OJT and improve their hiring chances. Keep it professional and encouraging.`,
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble thinking of advice right now. Keep up the hard work!";
  }
}

export async function checkLogQuality(tasks: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate the following OJT task description: "${tasks}". 
      Suggest a more professional and impactful way to phrase this for a resume. Return ONLY the new phrasing.`,
    });
    return response.text;
  } catch (error) {
    return tasks;
  }
}
