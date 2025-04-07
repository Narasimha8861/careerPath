import { 
  User, InsertUser, Skill, InsertSkill, Education, InsertEducation,
  Experience, InsertExperience, Interest, InsertInterest, Career, InsertCareer,
  Recommendation, InsertRecommendation, Feedback, InsertFeedback,
  MarketTrend, InsertMarketTrend, UserProfile, RecommendationWithCareer,
  UserProfileFormValues
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProfile(userId: number, profileData: UserProfileFormValues): Promise<User>;
  markProfileComplete(userId: number): Promise<User>;
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  
  // Skills methods
  getUserSkills(userId: number): Promise<Skill[]>;
  addUserSkill(userId: number, skill: Omit<InsertSkill, 'userId'>): Promise<Skill>;
  clearUserSkills(userId: number): Promise<void>;
  
  // Education methods
  getUserEducation(userId: number): Promise<Education[]>;
  addUserEducation(userId: number, education: Omit<InsertEducation, 'userId'>): Promise<Education>;
  clearUserEducation(userId: number): Promise<void>;
  
  // Experience methods
  getUserExperience(userId: number): Promise<Experience[]>;
  addUserExperience(userId: number, experience: Omit<InsertExperience, 'userId'>): Promise<Experience>;
  clearUserExperience(userId: number): Promise<void>;
  
  // Interests methods
  getUserInterests(userId: number): Promise<Interest[]>;
  addUserInterest(userId: number, interest: Omit<InsertInterest, 'userId'>): Promise<Interest>;
  clearUserInterests(userId: number): Promise<void>;
  
  // Career methods
  getCareer(id: number): Promise<Career | undefined>;
  getCareerByTitle(title: string): Promise<Career | undefined>;
  createCareer(career: InsertCareer): Promise<Career>;
  
  // Recommendation methods
  getRecommendation(id: number): Promise<Recommendation | undefined>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
  getUserRecommendations(userId: number): Promise<RecommendationWithCareer[]>;
  markRecommendationViewed(id: number): Promise<Recommendation>;
  saveRecommendation(id: number, saved: boolean): Promise<Recommendation>;
  
  // Feedback methods
  addFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getRecommendationFeedback(recommendationId: number): Promise<Feedback | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private skills: Map<number, Skill>;
  private educations: Map<number, Education>;
  private experiences: Map<number, Experience>;
  private interests: Map<number, Interest>;
  private careers: Map<number, Career>;
  private recommendations: Map<number, Recommendation>;
  private feedbacks: Map<number, Feedback>;
  private marketTrends: Map<number, MarketTrend>;
  
  private userIdCounter: number;
  private skillIdCounter: number;
  private educationIdCounter: number;
  private experienceIdCounter: number;
  private interestIdCounter: number;
  private careerIdCounter: number;
  private recommendationIdCounter: number;
  private feedbackIdCounter: number;
  private trendIdCounter: number;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.educations = new Map();
    this.experiences = new Map();
    this.interests = new Map();
    this.careers = new Map();
    this.recommendations = new Map();
    this.feedbacks = new Map();
    this.marketTrends = new Map();
    
    this.userIdCounter = 1;
    this.skillIdCounter = 1;
    this.educationIdCounter = 1;
    this.experienceIdCounter = 1;
    this.interestIdCounter = 1;
    this.careerIdCounter = 1;
    this.recommendationIdCounter = 1;
    this.feedbackIdCounter = 1;
    this.trendIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUserProfile(userId: number, profileData: UserProfileFormValues): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const updatedUser: User = {
      ...user,
      name: profileData.name,
      email: profileData.email,
      age: profileData.age,
      location: profileData.location
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async markProfileComplete(userId: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    const updatedUser: User = {
      ...user,
      profileComplete: true
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    const user = await this.getUser(userId);
    if (!user) {
      return undefined;
    }
    
    const skills = await this.getUserSkills(userId);
    const education = await this.getUserEducation(userId);
    const experience = await this.getUserExperience(userId);
    const interests = await this.getUserInterests(userId);
    
    return {
      user,
      skills,
      education,
      experience,
      interests
    };
  }
  
  // Skills methods
  async getUserSkills(userId: number): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(
      (skill) => skill.userId === userId
    );
  }

  async addUserSkill(userId: number, skill: Omit<InsertSkill, 'userId'>): Promise<Skill> {
    const id = this.skillIdCounter++;
    const newSkill: Skill = { 
      id, 
      userId, 
      skillName: skill.skillName, 
      proficiencyLevel: skill.proficiencyLevel 
    };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  async clearUserSkills(userId: number): Promise<void> {
    const userSkills = await this.getUserSkills(userId);
    userSkills.forEach(skill => {
      this.skills.delete(skill.id);
    });
  }
  
  // Education methods
  async getUserEducation(userId: number): Promise<Education[]> {
    return Array.from(this.educations.values()).filter(
      (education) => education.userId === userId
    );
  }

  async addUserEducation(userId: number, education: Omit<InsertEducation, 'userId'>): Promise<Education> {
    const id = this.educationIdCounter++;
    const newEducation: Education = { 
      id, 
      userId, 
      institution: education.institution,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,
      startYear: education.startYear,
      endYear: education.endYear,
      current: education.current ?? false
    };
    this.educations.set(id, newEducation);
    return newEducation;
  }

  async clearUserEducation(userId: number): Promise<void> {
    const userEducations = await this.getUserEducation(userId);
    userEducations.forEach(education => {
      this.educations.delete(education.id);
    });
  }
  
  // Experience methods
  async getUserExperience(userId: number): Promise<Experience[]> {
    return Array.from(this.experiences.values()).filter(
      (experience) => experience.userId === userId
    );
  }

  async addUserExperience(userId: number, experience: Omit<InsertExperience, 'userId'>): Promise<Experience> {
    const id = this.experienceIdCounter++;
    const newExperience: Experience = { 
      id, 
      userId, 
      company: experience.company,
      position: experience.position,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current ?? false,
      description: experience.description
    };
    this.experiences.set(id, newExperience);
    return newExperience;
  }

  async clearUserExperience(userId: number): Promise<void> {
    const userExperiences = await this.getUserExperience(userId);
    userExperiences.forEach(experience => {
      this.experiences.delete(experience.id);
    });
  }
  
  // Interests methods
  async getUserInterests(userId: number): Promise<Interest[]> {
    return Array.from(this.interests.values()).filter(
      (interest) => interest.userId === userId
    );
  }

  async addUserInterest(userId: number, interest: Omit<InsertInterest, 'userId'>): Promise<Interest> {
    const id = this.interestIdCounter++;
    const newInterest: Interest = { 
      id, 
      userId, 
      interestName: interest.interestName, 
      interestLevel: interest.interestLevel 
    };
    this.interests.set(id, newInterest);
    return newInterest;
  }

  async clearUserInterests(userId: number): Promise<void> {
    const userInterests = await this.getUserInterests(userId);
    userInterests.forEach(interest => {
      this.interests.delete(interest.id);
    });
  }
  
  // Career methods
  async getCareer(id: number): Promise<Career | undefined> {
    return this.careers.get(id);
  }

  async getCareerByTitle(title: string): Promise<Career | undefined> {
    return Array.from(this.careers.values()).find(
      (career) => career.title.toLowerCase() === title.toLowerCase()
    );
  }

  async createCareer(career: InsertCareer): Promise<Career> {
    const id = this.careerIdCounter++;
    const newCareer: Career = { ...career, id };
    this.careers.set(id, newCareer);
    return newCareer;
  }
  
  // Recommendation methods
  async getRecommendation(id: number): Promise<Recommendation | undefined> {
    return this.recommendations.get(id);
  }

  async createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation> {
    const id = this.recommendationIdCounter++;
    const timestamp = new Date();
    const newRecommendation: Recommendation = { 
      ...recommendation, 
      id, 
      timestamp 
    };
    this.recommendations.set(id, newRecommendation);
    return newRecommendation;
  }

  async getUserRecommendations(userId: number): Promise<RecommendationWithCareer[]> {
    const userRecommendations = Array.from(this.recommendations.values()).filter(
      (recommendation) => recommendation.userId === userId
    );
    
    return Promise.all(
      userRecommendations.map(async (recommendation) => {
        const career = await this.getCareer(recommendation.careerId);
        return {
          ...recommendation,
          career: career!
        };
      })
    );
  }

  async markRecommendationViewed(id: number): Promise<Recommendation> {
    const recommendation = await this.getRecommendation(id);
    if (!recommendation) {
      throw new Error(`Recommendation with ID ${id} not found`);
    }
    
    const updatedRecommendation: Recommendation = {
      ...recommendation,
      viewed: true
    };
    
    this.recommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }

  async saveRecommendation(id: number, saved: boolean): Promise<Recommendation> {
    const recommendation = await this.getRecommendation(id);
    if (!recommendation) {
      throw new Error(`Recommendation with ID ${id} not found`);
    }
    
    const updatedRecommendation: Recommendation = {
      ...recommendation,
      saved
    };
    
    this.recommendations.set(id, updatedRecommendation);
    return updatedRecommendation;
  }
  
  // Feedback methods
  async addFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackIdCounter++;
    const timestamp = new Date();
    const newFeedback: Feedback = { ...feedback, id, timestamp };
    this.feedbacks.set(id, newFeedback);
    return newFeedback;
  }

  async getRecommendationFeedback(recommendationId: number): Promise<Feedback | undefined> {
    return Array.from(this.feedbacks.values()).find(
      (feedback) => feedback.recommendationId === recommendationId
    );
  }
}

export const storage = new MemStorage();
