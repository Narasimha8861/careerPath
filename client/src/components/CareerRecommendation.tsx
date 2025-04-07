import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  RecommendationWithCareer, 
  Skill, 
  Feedback,
  feedbackFormSchema
} from "@shared/schema";
import { Star, Bookmark, BookmarkX, School, ChevronDown, ChevronUp } from "lucide-react";
import { getDemandLevelColor, getStarsForScore } from "@/lib/utils";
import { FeedbackForm } from "@/components/FeedbackForm";

interface CareerRecommendationProps {
  recommendation: RecommendationWithCareer;
  userId: number;
  userSkills: Skill[];
  onUpdate: () => void;
}

export function CareerRecommendation({ 
  recommendation, 
  userId, 
  userSkills,
  onUpdate
}: CareerRecommendationProps) {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  // Parse required skills from JSON
  const requiredSkills = recommendation.career.requiredSkills as any[];
  
  // Check which user skills match the required skills
  const matchingSkills = userSkills.filter(userSkill => 
    requiredSkills.some(reqSkill => 
      reqSkill.name.toLowerCase() === userSkill.skillName.toLowerCase()
    )
  );
  
  // Skill gaps (required skills that user doesn't have)
  const skillGaps = requiredSkills.filter(reqSkill => 
    !userSkills.some(userSkill => 
      reqSkill.name.toLowerCase() === userSkill.skillName.toLowerCase()
    )
  );

  // Toggle save recommendation
  const { mutate: toggleSave } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/recommendation/${recommendation.id}/save`, {
        saved: !recommendation.saved
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: recommendation.saved ? "Recommendation removed" : "Recommendation saved",
        description: recommendation.saved 
          ? "The career has been removed from your saved list" 
          : "The career has been added to your saved list",
      });
      onUpdate();
    },
    onError: (error) => {
      toast({
        title: "Action failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    },
  });

  // View recommendation details
  const { mutate: viewRecommendation } = useMutation({
    mutationFn: async () => {
      if (recommendation.viewed) return null;
      const response = await apiRequest("POST", `/api/recommendation/${recommendation.id}/viewed`, {});
      return response.json();
    },
    onSuccess: () => {
      if (!recommendation.viewed) {
        onUpdate();
      }
    }
  });

  // Submit feedback
  const handleFeedbackSubmit = async (feedback: any) => {
    try {
      await apiRequest("POST", "/api/feedback", {
        userId,
        recommendationId: recommendation.id,
        ...feedback
      });
      
      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback. It helps improve our recommendations.",
      });
      
      setShowFeedbackForm(false);
    } catch (error) {
      toast({
        title: "Failed to submit feedback",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    }
  };

  const toggleExpand = () => {
    if (!expanded) {
      viewRecommendation();
    }
    setExpanded(!expanded);
  };

  return (
    <Card className={`border transition-all duration-200 ${expanded ? "" : "hover:border-primary cursor-pointer"}`}>
      <CardContent className="p-0">
        <div 
          className="p-4 md:p-6"
          onClick={expanded ? undefined : toggleExpand}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{recommendation.career.title}</h3>
                <Badge className={`ml-2 ${getDemandLevelColor(recommendation.career.demandLevel)}`}>
                  {recommendation.career.demandLevel} Demand
                </Badge>
                {!recommendation.viewed && (
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-800 border-blue-200">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground mt-1">{recommendation.career.averageSalary}</p>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < getStarsForScore(recommendation.matchScore) 
                        ? "text-secondary fill-secondary" 
                        : "text-gray-200"}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {recommendation.matchScore}% match with your profile
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className="text-primary border-primary"
                onClick={toggleExpand}
              >
                {expanded ? (
                  <>
                    <ChevronUp className="mr-1 h-4 w-4" />
                    Less Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="mr-1 h-4 w-4" />
                    More Details
                  </>
                )}
              </Button>
              <Button
                variant={recommendation.saved ? "destructive" : "default"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSave();
                }}
              >
                {recommendation.saved ? (
                  <>
                    <BookmarkX className="mr-1 h-4 w-4" />
                    Unsave
                  </>
                ) : (
                  <>
                    <Bookmark className="mr-1 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {/* Expanded content */}
          {expanded && (
            <div className="mt-6 border-t pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Career Description</h4>
                  <p className="text-muted-foreground">
                    {recommendation.career.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {requiredSkills.map((skill, index) => {
                      const isMatching = matchingSkills.some(
                        s => s.skillName.toLowerCase() === skill.name.toLowerCase()
                      );
                      
                      return (
                        <Badge 
                          key={index} 
                          variant={isMatching ? "default" : "outline"}
                          className={isMatching ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                        >
                          {skill.name}
                          {isMatching && " ✓"}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                {skillGaps.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Skills to Develop</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Acquiring these skills could improve your match for this career:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skillGaps.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          className="border-amber-300 text-amber-700"
                        >
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <School className="h-4 w-4 mr-1" />
                    Recommended Courses
                  </h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-1">
                    {requiredSkills.slice(0, 3).map((skill, index) => (
                      <li key={index}>
                        {skill.name} Certification or Advanced Training
                      </li>
                    ))}
                    <li>Career-specific Professional Development</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Industry Information</h4>
                  <p className="text-sm text-muted-foreground">
                    This career is in the <strong>{recommendation.career.industry}</strong> industry, 
                    which currently has <strong>{recommendation.career.demandLevel} demand</strong> for qualified professionals.
                    Typical salary ranges are <strong>{recommendation.career.averageSalary}</strong> depending on 
                    experience and location.
                  </p>
                </div>
                
                {/* Feedback section */}
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">How accurate is this recommendation?</h4>
                  {showFeedbackForm ? (
                    <FeedbackForm 
                      onSubmit={handleFeedbackSubmit}
                      onCancel={() => setShowFeedbackForm(false)}
                    />
                  ) : (
                    <Button 
                      variant="ghost" 
                      className="text-primary"
                      onClick={() => setShowFeedbackForm(true)}
                    >
                      Provide Feedback
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
