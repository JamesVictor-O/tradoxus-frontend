"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen, BarChart } from 'lucide-react';
import { Course, Progress as UserProgress } from '@/lib/mocksedu-data';
import { theme } from '@/lib/theme';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  progress?: UserProgress | null;
  index?: number; // for staggered animations
}

export function CourseCard({ course, progress, index = 0 }: CourseCardProps) {
  const progressPercentage = progress && progress.totalLessons > 0 ? 
    Math.round((progress.lessonsCompleted / progress.totalLessons) * 100) : 0;

  return (
    <Link href={`/courses/${course.id}`}>
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5,
          delay: index * 0.1, // staggered delay based on index
          ease: "easeOut" 
        }}
        whileHover={{ 
          scale: 1.03,
          transition: { duration: 0.2 }
        }}
        style={{ backgroundColor: theme.colors.card }}
      >
        <div className="relative h-48">
          <Image 
            src={course.thumbnail} 
            alt={course.title}
            fill
            className="object-cover"
          />
          <motion.div 
            className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: theme.colors.primary[500], color: 'white' }}
            whileHover={{ scale: 1.1 }}
          >
            {course.level}
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold" style={{ color: theme.colors.text.primary }}>{course.title}</h3>
          <p className="mt-1 text-sm line-clamp-2" style={{ color: theme.colors.text.secondary }}>{course.description}</p>
          
          <div className="flex items-center mt-3 text-sm" style={{ color: theme.colors.text.light }}>
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.duration}</span>
            <span className="mx-2">•</span>
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{course.lessonCount} lessons</span>
          </div>
          
          {progress && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: theme.colors.text.secondary }}>Progress</span>
                <span style={{ color: theme.colors.primary[600] }}>{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-1" indicatorClassName={cn("bg-[#6366f1]")} />
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <div className="text-xs" style={{ color: theme.colors.text.light }}>
                By <span className="font-medium">{course.author}</span>
              </div>
            </div>
            <div className="flex items-center">
              <BarChart className="w-4 h-4 mr-1" style={{ color: theme.colors.text.light }} />
              <span className="text-xs" style={{ color: theme.colors.text.light }}>{course.moduleCount} modules</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}