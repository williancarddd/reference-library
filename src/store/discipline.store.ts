import create from 'zustand';
import { z } from 'zod';
import { getDisciplines, createDiscipline, updateDiscipline, deleteDiscipline } from '@/services/disciplines-service';
import { Discipline } from '@/shared/types/disciplineType';

// Esquema de validação para criação de disciplina com Zod
const disciplineSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "Name is required." }),
  cargaHoraria: z.number().optional(),
  period: z.number().min(1, { message: "Period is required." }),
  courseId: z.number({ message: "Course ID is required." }),
  theoreticalHours: z.number().default(0),
  practicalHours: z.number().default(0),
})
  .transform((data) => {
    return {
      ...data,
      cargaHoraria: data.practicalHours + data.theoreticalHours,
    }
  });

type DisciplineState = {
  disciplines: Discipline[];
  selectedDiscipline: Discipline | null;
  loading: boolean;
  error: string | null;
  fetchDisciplines: (courseId: number, page: number, perPage: number) => Promise<void>;
  createDiscipline: (discipline: Discipline) => Promise<void>;
  updateDiscipline: (id: number, discipline: Discipline) => Promise<void>;
  deleteDiscipline: (id: number) => Promise<void>;
  selectDiscipline: (discipline: Discipline | null) => void;
};

const useDisciplineStore = create<DisciplineState>((set) => ({
  disciplines: [],
  selectedDiscipline: null,
  loading: false,
  error: null,

  fetchDisciplines: async (courseId: number, page: number, perPage: number) => {
    set({ loading: true, error: null });
    try {
      const response = await getDisciplines(courseId, page, perPage);
      set({ disciplines: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch disciplines', loading: false });
    }
  },

  createDiscipline: async (discipline: Discipline) => {
    set({ loading: true, error: null });
    try {
      await createDiscipline(discipline);
      set((state) => ({ disciplines: [...state.disciplines, discipline], loading: false }));
    } catch (error) {
      set({ error: 'Failed to create discipline', loading: false });
    }
  },

  updateDiscipline: async (id: number, discipline: Discipline) => {
    set({ loading: true, error: null });
    try {
      await updateDiscipline(id, discipline);
      set((state) => ({
        disciplines: state.disciplines.map((d) => (d.id === id ? discipline : d)),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update discipline', loading: false });
    }
  },

  deleteDiscipline: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deleteDiscipline(id);
      set((state) => ({
        disciplines: state.disciplines.filter((d) => d.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete discipline', loading: false });
    }
  },

  selectDiscipline: (discipline: Discipline | null) => {
    set({ selectedDiscipline: discipline });
  },
}));

export {
  useDisciplineStore,
  disciplineSchema,
}
