import { referenceSchema } from "@/store/references.store";
import { z } from "zod";

export type Reference = z.infer<typeof referenceSchema>;