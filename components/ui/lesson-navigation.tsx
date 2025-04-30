"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { theme } from '@/lib/theme';

interface LessonNavigationProps {
  courseId: string;
  prevLessonId?: string;
  nextLessonId?: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export function LessonNavigation({ 
  courseId, 
  prevLessonId, 
  nextLessonId, 
  onComplete,
  isCompleted
}: LessonNavigationProps) {
  return (
    <motion.div 
      className="border-t mt-8 pt-6 flex justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      style={{ borderColor: theme.colors.primary[200] }}
    >
      <div>
        {prevLessonId ? (
          <Link href={`/courses/${courseId}/lessons/${prevLessonId}`}>
            <motion.div 
              className="flex items-center hover:text-blue-600"
              whileHover={{ x: -3 }}
              style={{ color: theme.colors.text.secondary }}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Previous Lesson</span>
            </motion.div>
          </Link>
        ) : (
          <Link href={`/courses/${courseId}`}>
            <motion.div 
              className="flex items-center hover:text-blue-600"
              whileHover={{ x: -3 }}
              style={{ color: theme.colors.text.secondary }}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span>Back to Course</span>
            </motion.div>
          </Link>
        )}
      </div>
      
      <div className="flex space-x-4">
        <motion.button
          onClick={onComplete}
          className="px-4 py-2 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ 
            backgroundColor: isCompleted ? theme.colors.success : theme.colors.primary[500],
            color: 'white'
          }}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
        </motion.button>
        
        {nextLessonId && (
          <Link href={`/courses/${courseId}/lessons/${nextLessonId}`}>
            <motion.div 
              className="px-4 py-2 rounded flex items-center"
              whileHover={{ scale: 1.05, x: 3 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: theme.colors.primary[500], color: 'white' }}
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.div>
          </Link>
        )}
      </div>
    </motion.div>
  );
}