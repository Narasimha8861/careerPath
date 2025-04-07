import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <a className="flex items-center text-primary hover:text-primary/90">
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
                    className="mr-2"
                  >
                    <circle cx="9.5" cy="9.5" r="5.5" />
                    <path d="M14 14v7h6v-3a4 4 0 0 0-6-3.5" />
                    <path d="m19.8 17.8.2.2" />
                    <path d="M5 10c-1.5 0-3 .5-3 2s1.5 2 3 2c1.5 0 3-.5 3-2s-1.5-2-3-2z" />
                    <path d="M7 16c-2 .5-3 1.5-3 2.5s1 2 3 2.5" />
                  </svg>
                  <span className="text-xl font-bold">CareerAI</span>
                </a>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <a className={`text-sm font-medium transition-colors duration-200 ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}>
                  Dashboard
                </a>
              </Link>
              <Link href="/profile">
                <a className={`text-sm font-medium transition-colors duration-200 ${location === '/profile' ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}>
                  Profile
                </a>
              </Link>
              <Link href="/recommendations">
                <a className={`text-sm font-medium transition-colors duration-200 ${location === '/recommendations' ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}>
                  Recommendations
                </a>
              </Link>
              <Link href="/market-trends">
                <a className={`text-sm font-medium transition-colors duration-200 ${location === '/market-trends' ? 'text-primary' : 'text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white'}`}>
                  Market Trends
                </a>
              </Link>
            </nav>

            <div className="flex items-center">
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user.name || user.username}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
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

export default Layout;