import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { SquareMenu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [location] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [location]);

  const navigationItems = [
    { path: "/", label: "Dashboard" },
    { path: "/profile", label: "Profile" },
    { path: "/recommendations", label: "Recommendations" },
    { path: "/market-trends", label: "Market Trends" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
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
              <h1 className="text-2xl font-bold text-primary">CareerAI</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                {navigationItems.map((item) => (
                  <li key={item.path}>
                    <Link href={item.path}>
                      <a className={`text-gray-700 hover:text-primary font-medium transition-colors ${location === item.path ? 'text-primary' : ''}`}>
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* User Menu */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center">
                  <span className="mr-2 hidden sm:inline-block text-gray-700">
                    {user.name || user.username}
                  </span>
                  <Link href="/profile">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/profile">
                  <Button size="sm" className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Sign In
                  </Button>
                </Link>
              )}
              
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 md:hidden">
                    <SquareMenu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col mt-8">
                    {navigationItems.map((item) => (
                      <Link key={item.path} href={item.path}>
                        <a className={`py-3 px-4 hover:bg-gray-100 rounded-md ${location === item.path ? 'bg-gray-100 text-primary font-medium' : ''}`}>
                          {item.label}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
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
                <h2 className="text-xl font-bold text-white">CareerAI</h2>
              </div>
              <p className="mt-2 text-gray-400 max-w-md">
                AI-powered career recommendations based on your skills, interests, and market trends.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Features</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">AI Recommendations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Skill Analysis</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Market Trends</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Career Paths</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Learning Paths</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Career Guide</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Skill Development</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Success Stories</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition duration-200">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} CareerAI. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <span className="sr-only">Facebook</span>
                <svg 
                  className="h-6 w-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <span className="sr-only">Twitter</span>
                <svg 
                  className="h-6 w-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path 
                    d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" 
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-200">
                <span className="sr-only">LinkedIn</span>
                <svg 
                  className="h-6 w-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
