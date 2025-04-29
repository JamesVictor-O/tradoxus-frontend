"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Module, Lesson, Progress } from '@/lib/mocksedu-data';
import { ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';
import { theme } from '@/lib/theme';

interface ModuleAccordionProps {
  module: Module;
  lessons: Lesson[];
  activeLesson?: string;
  courseId: string;
  progress?: Progress | null;
}

export function ModuleAccordion({ module, lessons, activeLesson, courseId, progress }: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(lessons.some(lesson => lesson.id === activeLesson));
  
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  const completedLessons = progress?.completedLessons || [];
  
  return (
    <motion.div 
      className="border rounded-lg mb-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ borderColor: theme.colors.primary[200] }}
    >
      <motion.div 
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleAccordion}
        whileHover={{ backgroundColor: theme.colors.primary[50] }}
        style={{ backgroundColor: isOpen ? theme.colors.primary[100] : theme.colors.primary[50] }}
      >
        <div>
          <h3 className="font-medium" style={{ color: theme.colors.text.primary }}>
            Module {module.order}: {module.title}
          </h3>
          <p className="text-sm" style={{ color: theme.colors.text.light }}>{module.lessonCount} lessons</p>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: theme.colors.primary[500] }} />
        </motion.div>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="p-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: theme.colors.card }}
          >
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.id);
              const isActive = lesson.id === activeLesson;
              
              return (
                <Link key={lesson.id} href={`/courses/${courseId}/lessons/${lesson.id}`}>
                  <motion.div 
                    className={`flex items-center p-3 rounded-md`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileHover={{ backgroundColor: theme.colors.primary[50] }}
                    style={{ 
                      backgroundColor: isActive ? theme.colors.primary[50] : 'transparent'
                    }}
                  >
                    <div className="mr-3">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" style={{ color: theme.colors.success }} />
                      ) : (
                        <Circle className="w-5 h-5" style={{ color: theme.colors.text.light }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm ${isActive ? 'font-medium' : ''}`} style={{ color: theme.colors.text.primary }}>
                        {lesson.title}
                      </h4>
                      <p className="text-xs" style={{ color: theme.colors.text.light }}>{lesson.duration}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
