// Skill proficiency levels
export const PROFICIENCY_LEVELS = [
  { value: 1, label: "Novice" },
  { value: 2, label: "Beginner" },
  { value: 3, label: "Intermediate" },
  { value: 4, label: "Advanced" },
  { value: 5, label: "Expert" }
];

// Interest levels
export const INTEREST_LEVELS = [
  { value: 1, label: "Slight Interest" },
  { value: 2, label: "Mild Interest" },
  { value: 3, label: "Moderate Interest" },
  { value: 4, label: "Strong Interest" },
  { value: 5, label: "Passionate" }
];

// Degree types
export const DEGREE_TYPES = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Professional Certification",
  "Other"
];

// Common skills by category
export const COMMON_SKILLS = {
  technical: [
    "JavaScript",
    "Python",
    "Java",
    "SQL",
    "HTML/CSS",
    "React",
    "Node.js",
    "Data Analysis",
    "Machine Learning",
    "DevOps",
    "Cloud Computing",
    "Mobile Development",
    "UI/UX Design"
  ],
  softSkills: [
    "Communication",
    "Leadership",
    "Teamwork",
    "Problem Solving",
    "Critical Thinking",
    "Time Management",
    "Adaptability",
    "Creativity",
    "Emotional Intelligence",
    "Conflict Resolution"
  ],
  business: [
    "Project Management",
    "Marketing",
    "Sales",
    "Customer Service",
    "Strategic Planning",
    "Financial Analysis",
    "Operations",
    "Business Development",
    "Consulting",
    "Entrepreneurship"
  ]
};

// Common interests
export const COMMON_INTERESTS = [
  "Technology",
  "Arts",
  "Sciences",
  "Healthcare",
  "Education",
  "Business",
  "Finance",
  "Environment",
  "Social Services",
  "Media",
  "Entertainment",
  "Sports",
  "Travel",
  "Food and Hospitality",
  "Manufacturing",
  "Architecture",
  "Design",
  "Law",
  "Government",
  "Research"
];

// Career path industry categories
export const INDUSTRY_CATEGORIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Government",
  "Non-profit",
  "Media & Entertainment",
  "Construction",
  "Transportation",
  "Agriculture",
  "Energy",
  "Legal Services",
  "Hospitality & Tourism"
];

// Demand level colors
export const DEMAND_LEVEL_COLORS = {
  High: "green",
  Medium: "amber",
  Low: "gray"
};

// Chart colors for consistent styling
export const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

// Progress steps for onboarding
export const ONBOARDING_STEPS = [
  { number: 1, label: "Profile" },
  { number: 2, label: "Skills" },
  { number: 3, label: "Education" },
  { number: 4, label: "Experience" },
  { number: 5, label: "Interests" }
];

// Labels for career match scores
export const MATCH_SCORE_LABELS = {
  excellent: { min: 90, label: "Excellent Match" },
  good: { min: 75, label: "Good Match" },
  moderate: { min: 60, label: "Moderate Match" },
  low: { min: 0, label: "Low Match" }
};
