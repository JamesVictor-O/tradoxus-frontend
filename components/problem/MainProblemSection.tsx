"use client";

import { mainProblemData } from "./contants";

const MainProblemSection = () => {
  return (
    <section className="px-2 sm:px-4 md:px-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-center text-gray-900 dark:text-red-500">
        {mainProblemData.title}
      </h2>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-light mb-6 sm:mb-8 md:mb-10 text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto leading-relaxed px-2 sm:px-0">
        {mainProblemData.description}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">
        {mainProblemData.data.map((item) => (
          <div
            key={item.title}
            className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 md:p-4 text-center rounded-lg"
          >
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-tight">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainProblemSection;
