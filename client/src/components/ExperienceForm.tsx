import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Experience, experienceFormSchema, type ExperienceFormValues } from "@shared/schema";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExperienceFormProps {
  userId: number;
  initialData?: Experience[];
  onComplete?: () => void;
}

export function ExperienceForm({ userId, initialData = [], onComplete }: ExperienceFormProps) {
  const { toast } = useToast();

  // Form setup
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      experiences: initialData.length > 0
        ? initialData.map(exp => ({
            company: exp.company,
            position: exp.position,
            startDate: exp.startDate,
            endDate: exp.endDate || undefined,
            current: exp.current,
            description: exp.description || undefined
          }))
        : []
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  // Experience mutation
  const { mutate: saveExperience, isPending } = useMutation({
    mutationFn: async (data: ExperienceFormValues) => {
      const response = await apiRequest("POST", "/api/profile/experience", {
        userId,
        experiences: data.experiences || [],
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Experience saved",
        description: "Your work experience has been updated successfully.",
      });
      if (onComplete) {
        onComplete();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save experience",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: ExperienceFormValues) => {
    // Process the data to ensure that if current is true, endDate is undefined
    const processedData = {
      experiences: data.experiences?.map(exp => {
        if (exp.current) {
          return { ...exp, endDate: undefined };
        }
        return exp;
      }) || []
    };
    
    saveExperience(processedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
          <p className="text-muted-foreground mb-6">
            Add your work experience to help us better understand your career path.
            This step is optional - if you're a student or just starting your career, you can skip it.
          </p>
          
          {/* Experience list */}
          <div className="space-y-6">
            {fields.length === 0 && (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-muted-foreground mb-4">No work experience added yet.</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ 
                    company: "", 
                    position: "", 
                    startDate: "", 
                    endDate: undefined,
                    current: false,
                    description: ""
                  })}
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Experience
                </Button>
              </div>
            )}
            
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.company`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.position`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Input placeholder="Your job title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            placeholder="YYYY-MM" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="month" 
                            placeholder="YYYY-MM" 
                            disabled={form.watch(`experiences.${index}.current`)}
                            {...field} 
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name={`experiences.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I currently work here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`experiences.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your responsibilities and achievements" 
                          rows={4}
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            
            {fields.length > 0 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ 
                  company: "", 
                  position: "", 
                  startDate: "", 
                  endDate: undefined,
                  current: false,
                  description: ""
                })}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Experience
              </Button>
            )}
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
