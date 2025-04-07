import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketTrendsChart } from "@/components/MarketTrendsChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, ArrowUpCircle, ArrowDownCircle, MinusCircle } from "lucide-react";

const MarketTrends = () => {
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState<number | null>(null);
  
  // Check if user is logged in
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserId(user.id);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      setLocation("/profile");
    }
  }, [setLocation]);

  // Fetch market trends data
  const { data: marketTrends, isLoading } = useQuery({
    queryKey: ["/api/market-trends"],
    enabled: !!userId,
  });

  // If no user is logged in, redirect to profile page
  if (!userId) {
    return null;
  }

  // Group industries by growth type
  const growingIndustries = marketTrends?.filter(trend => trend.growth === "Growing") || [];
  const stableIndustries = marketTrends?.filter(trend => trend.growth === "Stable") || [];
  const decliningIndustries = marketTrends?.filter(trend => trend.growth === "Declining") || [];

  // Group industries by demand
  const highDemandIndustries = marketTrends?.filter(trend => trend.demand === "High") || [];
  const mediumDemandIndustries = marketTrends?.filter(trend => trend.demand === "Medium") || [];
  const lowDemandIndustries = marketTrends?.filter(trend => trend.demand === "Low") || [];

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Market Trends</h1>

      {isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading market trends data...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Growing Industries
                </CardTitle>
                <CardDescription>Industries with positive growth trajectory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {growingIndustries.map((industry, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-200">
                      {industry.industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <MinusCircle className="h-5 w-5 mr-2 text-amber-500" />
                  Stable Industries
                </CardTitle>
                <CardDescription>Industries maintaining consistent performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {stableIndustries.map((industry, index) => (
                    <Badge key={index} className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {industry.industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ArrowDownCircle className="h-5 w-5 mr-2 text-red-500" />
                  Declining Industries
                </CardTitle>
                <CardDescription>Industries experiencing downward trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {decliningIndustries.map((industry, index) => (
                    <Badge key={index} className="bg-red-100 text-red-800 hover:bg-red-200">
                      {industry.industry}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Industry Growth Chart</CardTitle>
              <CardDescription>
                Visualization of current industry trends based on market analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MarketTrendsChart trends={marketTrends || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-Demand Industries</CardTitle>
              <CardDescription>
                Current job market demand for different industry sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="high">
                <TabsList className="mb-4">
                  <TabsTrigger value="high">High Demand</TabsTrigger>
                  <TabsTrigger value="medium">Medium Demand</TabsTrigger>
                  <TabsTrigger value="low">Low Demand</TabsTrigger>
                </TabsList>
                
                <TabsContent value="high">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {highDemandIndustries.map((industry, index) => (
                      <Card key={index} className="bg-green-50 border-green-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{industry.industry}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-2">
                            <ArrowUpCircle className="h-5 w-5 mr-2 text-green-600" />
                            <span className="text-green-800">
                              Growth: <strong>{industry.growth}</strong>
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            High demand indicates abundant job opportunities and competitive salaries.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="medium">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mediumDemandIndustries.map((industry, index) => (
                      <Card key={index} className="bg-amber-50 border-amber-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{industry.industry}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-2">
                            <span className="text-amber-800">
                              Growth: <strong>{industry.growth}</strong>
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Medium demand indicates stable job market with moderate competition.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="low">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {lowDemandIndustries.map((industry, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{industry.industry}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center mb-2">
                            <span>
                              Growth: <strong>{industry.growth}</strong>
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Low demand indicates fewer job opportunities and potential challenges in career growth.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MarketTrends;
