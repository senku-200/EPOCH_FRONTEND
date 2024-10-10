import { z } from "zod";
export const participantSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  register_number: z
    .string()
    .min(1, { message: "Register number is required" })
    .max(15, { message: "Register number must be at most 15 character's" }),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 10 digits" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  year: z.string().min(1, { message: "Academic is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  college: z.string().min(1, { message: "College is required" }),
});
