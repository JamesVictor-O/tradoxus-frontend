"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Course, Progress } from '@/lib/mocksedu-data';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Clock, BookOpen, Award } from 'lucide-react';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface CourseHeaderProps {
  course: Course;
  progress?: Progress | null;
}

export function CourseHeader({ course, progress }: CourseHeaderProps) {
  const progressPercentage =  
    progress && progress.totalLessons > 0  
      ? Math.round((progress.lessonsCompleted / progress.totalLessons) * 100)  
      : 0;
  
  return (
    <motion.div 
      className="rounded-lg shadow-md p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ backgroundColor: theme.colors.card }}
    >
      <motion.h1 
        className="text-2xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ color: theme.colors.text.primary }}
      >
        {course.title}
      </motion.h1>
      <motion.p 
        className="mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ color: theme.colors.text.secondary }}
      >
        {course.description}
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap items-center mt-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2" style={{ color: theme.colors.primary[500] }} />
          <span style={{ color: theme.colors.text.secondary }}>{course.duration}</span>
        </div>
        <div className="flex items-center">
          <BookOpen className="w-5 h-5 mr-2" style={{ color: theme.colors.primary[500] }} />
          <span style={{ color: theme.colors.text.secondary }}>{course.lessonCount} lessons</span>
        </div>
        <div className="flex items-center">
          <Award className="w-5 h-5 mr-2" style={{ color: theme.colors.primary[500] }} />
          <span style={{ color: theme.colors.text.secondary }}>{course.level}</span>
        </div>
      </motion.div>
      
      {progress && (
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="flex justify-between text-sm mb-2">
            <span style={{ color: theme.colors.text.primary }}>Your Progress</span>
            <span style={{ color: theme.colors.primary[600] }}>{progressPercentage}% Complete</span>
          </div>
          <ProgressBar value={progressPercentage} className="h-2" indicatorClassName={cn("bg-[#6366f1]")} />
          <div className="mt-2 text-sm" style={{ color: theme.colors.text.secondary }}>
            {progress.lessonsCompleted} of {progress.totalLessons} lessons completed
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}