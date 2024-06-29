import { courseSchema } from "@/store/course.store";
import { z } from "zod";

// Tipagem inferida a partir do esquema Zod
export type Course = z.infer<typeof courseSchema>;
