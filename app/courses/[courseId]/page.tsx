"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { CourseService } from '@/lib/services/course-service';
import { LessonService } from '@/lib/services/lesson-service';
import { ProgressService } from '@/lib/services/progress-service';
import { CourseHeader } from '@/components/ui/course-header';
import { ModuleAccordion } from '@/components/ui/module-accordion';
import { ArrowLeft } from 'lucide-react';
import { Course, Lesson, Module, Progress } from '@/lib/mocksedu-data';
import { theme } from '@/lib/theme';

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleLessons, setModuleLessons] = useState<{ [moduleId: string]: Lesson[] }>({});
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!courseId) return;
      
      try {
        setLoading(true);
        // Fetch course details
        const courseData = await CourseService.getCourse(courseId);
        setCourse(courseData);
        
        // Fetch course modules
        const modulesData = await CourseService.getCourseModules(courseId);
        setModules(modulesData);
        
        // Fetch all module lessons in parallel
        const lessonsPromises = modulesData.map(module =>  
          LessonService.getModuleLessons(module.id)  
            .then(lessons => ({ moduleId: module.id, lessons }))  
        );

        const lessonsResults = await Promise.all(lessonsPromises);
        const lessonsMap: { [moduleId: string]: Lesson[] } = {};
        lessonsResults.forEach(result => {
          lessonsMap[result.moduleId] = result.lessons;
        });
        setModuleLessons(lessonsMap);
        
        // Fetch user progress
        const progressData = await ProgressService.getUserProgress(courseId);
        setProgress(progressData);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load course. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [courseId]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error || 'Course not found.'}
        </div>
        <div className="mt-4">
          <Link href="/courses" className="text-[#6366f1] decoration-none hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link
          href="/courses"
          className="decoration-none hover:underline flex items-center"
          style={{ color: theme.colors.primary[500] }}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </Link>
      </div>
      
      <CourseHeader course={course} progress={progress} />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        {modules.length > 0 ? (
          modules
            .sort((a, b) => a.order - b.order)
            .map((module) => (
              <ModuleAccordion
                key={module.id}
                module={module}
                lessons={moduleLessons[module.id] || []}
                courseId={courseId}
                progress={progress}
              />
            ))
        ) : (
          <div className="text-gray-500">No modules available for this course.</div>
        )}
      </div>
      
      {progress && progress.lastLessonId && (
        <div className="mt-8">
          <Link 
            href={`/courses/${courseId}/lessons/${progress.lastLessonId}`}
            className="bg-[#6366f1] text-white px-6 py-3 rounded-lg inline-block hover:bg-blue-600 transition-colors"
          >
            Continue Learning
          </Link>
        </div>
      )}
    </div>
  );
}