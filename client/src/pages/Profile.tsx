import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Manage your personal information, skills, education, experience, and interests.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {user?.name || user?.username || 'User'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user?.email || 'No email provided'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Complete Your Profile
            </h2>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Add your basic information</p>
                {/* Personal info form would go here */}
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Update
                </button>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Skills</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Add your skills and proficiency levels</p>
                {/* Skills form would go here */}
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Update
                </button>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Education</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Add your educational background</p>
                {/* Education form would go here */}
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Update
                </button>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Experience</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Add your work experience</p>
                {/* Experience form would go here */}
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Update
                </button>
              </div>
              
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Interests</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Add your career interests</p>
                {/* Interests form would go here */}
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;