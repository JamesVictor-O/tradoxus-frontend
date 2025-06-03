'use client';

import React from 'react';
import { impactData } from './contants';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
const ImpactSection: React.FC = () => {
    return (
        <section className="p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
            <div className="text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-red-500">{impactData.title}</h2>
                <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
                    {impactData.description}
                </p>
            </div>
            <div className="grid gap-6">
                {impactData.data.map((item, index) => (
                    <div key={item.title || `impact-${index}`} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-red-500 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                ))}
                <div className="text-center mt-8 mb-6">
                    <Link
                        href="/register"
                        className="flex items-center justify-center gap-2 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-bold transition max-w-fit mx-auto border border-red-600/20 dark:border-none"
                    >
                        {impactData.button.text} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;
