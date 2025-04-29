// src/lib/services/course-service.ts

import { Course, mockApi, Module } from "../mocksedu-data";

export const CourseService = {
  getAllCourses: async (): Promise<Course[]> => {
    try {
      const courses = await mockApi.getCourses();
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  },
  
  getCourse: async (id: string): Promise<Course> => {
    try {
      const course = await mockApi.getCourse(id);
      if (!course) throw new Error('Course not found');
      return course;
    } catch (error) {
      console.error(`Error fetching course with id ${id}:`, error);
      throw error;
    }
  },
  
  getCourseModules: async (courseId: string): Promise<Module[]> => {
    try {
      const modules = await mockApi.getCourseModules(courseId);
      return modules;
    } catch (error) {
      console.error(`Error fetching modules for course ${courseId}:`, error);
      throw error;
    }
  }
};