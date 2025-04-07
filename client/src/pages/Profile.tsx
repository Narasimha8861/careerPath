import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/ProfileForm";
import { SkillsForm } from "@/components/SkillsForm";
import { EducationForm } from "@/components/EducationForm";
import { ExperienceForm } from "@/components/ExperienceForm";
import { InterestsForm } from "@/components/InterestsForm";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [userId, setUserId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

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
    }
  }, []);

  // Get user profile data if logged in
  const { data: profile, isLoading } = useQuery({
    queryKey: userId ? [`/api/profile/${userId}`] : null,
    enabled: !!userId,
  });

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const navigateToNext = () => {
    switch (activeTab) {
      case "profile":
        setActiveTab("skills");
        break;
      case "skills":
        setActiveTab("education");
        break;
      case "education":
        setActiveTab("experience");
        break;
      case "experience":
        setActiveTab("interests");
        break;
      case "interests":
        // Completed all steps
        toast({
          title: "Profile updated",
          description: "Your profile has been updated successfully."
        });
        setLocation("/");
        break;
    }
  };

  const handleLoginSuccess = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUserId(userData.id);
    toast({
      title: "Login successful",
      description: `Welcome back, ${userData.name || userData.username}!`,
    });
  };

  const handleRegisterSuccess = (userData: any) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUserId(userData.id);
    toast({
      title: "Registration successful",
      description: "Let's set up your profile to get personalized career recommendations.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserId(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        {userId && (
          <Button variant="outline" onClick={handleLogout}>
            Log Out
          </Button>
        )}
      </div>

      {!userId ? (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Login Card */}
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Sign in to your account to access your career recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm 
                mode="login" 
                onSuccess={handleLoginSuccess} 
              />
            </CardContent>
          </Card>

          {/* Register Card */}
          <Card>
            <CardHeader>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Register to get personalized career recommendations based on your profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm 
                mode="register" 
                onSuccess={handleRegisterSuccess} 
              />
            </CardContent>
          </Card>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading your profile data...</span>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              The more details you provide, the more accurate your career recommendations will be.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="profile">Basic Info</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="interests">Interests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <ProfileForm 
                  mode="update" 
                  initialData={profile?.user} 
                  userId={userId} 
                  onComplete={navigateToNext} 
                />
              </TabsContent>
              
              <TabsContent value="skills">
                <SkillsForm 
                  userId={userId} 
                  initialData={profile?.skills} 
                  onComplete={navigateToNext} 
                />
              </TabsContent>
              
              <TabsContent value="education">
                <EducationForm 
                  userId={userId} 
                  initialData={profile?.education} 
                  onComplete={navigateToNext} 
                />
              </TabsContent>
              
              <TabsContent value="experience">
                <ExperienceForm 
                  userId={userId} 
                  initialData={profile?.experience} 
                  onComplete={navigateToNext} 
                />
              </TabsContent>
              
              <TabsContent value="interests">
                <InterestsForm 
                  userId={userId} 
                  initialData={profile?.interests} 
                  onComplete={navigateToNext} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;
