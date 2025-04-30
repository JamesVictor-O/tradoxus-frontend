"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LessonService } from '@/lib/services/lesson-service';
import { ProgressService } from '@/lib/services/progress-service';
import { CourseService } from '@/lib/services/course-service';
import { Lesson, Module, Progress } from '@/lib/mocksedu-data';

import { ContentRenderer } from '@/components/ui/content-renderer';
import { LessonNavigation } from '@/components/ui/lesson-navigation';
import { ArrowLeft } from 'lucide-react';

export default function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const router = useRouter();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [prevLessonId, setPrevLessonId] = useState<string | undefined>(undefined);
  const [nextLessonId, setNextLessonId] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!courseId || !lessonId) return;

      try {
        setLoading(true);
        // Fetch lesson details
        const lessonData = await LessonService.getLesson(lessonId);
        setLesson(lessonData);

        // Fetch course modules
        const modulesData = await CourseService.getCourseModules(courseId);
        setModules(modulesData);

        // Fetch all lessons for the course in parallel
        const lessonsArrays = await Promise.all(
          modulesData.map((m) => LessonService.getModuleLessons(m.id))
        );
        const lessonsData: Lesson[] = lessonsArrays.flat();

        // Sort all lessons by module order and then lesson order
        // Sort all lessons by module order and then lesson order
        const moduleMap = new Map(modulesData.map(m => [m.id, m]));
        const sortedLessons = lessonsData.sort((a, b) => {
          const moduleA = moduleMap.get(a.moduleId);
          const moduleB = moduleMap.get(b.moduleId);
          if (!moduleA || !moduleB) return 0;
          if (moduleA.order !== moduleB.order) {
            return moduleA.order - moduleB.order;
          }
          return a.order - b.order;
        });

        setAllLessons(sortedLessons);

        // Find previous and next lessons
        const currentIndex = sortedLessons.findIndex(l => l.id === lessonId);
        if (currentIndex > 0) {
          setPrevLessonId(sortedLessons[currentIndex - 1].id);
        }
        if (currentIndex < sortedLessons.length - 1) {
          setNextLessonId(sortedLessons[currentIndex + 1].id);
        }

        // Fetch user progress
        const progressData = await ProgressService.getUserProgress(courseId);
        setProgress(progressData);

        // Mark lesson as viewed
        await ProgressService.updateUserProgress(courseId, lessonId);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load lesson. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId, lessonId]);

  const handleCompleteLesson = async () => {
    if (!courseId || !lessonId) return;

    try {
      const updatedProgress = await ProgressService.updateUserProgress(courseId, lessonId);
      setProgress(updatedProgress);
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg">
          {error || 'Lesson not found.'}
        </div>
        <div className="mt-4">
          <Link href={`/courses/${courseId}`} className="text-[#6366f1] decoration-none hover:underline flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const isCompleted = progress?.completedLessons.includes(lessonId) || false;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href={`/courses/${courseId}`} className="text-[#6366f1] decoration-none hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Course
        </Link>
      </div>
      
      <div className="rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold">{lesson.title}</h1>
        <p className="text-gray-600 mt-2">{lesson.description}</p>
        
        <div className="mt-8">
          {lesson.contentBlocks
            .sort((a, b) => a.order - b.order)
            .map((block) => (
              <ContentRenderer key={block.id} contentBlock={block} />
            ))}
        </div>
        
        <LessonNavigation
          courseId={courseId}
          prevLessonId={prevLessonId}
          nextLessonId={nextLessonId}
          onComplete={handleCompleteLesson}
          isCompleted={isCompleted}
        />
      </div>
    </div>
  );
}