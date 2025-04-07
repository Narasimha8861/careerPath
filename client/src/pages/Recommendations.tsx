import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2, Filter, RefreshCw, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Skill, Career, RecommendationWithCareer } from "@shared/schema";
import { CareerRecommendation } from "@/components/CareerRecommendation";

const Recommendations = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("matchScore");
  const [filterBy, setFilterBy] = useState<string>("all");

  // Parse query params
  const shouldGenerate = search && new URLSearchParams(search).get("generate") === "true";

  // Check if user is logged in
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        setLocation("/profile");
      }
    } else {
      setLocation("/profile");
    }
  }, [setLocation]);

  // Get user profile data
  const { data: profile } = useQuery({
    queryKey: userId ? [`/api/profile/${userId}`] : null,
    enabled: !!userId,
  });

  // Get existing recommendations
  const { 
    data: recommendations, 
    isLoading: isLoadingRecommendations,
    refetch: refetchRecommendations
  } = useQuery({
    queryKey: userId ? [`/api/recommendations/${userId}`] : null,
    enabled: !!userId,
  });

  // Generate recommendations mutation
  const { mutate: generateRecommendations, isPending: isGenerating } = useMutation({
    mutationFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const response = await apiRequest("POST", "/api/recommendations/generate", { userId });
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData([`/api/recommendations/${userId}`], data);
      toast({
        title: "Recommendations generated",
        description: `We found ${data.length} career paths that match your profile.`,
      });
      
      // Remove generate param from URL
      setLocation("/recommendations");
    },
    onError: (error) => {
      toast({
        title: "Failed to generate recommendations",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    },
  });

  // Generate recommendations if query param is present
  useEffect(() => {
    if (userId && shouldGenerate) {
      generateRecommendations();
    }
  }, [userId, shouldGenerate, generateRecommendations]);

  // Filter and sort recommendations
  const filteredAndSortedRecommendations = recommendations
    ? [...recommendations]
        .filter(rec => {
          if (filterBy === "all") return true;
          if (filterBy === "saved") return rec.saved;
          if (filterBy === "highDemand") return rec.career.demandLevel === "High";
          if (filterBy === "mediumDemand") return rec.career.demandLevel === "Medium";
          if (filterBy === "lowDemand") return rec.career.demandLevel === "Low";
          return true;
        })
        .sort((a, b) => {
          if (sortBy === "matchScore") return b.matchScore - a.matchScore;
          if (sortBy === "demandLevel") {
            const demandOrder = { "High": 3, "Medium": 2, "Low": 1 };
            return demandOrder[b.career.demandLevel as keyof typeof demandOrder] - 
                  demandOrder[a.career.demandLevel as keyof typeof demandOrder];
          }
          if (sortBy === "salary") {
            const getSalaryAvg = (salaryRange: string) => {
              const matches = salaryRange.match(/\$(\d+),(\d+)/g);
              if (!matches) return 0;
              
              const numbers = matches.map(match => {
                return parseInt(match.replace(/\$|,/g, ""));
              });
              
              return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
            };
            
            return getSalaryAvg(b.career.averageSalary) - getSalaryAvg(a.career.averageSalary);
          }
          return 0;
        })
    : [];

  // If no user is logged in, redirect to profile page
  if (!userId) {
    return null;
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Career Recommendations</h1>
        
        <Button
          variant="outline"
          onClick={() => generateRecommendations()}
          disabled={isGenerating}
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Generate New Recommendations
        </Button>
      </div>
      
      {!profile?.user.profileComplete && (
        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              <p className="text-amber-800">
                Complete your profile to get more accurate career recommendations.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto"
                onClick={() => setLocation("/profile")}
              >
                Complete Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {isLoadingRecommendations || isGenerating ? (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="loading-spinner mb-4"></div>
          <p className="text-lg text-center">
            {isGenerating 
              ? "Analyzing your profile and market trends..." 
              : "Loading your career recommendations..."}
          </p>
          <p className="text-sm text-muted-foreground text-center mt-2">
            This may take a moment as we process your skills, education, and interests.
          </p>
        </div>
      ) : recommendations && recommendations.length > 0 ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <p className="text-muted-foreground">
              Found {filteredAndSortedRecommendations.length} career recommendations that match your profile.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recommendations</SelectItem>
                    <SelectItem value="saved">Saved Careers</SelectItem>
                    <SelectItem value="highDemand">High Demand</SelectItem>
                    <SelectItem value="mediumDemand">Medium Demand</SelectItem>
                    <SelectItem value="lowDemand">Low Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-muted-foreground"
                >
                  <path d="m3 16 4 4 4-4"/>
                  <path d="M7 20V4"/>
                  <path d="m21 8-4-4-4 4"/>
                  <path d="M17 4v16"/>
                </svg>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matchScore">Match Score</SelectItem>
                    <SelectItem value="demandLevel">Demand Level</SelectItem>
                    <SelectItem value="salary">Salary Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredAndSortedRecommendations.map((recommendation) => (
              <CareerRecommendation
                key={recommendation.id}
                recommendation={recommendation}
                userId={userId}
                userSkills={profile?.skills || []}
                onUpdate={() => refetchRecommendations()}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">No recommendations yet</h2>
          <p className="text-muted-foreground mb-8">
            Generate your first set of career recommendations based on your profile.
          </p>
          <Button onClick={() => generateRecommendations()} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              "Generate Recommendations"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
