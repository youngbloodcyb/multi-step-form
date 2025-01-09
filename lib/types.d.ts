type Plan = "free" | "basic" | "pro";
type AddOn = "online" | "storage" | "profile";

type FormState = {
  currentStep: number;
  formData: {
    name: string;
    email: string;
    plan: Plan;
    addOns: AddOn[];
  };
  setCurrentStep: (step: number) => void;
  setFormData: (data: Partial<FormState["formData"]>) => void;
  handleSubmit: (values: FormValues, form: UseFormReturn<FormValues>) => void;
};
