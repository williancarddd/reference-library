import { create } from 'zustand';
import { z } from 'zod';

// Esquema de validação para criação de usuário com Zod
const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
});

// Tipagem inferida a partir do esquema Zod
type User = z.infer<typeof userSchema>;

// Estado para criação de usuário
type State = {
  user: User;
  errors: Partial<Record<keyof User, string[]>>;
  setUserField: (field: keyof User, value: string) => void;
  validateUser: () => boolean;
  resetUser: () => void;
};

// Criação do store com Zustand
const userStore = create<State>((set, get) => ({
  user: {
    username: '',
    password: '',
    email: '',
  },
  errors: {},
  setUserField: (field, value) => set((state) => ({
    user: {
      ...state.user,
      [field]: value,
    },
    errors: {
      ...state.errors,
      [field]: undefined,
    },
  })),
  validateUser: () => {
    const result = userSchema.safeParse(get().user);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      set({ errors });
      return false;
    }
    return true;
  },
  resetUser: () => set({
    user: {
      username: '',
      password: '',
      email: '',
    },
    errors: {},
  }),
}));

export {
  userStore,
  userSchema,
}
