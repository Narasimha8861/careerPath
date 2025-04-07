import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  age: integer("age"),
  location: text("location"),
  profileComplete: boolean("profile_complete").default(false),
});

// Skills model
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  skillName: text("skill_name").notNull(),
  proficiencyLevel: integer("proficiency_level").notNull(),
});

// Education model
export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  fieldOfStudy: text("field_of_study").notNull(),
  startYear: integer("start_year").notNull(),
  endYear: integer("end_year"),
  current: boolean("current").default(false),
});

// Experience model
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  current: boolean("current").default(false),
  description: text("description"),
});

// Interests model
export const interests = pgTable("interests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  interestName: text("interest_name").notNull(),
  interestLevel: integer("interest_level").notNull(),
});

// Career model
export const careers = pgTable("careers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requiredSkills: jsonb("required_skills").notNull(),
  averageSalary: text("average_salary").notNull(),
  demandLevel: text("demand_level").notNull(),
  industry: text("industry").notNull(),
});

// Recommendations model
export const recommendations = pgTable("recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  careerId: integer("career_id").notNull(),
  matchScore: integer("match_score").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
  viewed: boolean("viewed").default(false),
  saved: boolean("saved").default(false),
});

// Feedback model
export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  recommendationId: integer("recommendation_id").notNull(),
  rating: integer("rating").notNull(),
  comments: text("comments"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Market trends model
export const marketTrends = pgTable("market_trends", {
  id: serial("id").primaryKey(),
  industry: text("industry").notNull(),
  growth: text("growth").notNull(),
  demand: text("demand").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// Schema types and validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  age: true,
  location: true,
  profileComplete: true,
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  userId: true,
  skillName: true,
  proficiencyLevel: true,
});

export const insertEducationSchema = createInsertSchema(education).pick({
  userId: true,
  institution: true,
  degree: true,
  fieldOfStudy: true,
  startYear: true,
  endYear: true,
  current: true,
});

export const insertExperienceSchema = createInsertSchema(experience).pick({
  userId: true,
  company: true,
  position: true,
  startDate: true,
  endDate: true,
  current: true,
  description: true,
});

export const insertInterestSchema = createInsertSchema(interests).pick({
  userId: true,
  interestName: true,
  interestLevel: true,
});

export const insertCareerSchema = createInsertSchema(careers).pick({
  title: true,
  description: true,
  requiredSkills: true,
  averageSalary: true,
  demandLevel: true,
  industry: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).pick({
  userId: true,
  careerId: true,
  matchScore: true,
  viewed: true,
  saved: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).pick({
  userId: true,
  recommendationId: true,
  rating: true,
  comments: true,
});

export const insertMarketTrendSchema = createInsertSchema(marketTrends).pick({
  industry: true,
  growth: true,
  demand: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type Education = typeof education.$inferSelect;
export type InsertEducation = z.infer<typeof insertEducationSchema>;

export type Experience = typeof experience.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;

export type Interest = typeof interests.$inferSelect;
export type InsertInterest = z.infer<typeof insertInterestSchema>;

export type Career = typeof careers.$inferSelect;
export type InsertCareer = z.infer<typeof insertCareerSchema>;

export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;

export type MarketTrend = typeof marketTrends.$inferSelect;
export type InsertMarketTrend = z.infer<typeof insertMarketTrendSchema>;

// Frontend form types
export const userProfileFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.coerce.number().min(16, "Must be at least 16 years old").max(100, "Must be under 100 years old"),
  location: z.string().min(1, "Location is required"),
});

export const skillsFormSchema = z.object({
  skills: z.array(
    z.object({
      skillName: z.string().min(1, "Skill name is required"),
      proficiencyLevel: z.number().min(1).max(5)
    })
  ).min(1, "At least one skill is required")
});

export const educationFormSchema = z.object({
  educations: z.array(
    z.object({
      institution: z.string().min(1, "Institution name is required"),
      degree: z.string().min(1, "Degree is required"),
      fieldOfStudy: z.string().min(1, "Field of study is required"),
      startYear: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear(), "Year cannot be in the future"),
      endYear: z.coerce.number().min(1900, "Invalid year").max(new Date().getFullYear() + 10, "Year seems too far in the future").optional(),
      current: z.boolean().default(false)
    })
  ).min(1, "At least one education entry is required")
});

export const experienceFormSchema = z.object({
  experiences: z.array(
    z.object({
      company: z.string().min(1, "Company name is required"),
      position: z.string().min(1, "Position is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().optional(),
      current: z.boolean().default(false),
      description: z.string().optional()
    })
  ).optional()
});

export const interestsFormSchema = z.object({
  interests: z.array(
    z.object({
      interestName: z.string().min(1, "Interest name is required"),
      interestLevel: z.number().min(1).max(5)
    })
  ).min(1, "At least one interest is required")
});

export const feedbackFormSchema = z.object({
  rating: z.number().min(1).max(5),
  comments: z.string().optional()
});

export type UserProfileFormValues = z.infer<typeof userProfileFormSchema>;
export type SkillsFormValues = z.infer<typeof skillsFormSchema>;
export type EducationFormValues = z.infer<typeof educationFormSchema>;
export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;
export type InterestsFormValues = z.infer<typeof interestsFormSchema>;
export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

// UserProfile type combining all user data
export type UserProfile = {
  user: User;
  skills: Skill[];
  education: Education[];
  experience: Experience[];
  interests: Interest[];
};

// RecommendationWithCareer type for combined recommendations data
export type RecommendationWithCareer = Recommendation & {
  career: Career;
};
