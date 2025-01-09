import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  plan: z.enum(["free", "basic", "pro"]),
  addOns: z.array(z.enum(["online", "storage", "profile"])),
});

export type FormValues = z.infer<typeof formSchema>;
