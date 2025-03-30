'use client'

import React from 'react'

export const GetStartedAction = () => {
  return (
    <section className="mt-16 py-16 px-4 bg-gradient-to-br from-[#151e45] via-[#291444] to-[#151e45] rounded-2xl text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">Ready to start your trading journey?</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Join thousands of traders who are mastering the markets with our structured educational modules.
          </p>
          <div>
            <button
              className="bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-medium px-8 py-3 rounded-lg text-base transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </section> 
  )
}
