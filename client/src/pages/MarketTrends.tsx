import React from 'react';
import { useAuth } from '@/context/AuthContext';

const MarketTrends: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Job Market Trends
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Stay informed about the latest trends in the job market to make better career decisions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Growing Industries
          </h2>
          <div className="space-y-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Technology</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">24% Growth</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div className="bg-primary shadow-none" style={{ width: '24%' }}></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Healthcare</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">18% Growth</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div className="bg-primary shadow-none" style={{ width: '18%' }}></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Renewable Energy</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">15% Growth</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div className="bg-primary shadow-none" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">E-commerce</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">12% Growth</span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
                <div className="bg-primary shadow-none" style={{ width: '12%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            In-Demand Skills
          </h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 dark:bg-indigo-900 dark:text-indigo-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Data Science</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Machine learning & AI expertise</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3 dark:bg-blue-900 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Software Development</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cloud & container technologies</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 dark:bg-green-900 dark:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white">Digital Marketing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">SEO & social media management</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3 dark:bg-purple-900 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3c0-1.9-1.4-3.2-3.3-3.2A3.24 3.24 0 0 0 6.3 8.3v7.5c0 2.3 1.3 3.8 3.5 4.2Z"></path>
                  <path d="M19.1 8.3h-3.8"></path>
                  <path d="M17.1 4v16"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white">UI/UX Design</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">User research & interface design</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Emerging Career Paths
          </h2>
          <div className="space-y-3">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">AI Ethics Specialist</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ensuring responsible & ethical AI implementations</p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">Sustainability Consultant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Helping companies reduce environmental impact</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">Remote Work Coordinator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Managing distributed teams & digital workspaces</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">Cybersecurity Specialist</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Protecting systems & data from digital threats</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white">Healthcare Technologist</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Implementing digital solutions in healthcare</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Latest Market Reports
        </h2>
        <div className="space-y-4">
          <div className="border-b pb-4 dark:border-gray-700">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">
              Remote Work Revolution: Post-Pandemic Trends
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              How remote work has transformed employment opportunities and company policies.
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Published: March 15, 2025
            </span>
          </div>
          
          <div className="border-b pb-4 dark:border-gray-700">
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">
              Skills Gap Analysis: Bridging Education and Industry Needs
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Insights on how educational institutions are adapting to prepare students for the modern workforce.
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Published: February 28, 2025
            </span>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-1">
              AI Impact: Job Creation vs. Automation
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Analysis of how AI is reshaping the job market and creating new opportunities.
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Published: January 10, 2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;