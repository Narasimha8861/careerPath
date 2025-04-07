import { Link } from "wouter";
import { UserProfile, RecommendationWithCareer, MarketTrend } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, BriefcaseBusiness, Lightbulb, 
  Star, ArrowUpRight, User
} from "lucide-react";
import { calculateProfileCompleteness, getDemandLevelColor } from "@/lib/utils";

interface DashboardCardsProps {
  profile: UserProfile | undefined;
  recommendations: RecommendationWithCareer[];
  marketTrends: MarketTrend[];
}

export function DashboardCards({ profile, recommendations, marketTrends }: DashboardCardsProps) {
  const completionPercentage = profile ? calculateProfileCompleteness(profile) : 0;
  
  // Get top 3 skills by proficiency level
  const topSkills = profile?.skills
    ?.sort((a, b) => b.proficiencyLevel - a.proficiencyLevel)
    .slice(0, 3) || [];
  
  // Get top 3 recommendations by match score
  const topRecommendations = recommendations
    ?.sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3) || [];
  
  // Get trending industries
  const growingIndustries = marketTrends
    ?.filter(trend => trend.growth === "Growing")
    .slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Profile Summary Card */}
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <User className="h-5 w-5 mr-2 text-primary" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Profile Completion</p>
              <Progress value={completionPercentage} className="h-2 mt-1" />
              <p className="text-xs text-right mt-1 text-neutral-500">
                {completionPercentage}% Complete
              </p>
            </div>
            
            <div className="py-2">
              <h4 className="font-medium text-sm mb-2">Top Skills</h4>
              {topSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {topSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill.skillName}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No skills added yet. Add skills to get better recommendations.
                </p>
              )}
            </div>
            
            <Link href="/profile">
              <a className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                Edit Your Profile
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </a>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Lightbulb className="h-5 w-5 mr-2 text-secondary" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Based on your profile, we've identified {recommendations?.length || 0} potential career paths.
          </p>
          
          <div className="space-y-3">
            {topRecommendations.length > 0 ? (
              topRecommendations.map((rec, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{rec.career.title}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.round(rec.matchScore / 20) 
                              ? "text-secondary fill-secondary" 
                              : "text-gray-200"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground ml-1">
                        {rec.matchScore}% match
                      </span>
                    </div>
                  </div>
                  <Badge className={getDemandLevelColor(rec.career.demandLevel)}>
                    {rec.career.demandLevel} Demand
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground py-4">
                No recommendations yet. Complete your profile to get personalized career suggestions.
              </p>
            )}
          </div>
          
          <Link href="/recommendations">
            <a className="mt-4 inline-block text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              View All Recommendations
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
          </Link>
        </CardContent>
      </Card>

      {/* Market Trends Card */}
      <Card className="card-hover">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Market Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Current insights based on job market analysis.
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">In-Demand Skills</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">Machine Learning</Badge>
                <Badge variant="outline">Cloud Computing</Badge>
                <Badge variant="outline">Data Analysis</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Growing Industries</h4>
              <ul className="mt-2 text-sm space-y-2">
                {growingIndustries.length > 0 ? (
                  growingIndustries.map((industry, index) => (
                    <li key={index} className="flex items-center">
                      <BriefcaseBusiness className="h-4 w-4 mr-2 text-green-500" />
                      {industry.industry}
                    </li>
                  ))
                ) : (
                  <li className="text-muted-foreground">No trend data available</li>
                )}
              </ul>
            </div>
          </div>
          
          <Link href="/market-trends">
            <a className="mt-4 inline-block text-primary hover:text-primary/80 text-sm font-medium flex items-center">
              Explore Market Trends
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </a>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
