import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OnboardingSection from "@/components/OnboardingSection";
import { DashboardCards } from "@/components/DashboardCards";
import { RecommendationSummary } from "@/components/RecommendationSummary";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState<number | null>(null);
  const [isNewUser, setIsNewUser] = useState(true);

  // Simulate user authentication - in a real app, this would come from an auth context
  useEffect(() => {
    // Check if there's a user in localStorage (simulating auth)
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
        setIsNewUser(!user.profileComplete);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Clear invalid data
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Get user profile data
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: userId ? [`/api/profile/${userId}`] : null,
    enabled: !!userId && !isNewUser,
  });

  // Get user recommendations
  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: userId ? [`/api/recommendations/${userId}`] : null,
    enabled: !!userId && !isNewUser,
  });

  // Get market trends
  const { data: marketTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ["/api/market-trends"],
    enabled: !!userId && !isNewUser,
  });

  const isLoading = profileLoading || recommendationsLoading || trendsLoading;
  const noRecommendations = !recommendationsLoading && recommendations && recommendations.length === 0;

  const handleOnboardingComplete = () => {
    setIsNewUser(false);
    // Update user profile completion status in localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.profileComplete = true;
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    }
    toast({
      title: "Profile complete!",
      description: "Your profile has been set up successfully.",
    });
  };

  const handleGenerateRecommendations = () => {
    if (!userId) return;
    
    setLocation(`/recommendations?generate=true`);
  };

  // If no user is logged in, redirect to profile page for login/signup
  if (!userId) {
    setLocation("/profile");
    return null;
  }

  return (
    <div className="py-6">
      {isNewUser ? (
        <OnboardingSection userId={userId} onComplete={handleOnboardingComplete} />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading your personalized dashboard...</span>
            </div>
          ) : (
            <>
              <DashboardCards 
                profile={profile} 
                recommendations={recommendations || []} 
                marketTrends={marketTrends || []} 
              />
              
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Career Recommendations</h2>
                  <Button 
                    onClick={handleGenerateRecommendations}
                    variant="outline"
                    className="text-primary hover:text-primary-foreground hover:bg-primary flex items-center gap-2"
                  >
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
                    >
                      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                      <path d="M3 3v5h5" />
                      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                      <path d="M16 16h5v5" />
                    </svg>
                    Generate New Recommendations
                  </Button>
                </div>

                {noRecommendations ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      You don't have any career recommendations yet.
                    </p>
                    <Button onClick={handleGenerateRecommendations}>
                      Generate Recommendations
                    </Button>
                  </div>
                ) : (
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Recommendations</TabsTrigger>
                      <TabsTrigger value="saved">Saved Careers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <div className="space-y-4">
                        {recommendations && recommendations.map((recommendation) => (
                          <RecommendationSummary
                            key={recommendation.id} 
                            recommendation={recommendation} 
                            userId={userId}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value="saved">
                      <div className="space-y-4">
                        {recommendations && recommendations
                          .filter(rec => rec.saved)
                          .map((recommendation) => (
                            <RecommendationSummary
                              key={recommendation.id} 
                              recommendation={recommendation} 
                              userId={userId}
                            />
                          ))}
                        
                        {recommendations && recommendations.filter(rec => rec.saved).length === 0 && (
                          <p className="text-center py-8 text-muted-foreground">
                            You haven't saved any career recommendations yet.
                          </p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
