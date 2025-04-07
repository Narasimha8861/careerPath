import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Education, educationFormSchema, type EducationFormValues } from "@shared/schema";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DEGREE_TYPES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EducationFormProps {
  userId: number;
  initialData?: Education[];
  onComplete?: () => void;
}

export function EducationForm({ userId, initialData = [], onComplete }: EducationFormProps) {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  // Form setup
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      educations: initialData.length > 0
        ? initialData.map(edu => ({
            institution: edu.institution,
            degree: edu.degree,
            fieldOfStudy: edu.fieldOfStudy,
            startYear: edu.startYear,
            endYear: edu.endYear,
            current: edu.current
          }))
        : [{ 
            institution: "", 
            degree: "", 
            fieldOfStudy: "", 
            startYear: currentYear - 4, 
            endYear: currentYear,
            current: false 
          }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  // Education mutation
  const { mutate: saveEducation, isPending } = useMutation({
    mutationFn: async (data: EducationFormValues) => {
      const response = await apiRequest("POST", "/api/profile/education", {
        userId,
        educations: data.educations,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Education saved",
        description: "Your education history has been updated successfully.",
      });
      if (onComplete) {
        onComplete();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save education",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: EducationFormValues) => {
    // Process the data to ensure that if current is true, endYear is undefined
    const processedData = {
      educations: data.educations.map(edu => {
        if (edu.current) {
          return { ...edu, endYear: undefined };
        }
        return edu;
      })
    };
    
    saveEducation(processedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Education History</h3>
          <p className="text-muted-foreground mb-6">
            Add your educational background, including degrees, certifications, and courses.
            This helps us recommend careers that align with your qualifications.
          </p>
          
          {/* Education list */}
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`educations.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <FormControl>
                          <Input placeholder="University/School name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`educations.${index}.degree`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree Type</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select degree type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DEGREE_TYPES.map((degree) => (
                              <SelectItem key={degree} value={degree}>
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`educations.${index}.fieldOfStudy`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Field of Study</FormLabel>
                        <FormControl>
                          <Input placeholder="Major, concentration, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`educations.${index}.startYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Year</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="YYYY" 
                              min={1900}
                              max={currentYear}
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                const value = e.target.value ? parseInt(e.target.value) : undefined;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`educations.${index}.endYear`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Year</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="YYYY" 
                              min={1900}
                              max={currentYear + 10}
                              disabled={form.watch(`educations.${index}.current`)}
                              {...field}
                              value={field.value || ''}
                              onChange={(e) => {
                                const value = e.target.value ? parseInt(e.target.value) : undefined;
                                field.onChange(value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name={`educations.${index}.current`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently studying here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ 
                institution: "", 
                degree: "", 
                fieldOfStudy: "", 
                startYear: currentYear - 4, 
                endYear: currentYear,
                current: false 
              })}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Education
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
