import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ProfileForm } from "@/components/ProfileForm";
import { SkillsForm } from "@/components/SkillsForm";
import { EducationForm } from "@/components/EducationForm";
import { ExperienceForm } from "@/components/ExperienceForm";
import { InterestsForm } from "@/components/InterestsForm";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface OnboardingStepProps {
  step: number;
  currentStep: number;
  label: string;
}

const OnboardingStep = ({ step, currentStep, label }: OnboardingStepProps) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
          ${isActive 
            ? "bg-primary text-white" 
            : isCompleted 
              ? "bg-green-500 text-white" 
              : "bg-gray-200 text-gray-600"}`}
      >
        {isCompleted ? (
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
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          step
        )}
      </div>
      <span className={`text-sm mt-2 ${isActive ? "font-medium" : ""}`}>{label}</span>
    </div>
  );
};

const StepConnector = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="h-1 flex-grow mx-2 bg-gray-200">
      <div 
        className="h-full bg-primary transition-all duration-300" 
        style={{ width: isActive ? "100%" : "0%" }}
      ></div>
    </div>
  );
};

interface OnboardingSectionProps {
  userId: number;
  onComplete: () => void;
}

const OnboardingSection = ({ userId, onComplete }: OnboardingSectionProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Get any existing profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: [`/api/profile/${userId}`],
    enabled: !!userId,
  });

  const steps = [
    { number: 1, label: "Profile" },
    { number: 2, label: "Skills" },
    { number: 3, label: "Education" },
    { number: 4, label: "Experience" },
    { number: 5, label: "Interests" }
  ];

  const handleStepComplete = () => {
    if (currentStep === steps.length) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / steps.length) * 100;

  return (
    <Card className="mb-12">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to CareerAI</h2>
        <p className="text-muted-foreground mb-6">
          Our AI-powered system will analyze your skills, education, experience, and interests 
          to recommend the best career paths for you. Let's start by building your profile.
        </p>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="hidden md:flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <>
                <OnboardingStep 
                  key={step.number} 
                  step={step.number} 
                  currentStep={currentStep} 
                  label={step.label} 
                />
                {index < steps.length - 1 && (
                  <StepConnector key={`connector-${index}`} isActive={currentStep > step.number} />
                )}
              </>
            ))}
          </div>
          
          {/* Mobile Progress */}
          <div className="md:hidden mb-2">
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{steps[currentStep - 1].label}</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading your profile data...</span>
          </div>
        ) : (
          <>
            {currentStep === 1 && (
              <ProfileForm 
                mode="update" 
                userId={userId} 
                initialData={profile?.user} 
                onComplete={handleStepComplete} 
              />
            )}
            
            {currentStep === 2 && (
              <SkillsForm 
                userId={userId} 
                initialData={profile?.skills} 
                onComplete={handleStepComplete} 
              />
            )}
            
            {currentStep === 3 && (
              <EducationForm 
                userId={userId} 
                initialData={profile?.education} 
                onComplete={handleStepComplete} 
              />
            )}
            
            {currentStep === 4 && (
              <ExperienceForm 
                userId={userId} 
                initialData={profile?.experience} 
                onComplete={handleStepComplete} 
              />
            )}
            
            {currentStep === 5 && (
              <InterestsForm 
                userId={userId} 
                initialData={profile?.interests} 
                onComplete={handleStepComplete} 
              />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OnboardingSection;
