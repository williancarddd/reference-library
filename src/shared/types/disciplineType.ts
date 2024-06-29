import { disciplineSchema } from "@/store/discipline.store";
import { z } from "zod";

export type Discipline = z.infer<typeof disciplineSchema>;