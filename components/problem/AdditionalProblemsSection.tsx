"use client";

import { solutionData } from "./contants";

const AdditionalProblems = () => {
    return (
        <section className="">
            <div className="grid grid-cols-1 gap-4">
                {solutionData.data.map((item, index) => (
                    <div key={item.title || `solution-${index}`} className="flex gap-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-lg">
                        <div className="flex items-center justify-center bg-red-100 dark:bg-red-500/10 p-2 max-w-8 max-h-8 rounded-sm">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-red-500">{item.title}</h3>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            <p className="mt-2 italic bg-gray-200/70 dark:bg-white/5 p-2 rounded-sm text-gray-700 dark:text-gray-300">{item.percentage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default AdditionalProblems;
