import { create } from "zustand";
import { type UseFormReturn } from "react-hook-form";
import { type FormValues } from "@/lib/schema";

export const useFormStore = create<FormState>((set, get) => ({
  currentStep: 1,
  formData: {
    name: "",
    email: "",
    plan: "free",
    addOns: [],
  },
  setCurrentStep: (step) => set({ currentStep: step }),
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  handleSubmit: (values: FormValues, form: UseFormReturn<FormValues>) => {
    const state = get();
    state.setFormData(values);

    if (state.currentStep < 4) {
      state.setCurrentStep(state.currentStep + 1);
    } else {
      console.log("Form submitted:", values);
      // Handle final submission
    }
  },
}));
