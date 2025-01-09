// Custom hook to combine Zustand with React Hook Form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/lib/schema";
import { useFormStore } from "@/stores/form-store";

export const useFormWithStore = () => {
  const store = useFormStore();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: store.formData,
  });

  const onSubmit = (values: FormValues) => {
    store.handleSubmit(values, form);
  };

  return {
    ...store,
    form,
    onSubmit,
  };
};
