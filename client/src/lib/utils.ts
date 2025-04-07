import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function calculateProfileCompleteness(profile: any): number {
  if (!profile) return 0;
  
  let completedSections = 0;
  let totalSections = 5; // Basic info, skills, education, experience, interests
  
  // Check basic info
  if (profile.user && profile.user.name && profile.user.email && profile.user.location) {
    completedSections++;
  }
  
  // Check skills
  if (profile.skills && profile.skills.length > 0) {
    completedSections++;
  }
  
  // Check education
  if (profile.education && profile.education.length > 0) {
    completedSections++;
  }
  
  // Check experience
  if (profile.experience && profile.experience.length > 0) {
    completedSections++;
  }
  
  // Check interests
  if (profile.interests && profile.interests.length > 0) {
    completedSections++;
  }
  
  return Math.round((completedSections / totalSections) * 100);
}

// Match score display functions
export function getMatchScoreClasses(score: number): string {
  if (score >= 85) return "text-green-700";
  if (score >= 70) return "text-amber-600";
  return "text-gray-600";
}

export function getStarsForScore(score: number): number {
  if (score >= 90) return 5;
  if (score >= 80) return 4;
  if (score >= 70) return 3;
  if (score >= 50) return 2;
  return 1;
}

// Demand level display functions
export function getDemandLevelColor(level: string): string {
  switch (level) {
    case 'High':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-amber-100 text-amber-800';
    case 'Low':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
