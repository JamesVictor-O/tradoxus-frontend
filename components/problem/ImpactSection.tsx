"use client";

import React from "react";
import { impactData } from "./contants";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ImpactSection: React.FC = () => {
  return (
    <section className="px-2 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors rounded-lg">
      <div className="text-left mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-900 dark:text-red-500">
          {impactData.title}
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {impactData.description}
        </p>
      </div>
      <div className="grid gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {impactData.data.map((item, index) => (
          <div
            key={item.title || `impact-${index}`}
            className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-lg"
          >
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-red-500 mb-1 sm:mb-2 md:mb-3">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
        <div className="text-center mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-4 md:mb-6">
          <Link
            href="/register"
            className="inline-flex items-center justify-center gap-1 sm:gap-2 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-lg text-sm sm:text-base md:text-lg font-bold transition-colors duration-200 max-w-fit mx-auto border border-red-600/20 dark:border-none"
          >
            {impactData.button.text}
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
