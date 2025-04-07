import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Recommendations: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Career Recommendations
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Based on your profile, our AI has generated the following career recommendations for you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 9.3c.1-.2.1-.3.2-.5.3-1.8-.3-2.5-1.8-2.5H16V4.9C16 3 15.2 2 13.5 2c-1.7 0-2.5 1.5-3 2.3L7.8 8.7c-.5.7-.8 1.6-.8 2.5v5.5c0 1.9 1.1 3.3 3 3.3h9.5c2 0 2.8-1.6 3-2.5.1-.5.2-1 .2-1.5"></path>
                <path d="M12 13.3c.7.7 1.5 1.5 2.5 2 1 .5 2.2.7 3.5.5"></path>
                <path d="M5 11H3c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1h2c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1Z"></path>
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Software Engineer
                </h2>
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300">
                  High Demand
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Software engineers design, develop, and maintain software systems. They apply engineering principles to the entire software development lifecycle.
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Programming
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Problem Solving
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Algorithms
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Salary</h3>
                    <p className="text-gray-600 dark:text-gray-400">$110,000 - $150,000</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Industry</h3>
                    <p className="text-gray-600 dark:text-gray-400">Technology</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    Save
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l4 4v10a2 2 0 0 1-2 2H9Z"></path>
                <path d="M14 22H9a2 2 0 0 1-2-2v-6"></path>
                <path d="M3 18v-4a2 2 0 0 1 2-2h5"></path>
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Data Scientist
                </h2>
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                  Medium Demand
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Data scientists analyze and interpret complex data to help organizations make better decisions. They use statistics, machine learning, and programming.
              </p>
              <div className="mt-4 space-y-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Required Skills</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Statistics
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Machine Learning
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                      Python
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Salary</h3>
                    <p className="text-gray-600 dark:text-gray-400">$95,000 - $135,000</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Industry</h3>
                    <p className="text-gray-600 dark:text-gray-400">Technology/Research</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <button className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                    Save
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white text-sm font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </svg>
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;