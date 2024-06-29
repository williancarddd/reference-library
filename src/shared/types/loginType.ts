import { loginSchema } from "@/store/login.store";
import { z } from "zod";

export type Login = z.infer<typeof loginSchema>;
