// src/lib/services/progress-service.ts

import { mockApi, Progress } from "../mocksedu-data";

export const ProgressService = {
  getUserProgress: async (courseId: string): Promise<Progress | null> => {
    try {
      const progress = await mockApi.getUserProgress(courseId);
      return progress;
    } catch (error) {
      console.error(`Error fetching progress for course ${courseId}:`, error);
      throw error;
    }
  },
  
  updateUserProgress: async (courseId: string, lessonId: string): Promise<Progress> => {
    try {
      const progress = await mockApi.updateUserProgress(courseId, lessonId);
      return progress;
    } catch (error) {
      console.error(`Error updating progress for course ${courseId} and lesson ${lessonId}:`, error);
      throw error;
    }
  }
};