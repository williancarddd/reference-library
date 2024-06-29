import { z } from "zod";

// Esquema de validação para criação de curso com Zod
export const courseSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Name is required." }),
  ppc: z.string().min(1, { message: "PPC is required." }),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

