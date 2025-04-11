import React from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex-grow flex">
        {/* Left side: Decorative section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-indigo-800 p-12 justify-center items-center">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-6">CareerAI</h1>
            <p className="text-xl mb-8">
              AI-powered career recommendations tailored to your unique profile
            </p>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3">Discover Your Perfect Career Path</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Personalized career recommendations
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Skills assessment and gap analysis
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Real-time job market insights
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right side: Content area */}
        <main className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {children}
          </div>
        </main>
      </div>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} CareerAI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;