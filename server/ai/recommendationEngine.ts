import { UserProfile } from "@shared/schema";
import { getMockCareers } from "./mockData";

// Types for NLP processed data
interface ProcessedUserData {
  skills: {
    name: string;
    proficiency: number;
    weight: number;
  }[];
  education: {
    degree: string;
    field: string;
    level: number;
    weight: number;
  }[];
  experience: {
    title: string;
    industry: string;
    years: number;
    weight: number;
  }[];
  interests: {
    name: string;
    level: number;
    weight: number;
  }[];
}

// Type for recommendation result
interface CareerRecommendation {
  careerTitle: string;
  description: string;
  requiredSkills: {
    name: string;
    importance: number;
  }[];
  averageSalary: string;
  demandLevel: string;
  industry: string;
  matchScore: number;
}

/**
 * Analyze user data and generate career recommendations
 * @param userData Processed user data from NLP module
 * @returns Array of career recommendations with match scores
 */
export async function generateRecommendations(userData: ProcessedUserData): Promise<CareerRecommendation[]> {
  // Get mock career data (in a real system, this would come from a trained ML model)
  const careers = await getMockCareers();
  
  // Calculate match scores for each career
  const scoredCareers = careers.map(career => {
    // Initial score starts at 0
    let matchScore = 0;
    let maxPossibleScore = 0;
    
    // Skills matching (highest weight)
    const skillWeight = 0.4;
    maxPossibleScore += skillWeight * 100;
    
    const careerSkills = career.requiredSkills as { name: string; importance: number }[];
    const skillScores = careerSkills.map(requiredSkill => {
      const userSkill = userData.skills.find(s => 
        s.name.toLowerCase() === requiredSkill.name.toLowerCase()
      );
      
      if (userSkill) {
        // If user has the skill, award points based on proficiency and skill importance
        return (userSkill.proficiency / 5) * requiredSkill.importance;
      }
      return 0;
    });
    
    // Average the skill scores and apply weight
    const skillScore = skillScores.length > 0 
      ? (skillScores.reduce((sum, score) => sum + score, 0) / skillScores.length) * 100 * skillWeight
      : 0;
    matchScore += skillScore;
    
    // Education matching
    const educationWeight = 0.25;
    maxPossibleScore += educationWeight * 100;
    
    const educationScore = userData.education.reduce((score, edu) => {
      // Check if education field aligns with career field
      const fieldMatch = career.requiredEducation?.some(field => 
        field.toLowerCase().includes(edu.field.toLowerCase()) ||
        edu.field.toLowerCase().includes(field.toLowerCase())
      ) ? 1 : 0.5;
      
      // Education level score (higher degrees get higher scores)
      const levelScore = edu.level / 5;
      
      return score + (fieldMatch * levelScore * edu.weight);
    }, 0);
    
    // Normalize education score and apply weight
    const normalizedEducationScore = userData.education.length > 0 
      ? (educationScore / userData.education.length) * 100 * educationWeight
      : 0;
    matchScore += normalizedEducationScore;
    
    // Experience matching
    const experienceWeight = 0.2;
    maxPossibleScore += experienceWeight * 100;
    
    const experienceScore = userData.experience.reduce((score, exp) => {
      // Check if experience aligns with career industry
      const industryMatch = career.industry.toLowerCase().includes(exp.industry.toLowerCase()) ||
        exp.industry.toLowerCase().includes(career.industry.toLowerCase()) ? 1 : 0.5;
      
      // Experience years score (more years gets higher score, up to a point)
      const yearsScore = Math.min(exp.years / 5, 1);
      
      return score + (industryMatch * yearsScore * exp.weight);
    }, 0);
    
    // Normalize experience score and apply weight
    const normalizedExperienceScore = userData.experience.length > 0 
      ? (experienceScore / userData.experience.length) * 100 * experienceWeight
      : experienceWeight * 50; // Give half points if no experience (entry level)
    matchScore += normalizedExperienceScore;
    
    // Interest matching
    const interestWeight = 0.15;
    maxPossibleScore += interestWeight * 100;
    
    const interestScore = userData.interests.reduce((score, interest) => {
      // Check if interest aligns with career field
      const interestMatch = career.relatedInterests?.some(field => 
        field.toLowerCase().includes(interest.name.toLowerCase()) ||
        interest.name.toLowerCase().includes(field.toLowerCase())
      ) ? 1 : 0.3;
      
      // Interest level score
      const levelScore = interest.level / 5;
      
      return score + (interestMatch * levelScore * interest.weight);
    }, 0);
    
    // Normalize interest score and apply weight
    const normalizedInterestScore = userData.interests.length > 0 
      ? (interestScore / userData.interests.length) * 100 * interestWeight
      : 0;
    matchScore += normalizedInterestScore;
    
    // Adjust for actual proportion of max possible score
    const adjustedScore = (matchScore / maxPossibleScore) * 100;
    
    // Round to nearest integer
    const finalScore = Math.round(adjustedScore);
    
    return {
      careerTitle: career.title,
      description: career.description,
      requiredSkills: career.requiredSkills,
      averageSalary: career.averageSalary,
      demandLevel: career.demandLevel,
      industry: career.industry,
      matchScore: finalScore
    };
  });
  
  // Sort by match score (highest first) and return top results
  return scoredCareers
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5);
}
