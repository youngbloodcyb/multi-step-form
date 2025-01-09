"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormWithStore } from "@/lib/hooks/use-form-store";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Select Plan" },
  { id: 3, name: "Add-ons" },
  { id: 4, name: "Summary" },
];

const plans = [
  { id: "free", name: "Free", price: "$0/mo" },
  { id: "basic", name: "Basic", price: "$9/mo" },
  { id: "pro", name: "Pro", price: "$15/mo" },
];

const addOns = [
  {
    id: "online",
    name: "Online Service",
    description: "Access to multiplayer games",
    price: "+$1/mo",
  },
  {
    id: "storage",
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    price: "+$2/mo",
  },
  {
    id: "profile",
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: "+$2/mo",
  },
];

export function MultiStepForm() {
  const { currentStep, formData, form, setCurrentStep, onSubmit } =
    useFormWithStore();

  return (
    <div className="flex gap-8 p-6">
      {/* Steps sidebar */}
      <div className="w-1/4">
        <div className="flex flex-col gap-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-2 p-2 rounded",
                currentStep === step.id && "bg-primary text-primary-foreground"
              )}
            >
              <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                {step.id}
              </div>
              <span>{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="flex-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {currentStep === 1 && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {currentStep === 2 && (
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Plan</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-4"
                      >
                        {plans.map((plan) => (
                          <div
                            key={plan.id}
                            className="flex items-center space-x-2 border p-4 rounded"
                          >
                            <RadioGroupItem value={plan.id} id={plan.id} />
                            <div>
                              <div className="font-medium">{plan.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {plan.price}
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStep === 3 && (
              <FormField
                control={form.control}
                name="addOns"
                render={() => (
                  <FormItem>
                    <FormLabel>Pick Add-ons</FormLabel>
                    {addOns.map((addon) => (
                      <FormField
                        key={addon.id}
                        control={form.control}
                        name="addOns"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={addon.id}
                              className="flex items-center space-x-3 space-y-0 border p-4 rounded"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(
                                    addon.id as any
                                  )}
                                  onCheckedChange={(checked) => {
                                    const value = field.value || [];
                                    if (checked) {
                                      field.onChange([...value, addon.id]);
                                    } else {
                                      field.onChange(
                                        value.filter(
                                          (item) => item !== addon.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="flex-1">
                                <div className="font-medium">{addon.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  {addon.description}
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {addon.price}
                              </div>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Summary</h3>
                <div className="border rounded p-4 space-y-4">
                  <div>
                    <div className="font-medium">Personal Info</div>
                    <div>Name: {formData.name}</div>
                    <div>Email: {formData.email}</div>
                  </div>
                  <div>
                    <div className="font-medium">Plan</div>
                    <div>{plans.find((p) => p.id === formData.plan)?.name}</div>
                  </div>
                  <div>
                    <div className="font-medium">Add-ons</div>
                    <div>
                      {formData.addOns.map((addon) => (
                        <div key={addon}>
                          {addOns.find((a) => a.id === addon)?.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
              )}
              <Button type="submit">
                {currentStep === 4 ? "Submit" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
