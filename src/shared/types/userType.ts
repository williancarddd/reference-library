import { userSchema } from "@/store/user.store";
import { z } from "zod";

export type User = z.infer<typeof userSchema>;