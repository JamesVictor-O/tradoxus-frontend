"use client";

import { solutionData } from "./contants";

const AdditionalProblems = () => {
  return (
    <section className="px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {solutionData.data.map((item, index) => (
          <div
            key={item.title || `solution-${index}`}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-3 sm:p-4 md:p-6 rounded-lg"
          >
            <div className="flex items-center justify-center bg-red-100 dark:bg-red-500/10 p-2 sm:p-3 rounded-sm w-fit sm:w-auto">
              <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 flex items-center justify-center">
                {item.icon}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-red-500 mb-1 sm:mb-2 md:mb-3">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 leading-relaxed">
                {item.description}
              </p>
              <p className="text-xs sm:text-sm md:text-sm lg:text-base italic bg-gray-200/70 dark:bg-white/5 p-2 sm:p-3 rounded-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {item.percentage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdditionalProblems;
