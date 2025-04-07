import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { RecommendationWithCareer } from "@shared/schema";
import { Star, Bookmark, BookmarkX, ArrowUpRight } from "lucide-react";
import { getDemandLevelColor, getStarsForScore } from "@/lib/utils";

interface RecommendationSummaryProps {
  recommendation: RecommendationWithCareer;
  userId: number;
}

export function RecommendationSummary({ recommendation, userId }: RecommendationSummaryProps) {
  const { toast } = useToast();

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
    }
  });

  return (
    <Card className="border hover:border-primary transition-all duration-200 card-hover">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <h3 className="font-semibold">{recommendation.career.title}</h3>
              <Badge className={`ml-2 ${getDemandLevelColor(recommendation.career.demandLevel)}`}>
                {recommendation.career.demandLevel} Demand
              </Badge>
              {!recommendation.viewed && (
                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-800 border-blue-200">
                  New
                </Badge>
              )}
            </div>
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
                {recommendation.matchScore}% match
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href={`/recommendations?focus=${recommendation.id}`} onClick={() => viewRecommendation()}>
              <Button
                variant="outline"
                className="text-primary border-primary"
              >
                Details
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant={recommendation.saved ? "destructive" : "default"}
              size="icon"
              onClick={() => toggleSave()}
            >
              {recommendation.saved ? (
                <BookmarkX className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
