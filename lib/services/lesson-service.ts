// src/lib/services/lesson-service.ts

import { Lesson, mockApi } from "../mocksedu-data";

export const LessonService = {
  getLesson: async (lessonId: string): Promise<Lesson> => {
    try {
      const lesson = await mockApi.getLesson(lessonId);
      if (!lesson) throw new Error('Lesson not found');
      return lesson;
    } catch (error) {
      console.error(`Error fetching lesson with id ${lessonId}:`, error);
      throw error;
    }
  },
  
  getModuleLessons: async (moduleId: string): Promise<Lesson[]> => {
    try {
      const lessons = await mockApi.getModuleLessons(moduleId);
      return lessons;
    } catch (error) {
      console.error(`Error fetching lessons for module ${moduleId}:`, error);
      throw error;
    }
  }
};