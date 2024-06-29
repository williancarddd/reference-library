import { create } from 'zustand';
import { z } from 'zod';

// Esquema de validação para login com Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Tipagem inferida a partir do esquema Zod
type Login = z.infer<typeof loginSchema>;

// Estado para o login
type State = {
  login: Login;
  loginErrors: Partial<Record<keyof Login, string[]>>;
  setLoginField: (field: keyof Login, value: string) => void;
  validateLogin: () => boolean;
  resetLogin: () => void;
};

// Criação do store com Zustand
const loginStore = create<State>((set, get) => ({
  login: {
    email: '',
    password: '',
  },
  loginErrors: {},
  setLoginField: (field, value) => set((state) => ({
    login: {
      ...state.login,
      [field]: value,
    },
    loginErrors: {
      ...state.loginErrors,
      [field]: undefined,
    },
  })),
  validateLogin: () => {
    const result = loginSchema.safeParse(get().login);
    if (!result.success) {
      const loginErrors = result.error.flatten().fieldErrors;
      set({ loginErrors });
      return false;
    }
    return true;
  },
  resetLogin: () => set({
    login: {
      email: '',
      password: '',
    },
    loginErrors: {},
  }),
}));

export{
  loginStore,
  loginSchema,
}
