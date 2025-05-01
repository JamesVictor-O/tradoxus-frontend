"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CourseList } from '@/components/ui/course-list';
import { CourseService } from '@/lib/services/course-service';
import { ProgressService } from '@/lib/services/progress-service';
import { Course, Progress } from '@/lib/mocksedu-data';
import { theme } from '@/lib/theme';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [progressMap, setProgressMap] = useState<{ [courseId: string]: Progress }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const coursesData = await CourseService.getAllCourses();
        setCourses(coursesData);
        
        // Fetch progress for each course
        const progressData: { [courseId: string]: Progress } = {};
        for (const course of coursesData) {
          const progress = await ProgressService.getUserProgress(course.id);
          if (progress) {
            progressData[course.id] = progress;
          }
        }
        setProgressMap(progressData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6" style={{ backgroundColor: theme.colors.background }}>
        <div className="animate-pulse">
          <div className="h-12 rounded w-1/3 mb-6" style={{ backgroundColor: theme.colors.primary[200] }}></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-lg" style={{ backgroundColor: theme.colors.primary[100] }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6" style={{ backgroundColor: theme.colors.background }}>
        <div className="border p-4 rounded-lg" style={{ 
          backgroundColor: theme.colors.error + '20', 
          borderColor: theme.colors.error,
          color: theme.colors.error
        }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: theme.colors.background, minHeight: '100vh' }} className=''>
      <div className="container mx-auto p-6">
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: theme.colors.text.primary }}
        >
          Explore Courses
        </motion.h1>
        <CourseList courses={courses} progress={progressMap} />
      </div>
    </div>
  );
}