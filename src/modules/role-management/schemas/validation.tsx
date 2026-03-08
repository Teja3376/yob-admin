import z from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, "Role name is required"),
  description: z.string().min(1, "Description is required"),
});

export type RoleFormValues = z.infer<typeof roleSchema>;


export const createMemberSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email"),
  role: z.string().min(1, "Role is required"),
});

export type CreateMemberFormValues = z.infer<typeof createMemberSchema>;
