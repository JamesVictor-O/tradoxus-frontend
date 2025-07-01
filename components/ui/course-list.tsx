"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Course, Progress } from "@/lib/mocksedu-data";
import { CourseCard } from "@/components/ui/course-card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { theme } from "@/lib/theme";

interface CourseListProps {
  courses: Course[];
  progress?: { [courseId: string]: Progress };
}

export function CourseList({ courses, progress }: CourseListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full">
      <motion.div
        className="mb-4 sm:mb-6 flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full lg:w-2/3">
          <Label
            htmlFor="search"
            className="text-sm sm:text-base font-medium"
            style={{ color: theme.colors.text.primary }}
          >
            Search Courses
          </Label>
          <Input
            id="search"
            placeholder="Search by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-1 text-sm sm:text-base"
            style={{
              borderColor: theme.colors.primary[300],
              backgroundColor: theme.colors.card,
              color: theme.colors.text.primary,
            }}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <Label
            htmlFor="level-filter"
            className="text-sm sm:text-base font-medium"
            style={{ color: theme.colors.text.primary }}
          >
            Filter by Level
          </Label>
          <select
            id="level-filter"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm sm:text-base"
            style={{
              borderColor: theme.colors.primary[300],
              backgroundColor: theme.colors.card,
              color: theme.colors.text.primary,
            }}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </motion.div>

      {filteredCourses.length === 0 ? (
        <motion.div
          className="text-center py-8 sm:py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p
            className="text-sm sm:text-base"
            style={{ color: theme.colors.text.secondary }}
          >
            No courses found matching your criteria.
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={progress ? progress[course.id] : null}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
