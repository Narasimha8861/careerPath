import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Skill, skillsFormSchema, type SkillsFormValues } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PROFICIENCY_LEVELS, COMMON_SKILLS } from "@/lib/constants";

interface SkillsFormProps {
  userId: number;
  initialData?: Skill[];
  onComplete?: () => void;
}

export function SkillsForm({ userId, initialData = [], onComplete }: SkillsFormProps) {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Form setup
  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsFormSchema),
    defaultValues: {
      skills: initialData.length > 0
        ? initialData.map(skill => ({
            skillName: skill.skillName,
            proficiencyLevel: skill.proficiencyLevel
          }))
        : [{ skillName: "", proficiencyLevel: 3 }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  // Skills mutation
  const { mutate: saveSkills, isPending } = useMutation({
    mutationFn: async (data: SkillsFormValues) => {
      const response = await apiRequest("POST", "/api/profile/skills", {
        userId,
        skills: data.skills,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Skills saved",
        description: "Your skills have been updated successfully.",
      });
      if (onComplete) {
        onComplete();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save skills",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: SkillsFormValues) => {
    saveSkills(data);
  };

  // Add a skill from the suggestions
  const addSuggestedSkill = (skill: string) => {
    // Check if skill already exists
    const exists = form.getValues().skills.some(
      s => s.skillName.toLowerCase() === skill.toLowerCase()
    );
    
    if (!exists) {
      append({ skillName: skill, proficiencyLevel: 3 });
    } else {
      toast({
        title: "Skill already added",
        description: `${skill} is already in your list.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Skills</h3>
          <p className="text-muted-foreground mb-6">
            Add your skills and rate your proficiency level for each one. 
            This helps us recommend careers that match your strengths.
          </p>
          
          {/* Skill suggestions */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Common Skills by Category</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              <Button 
                type="button" 
                variant={selectedCategory === "technical" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === "technical" ? null : "technical")}
              >
                Technical
              </Button>
              <Button 
                type="button" 
                variant={selectedCategory === "softSkills" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === "softSkills" ? null : "softSkills")}
              >
                Soft Skills
              </Button>
              <Button 
                type="button" 
                variant={selectedCategory === "business" ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === "business" ? null : "business")}
              >
                Business
              </Button>
            </div>
            
            {selectedCategory && (
              <div className="flex flex-wrap gap-2 bg-muted p-3 rounded-md mb-4">
                {COMMON_SKILLS[selectedCategory as keyof typeof COMMON_SKILLS].map((skill) => (
                  <Button 
                    key={skill} 
                    type="button" 
                    variant="secondary" 
                    size="sm"
                    onClick={() => addSuggestedSkill(skill)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> {skill}
                  </Button>
                ))}
              </div>
            )}
          </div>
          
          {/* Skills list */}
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.skillName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          {index === 0 ? "Skill Name" : ""}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter a skill" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="w-36">
                  <FormField
                    control={form.control}
                    name={`skills.${index}.proficiencyLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          {index === 0 ? "Proficiency" : ""}
                        </FormLabel>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(parseInt(value))}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROFICIENCY_LEVELS.map((level) => (
                              <SelectItem key={level.value} value={level.value.toString()}>
                                {level.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-8"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ skillName: "", proficiencyLevel: 3 })}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Skill
            </Button>
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            className="flex items-center"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Continue
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
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
