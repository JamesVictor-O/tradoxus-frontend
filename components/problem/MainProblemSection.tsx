'use client';

import { mainProblemData } from './contants';

const MainProblemSection = () => {
    return (
        <section className="px-6">
            <h2 className="text-3xl font-bold mb-4 text-center">{mainProblemData.title}</h2>
            <p className="text-lg font-light mb-8 text-center max-w-[43rem] mx-auto text-gray-400">
                {mainProblemData.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-[41rem] mx-auto">
                {mainProblemData.data.map((item, index) => (
                    <div key={index} className="bg-gray-800 text-red-500 p-3 text-center rounded-lg">
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default MainProblemSection; 