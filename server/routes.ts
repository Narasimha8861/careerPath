import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  userProfileFormSchema, 
  skillsFormSchema, 
  educationFormSchema, 
  experienceFormSchema, 
  interestsFormSchema,
  feedbackFormSchema,
  insertUserSchema,
  insertRecommendationSchema,
  insertFeedbackSchema
} from "@shared/schema";
import { generateRecommendations } from "./ai/recommendationEngine";
import { processUserData } from "./ai/nlpProcessor";
import { getMarketTrends } from "./ai/mockData";

export async function registerRoutes(app: Express): Promise<Server> {
  // User profile routes
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.get("/api/profile/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const profile = await storage.getUserProfile(userId);
      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user profile" });
    }
  });

  // Form submission routes
  app.post("/api/profile/basic", async (req: Request, res: Response) => {
    try {
      const { userId, ...profileData } = req.body;
      const validatedData = userProfileFormSchema.parse(profileData);
      const updatedUser = await storage.updateUserProfile(parseInt(userId), validatedData);
      res.json(updatedUser);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid profile data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update profile" });
      }
    }
  });

  app.post("/api/profile/skills", async (req: Request, res: Response) => {
    try {
      const { userId, skills } = req.body;
      const validatedData = skillsFormSchema.parse({ skills });
      await storage.clearUserSkills(parseInt(userId));
      const savedSkills = await Promise.all(
        validatedData.skills.map(skill => 
          storage.addUserSkill(parseInt(userId), skill)
        )
      );
      res.json(savedSkills);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid skills data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save skills" });
      }
    }
  });

  app.post("/api/profile/education", async (req: Request, res: Response) => {
    try {
      const { userId, educations } = req.body;
      const validatedData = educationFormSchema.parse({ educations });
      await storage.clearUserEducation(parseInt(userId));
      const savedEducation = await Promise.all(
        validatedData.educations.map(edu => 
          storage.addUserEducation(parseInt(userId), edu)
        )
      );
      res.json(savedEducation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid education data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save education" });
      }
    }
  });

  app.post("/api/profile/experience", async (req: Request, res: Response) => {
    try {
      const { userId, experiences } = req.body;
      const validatedData = experienceFormSchema.parse({ experiences });
      await storage.clearUserExperience(parseInt(userId));
      if (validatedData.experiences && validatedData.experiences.length > 0) {
        const savedExperience = await Promise.all(
          validatedData.experiences.map(exp => 
            storage.addUserExperience(parseInt(userId), exp)
          )
        );
        res.json(savedExperience);
      } else {
        res.json([]);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid experience data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save experience" });
      }
    }
  });

  app.post("/api/profile/interests", async (req: Request, res: Response) => {
    try {
      const { userId, interests } = req.body;
      const validatedData = interestsFormSchema.parse({ interests });
      await storage.clearUserInterests(parseInt(userId));
      const savedInterests = await Promise.all(
        validatedData.interests.map(interest => 
          storage.addUserInterest(parseInt(userId), interest)
        )
      );
      
      // Mark profile as complete
      await storage.markProfileComplete(parseInt(userId));
      
      res.json(savedInterests);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid interests data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save interests" });
      }
    }
  });

  // Recommendations routes
  app.post("/api/recommendations/generate", async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      
      // Get user profile data
      const userProfile = await storage.getUserProfile(parseInt(userId));
      if (!userProfile) {
        return res.status(404).json({ message: "User profile not found" });
      }

      // Process user data with NLP
      const processedData = await processUserData(userProfile);
      
      // Generate recommendations
      const recommendations = await generateRecommendations(processedData);
      
      // Save recommendations to storage
      const savedRecommendations = await Promise.all(
        recommendations.map(async (rec) => {
          // Check if career exists, if not create it
          let career = await storage.getCareerByTitle(rec.careerTitle);
          if (!career) {
            career = await storage.createCareer({
              title: rec.careerTitle,
              description: rec.description,
              requiredSkills: rec.requiredSkills,
              averageSalary: rec.averageSalary,
              demandLevel: rec.demandLevel,
              industry: rec.industry
            });
          }
          
          // Create recommendation
          const recData = {
            userId: parseInt(userId),
            careerId: career.id,
            matchScore: rec.matchScore,
            viewed: false,
            saved: false
          };
          
          return storage.createRecommendation(recData);
        })
      );
      
      // Get complete recommendation data with career details
      const completeRecommendations = await Promise.all(
        savedRecommendations.map(async (rec) => {
          const career = await storage.getCareer(rec.careerId);
          return {
            ...rec,
            career
          };
        })
      );
      
      res.json(completeRecommendations);
    } catch (error) {
      console.error("Recommendation generation error:", error);
      res.status(500).json({ message: "Failed to generate recommendations" });
    }
  });

  app.get("/api/recommendations/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const recommendations = await storage.getUserRecommendations(userId);
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  app.post("/api/recommendation/:recommendationId/viewed", async (req: Request, res: Response) => {
    try {
      const recommendationId = parseInt(req.params.recommendationId);
      const recommendation = await storage.markRecommendationViewed(recommendationId);
      res.json(recommendation);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark recommendation as viewed" });
    }
  });

  app.post("/api/recommendation/:recommendationId/save", async (req: Request, res: Response) => {
    try {
      const recommendationId = parseInt(req.params.recommendationId);
      const { saved } = req.body;
      const recommendation = await storage.saveRecommendation(recommendationId, saved);
      res.json(recommendation);
    } catch (error) {
      res.status(500).json({ message: "Failed to save recommendation" });
    }
  });

  // Feedback routes
  app.post("/api/feedback", async (req: Request, res: Response) => {
    try {
      const feedbackData = req.body;
      const validatedData = feedbackFormSchema.parse(feedbackData);
      const feedback = await storage.addFeedback({
        userId: feedbackData.userId,
        recommendationId: feedbackData.recommendationId,
        rating: validatedData.rating,
        comments: validatedData.comments
      });
      res.json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid feedback data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to save feedback" });
      }
    }
  });

  // Market trends routes
  app.get("/api/market-trends", async (_req: Request, res: Response) => {
    try {
      const trends = await getMarketTrends();
      res.json(trends);
    } catch (error) {
      res.status(500).json({ message: "Failed to get market trends" });
    }
  });

  // Auth route (for demo purposes - would need proper auth)
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
      }
      
      const user = await storage.createUser({
        ...userData,
        profileComplete: false
      });
      
      res.status(201).json({
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        profileComplete: user.profileComplete
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Registration failed" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
