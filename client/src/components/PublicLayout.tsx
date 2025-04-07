import React from 'react';
import { useLocation } from 'wouter';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary mr-2"
              >
                <circle cx="9.5" cy="9.5" r="5.5" />
                <path d="M14 14v7h6v-3a4 4 0 0 0-6-3.5" />
                <path d="m19.8 17.8.2.2" />
                <path d="M5 10c-1.5 0-3 .5-3 2s1.5 2 3 2c1.5 0 3-.5 3-2s-1.5-2-3-2z" />
                <path d="M7 16c-2 .5-3 1.5-3 2.5s1 2 3 2.5" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CareerAI</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary mr-2"
              >
                <circle cx="9.5" cy="9.5" r="5.5" />
                <path d="M14 14v7h6v-3a4 4 0 0 0-6-3.5" />
                <path d="m19.8 17.8.2.2" />
                <path d="M5 10c-1.5 0-3 .5-3 2s1.5 2 3 2c1.5 0 3-.5 3-2s-1.5-2-3-2z" />
                <path d="M7 16c-2 .5-3 1.5-3 2.5s1 2 3 2.5" />
              </svg>
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} CareerAI. All rights reserved.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                AI-powered career recommendations tailored to your unique profile
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;