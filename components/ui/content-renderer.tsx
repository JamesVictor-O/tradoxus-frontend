"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ContentBlock } from '@/lib/mocksedu-data';
import { theme } from '@/lib/theme';

interface ContentRendererProps {
  contentBlock: ContentBlock;
}

export function ContentRenderer({ contentBlock }: ContentRendererProps) {
  switch (contentBlock.type) {
    case 'text':
      return (
        <motion.div 
          className="prose max-w-none mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: theme.colors.text.primary }}
        >
          {contentBlock.content.split('\n').map((paragraph, index) => (
            <p key={`paragraph-${contentBlock.id}-${index}`} style={{ color: theme.colors.text.primary }}>{paragraph}</p>
          ))}
        </motion.div>
      );
    
    case 'image':
      return (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <Image 
              src={contentBlock.content} 
              alt="Lesson image"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      );
    
    case 'video':
      return (
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-w-16 aspect-h-9">
            {/* Placeholder for video player */}
            <div className="flex items-center justify-center rounded-lg h-64" style={{ backgroundColor: theme.colors.primary[50] }}>
              <p style={{ color: theme.colors.text.secondary }}>Video content would play here: {contentBlock.content}</p>
            </div>
          </div>
        </motion.div>
      );
    
    case 'quiz':
      try {
        const quizData = contentBlock.content;
        return (
          <motion.div 
            className="mb-6 p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: theme.colors.primary[50] }}
          >
            <h3 className="font-semibold mb-3" style={{ color: theme.colors.text.primary }}>{quizData.question}</h3>
            <div className="space-y-2">
              {quizData.options.map((option: string, idx: number) => (
                <motion.div 
                  key={`${contentBlock.id}-option-${option}-${idx}`} 
                  className="flex items-center"
                  whileHover={{ backgroundColor: theme.colors.primary[100], borderRadius: '0.25rem', padding: '0.25rem' }}
                >
                  <input 
                    type="radio" 
                    id={`option-${contentBlock.id}-${idx}`} 
                    name={`quiz-answer-${contentBlock.id}`} 
                    className="mr-2"
                  />
                  <label htmlFor={`option-${contentBlock.id}-${idx}`} style={{ color: theme.colors.text.primary }}>{option}</label>
                </motion.div>
              ))}
            </div>
            <motion.button 
              className="mt-4 px-4 py-2 rounded text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ backgroundColor: theme.colors.primary[500] }}
            >
              Submit Answer
            </motion.button>
          </motion.div>
        );
      } catch (error) {
        return <div style={{ color: theme.colors.error }}>Error rendering quiz</div>;
      }
    
    default:
      return <div style={{ color: theme.colors.text.secondary }}>Unknown content type</div>;
  }
}