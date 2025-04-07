import { UserProfile } from "@shared/schema";

/**
 * Processes user profile data with NLP techniques (simulated)
 * @param profile User profile data containing skills, education, experience, and interests
 * @returns Processed data ready for the recommendation engine
 */
export async function processUserData(profile: UserProfile) {
  // In a real implementation, we would use NLP libraries to process text
  // For this MVP, we'll simulate NLP processing with some basic rules
  
  // Process skills - extract important keywords and assign weights
  const processedSkills = profile.skills.map(skill => {
    return {
      name: skill.skillName,
      proficiency: skill.proficiencyLevel,
      // Assign weight based on proficiency level (higher proficiency = higher weight)
      weight: normalizeWeight(skill.proficiencyLevel, 1, 5)
    };
  });
  
  // Process education - analyze fields of study and degree levels
  const processedEducation = profile.education.map(edu => {
    // Assign education level based on degree type
    const level = getDegreeLevel(edu.degree);
    
    return {
      degree: edu.degree,
      field: edu.fieldOfStudy,
      level,
      // Weight recent education higher
      weight: edu.current ? 1.2 : 1.0
    };
  });
  
  // Process experience - extract job titles, industries, and duration
  const processedExperience = profile.experience.map(exp => {
    // Calculate years of experience (if current job, calculate from start date to now)
    const startDate = new Date(exp.startDate);
    const endDate = exp.current ? new Date() : exp.endDate ? new Date(exp.endDate) : new Date();
    const years = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    return {
      title: exp.position,
      industry: extractIndustry(exp.company, exp.description || ""),
      years,
      // Weight recent experience higher
      weight: exp.current ? 1.2 : 1.0
    };
  });
  
  // Process interests - analyze and categorize
  const processedInterests = profile.interests.map(interest => {
    return {
      name: interest.interestName,
      level: interest.interestLevel,
      // Assign weight based on interest level
      weight: normalizeWeight(interest.interestLevel, 1, 5)
    };
  });
  
  return {
    skills: processedSkills,
    education: processedEducation,
    experience: processedExperience,
    interests: processedInterests
  };
}

/**
 * Normalize a weight value to a scale from 0 to 1
 */
function normalizeWeight(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

/**
 * Assign education level based on degree type
 */
function getDegreeLevel(degree: string): number {
  // Map degree types to numeric levels
  if (degree.toLowerCase().includes("doctorate") || degree.toLowerCase().includes("phd")) {
    return 5;
  } else if (degree.toLowerCase().includes("master")) {
    return 4;
  } else if (degree.toLowerCase().includes("bachelor")) {
    return 3;
  } else if (degree.toLowerCase().includes("associate")) {
    return 2;
  } else if (degree.toLowerCase().includes("certificate") || degree.toLowerCase().includes("diploma")) {
    return 1.5;
  } else {
    return 1;
  }
}

/**
 * Extract industry from company name and job description
 */
function extractIndustry(company: string, description: string): string {
  // In a real implementation, this would use NLP to extract industry
  // For this MVP, we'll use a simplified approach
  
  const combinedText = (company + " " + description).toLowerCase();
  
  // Check for common industry keywords
  const industries = [
    "technology", "healthcare", "finance", "education", 
    "manufacturing", "retail", "government", "non-profit",
    "media", "entertainment", "construction", "transportation",
    "agriculture", "energy", "legal", "hospitality", "tourism",
    "telecommunications", "pharmaceutical", "consulting"
  ];
  
  for (const industry of industries) {
    if (combinedText.includes(industry)) {
      return industry;
    }
  }
  
  // Default to generic "business" if no industry detected
  return "business";
}
