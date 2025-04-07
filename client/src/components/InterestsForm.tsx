import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Interest, interestsFormSchema, type InterestsFormValues } from "@shared/schema";
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
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { INTEREST_LEVELS, COMMON_INTERESTS } from "@/lib/constants";

interface InterestsFormProps {
  userId: number;
  initialData?: Interest[];
  onComplete?: () => void;
}

export function InterestsForm({ userId, initialData = [], onComplete }: InterestsFormProps) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Form setup
  const form = useForm<InterestsFormValues>({
    resolver: zodResolver(interestsFormSchema),
    defaultValues: {
      interests: initialData.length > 0
        ? initialData.map(interest => ({
            interestName: interest.interestName,
            interestLevel: interest.interestLevel
          }))
        : [{ interestName: "", interestLevel: 3 }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "interests",
  });

  // Interest mutation
  const { mutate: saveInterests, isPending } = useMutation({
    mutationFn: async (data: InterestsFormValues) => {
      const response = await apiRequest("POST", "/api/profile/interests", {
        userId,
        interests: data.interests,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Interests saved",
        description: "Your interests have been updated successfully.",
      });
      if (onComplete) {
        onComplete();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to save interests",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle form submission
  const onSubmit = (data: InterestsFormValues) => {
    saveInterests(data);
  };

  // Filter common interests based on search term
  const filteredInterests = searchTerm 
    ? COMMON_INTERESTS.filter(interest => 
        interest.toLowerCase().includes(searchTerm.toLowerCase()))
    : COMMON_INTERESTS;

  // Add an interest from the suggestions
  const addSuggestedInterest = (interest: string) => {
    // Check if interest already exists
    const exists = form.getValues().interests.some(
      i => i.interestName.toLowerCase() === interest.toLowerCase()
    );
    
    if (!exists) {
      append({ interestName: interest, interestLevel: 3 });
    } else {
      toast({
        title: "Interest already added",
        description: `${interest} is already in your list.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Interests</h3>
          <p className="text-muted-foreground mb-6">
            Tell us about your interests and passion areas. 
            This helps us recommend careers that you'll find fulfilling and enjoyable.
          </p>
          
          {/* Interest suggestions */}
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Common Interest Areas</h4>
            <div className="mb-3">
              <Input
                type="search"
                placeholder="Search interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
              
              <div className="flex flex-wrap gap-2 p-3 bg-muted rounded-md">
                {filteredInterests.map((interest) => (
                  <Badge 
                    key={interest} 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => addSuggestedInterest(interest)}
                  >
                    <Plus className="h-3 w-3 mr-1" /> 
                    {interest}
                  </Badge>
                ))}
                {filteredInterests.length === 0 && (
                  <p className="text-sm text-muted-foreground">No interests match your search.</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Interests list */}
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`interests.${index}.interestName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          {index === 0 ? "Interest" : ""}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter an interest area" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="w-36">
                  <FormField
                    control={form.control}
                    name={`interests.${index}.interestLevel`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          {index === 0 ? "Interest Level" : ""}
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
                            {INTEREST_LEVELS.map((level) => (
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
              onClick={() => append({ interestName: "", interestLevel: 3 })}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Interest
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
                Complete Profile
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
