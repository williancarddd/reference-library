import create from 'zustand';
import { z } from 'zod';
import {
  getReferences,
  createReference,
  updateReference,
  deleteReference,
  getReferenceById,
} from '@/services/references-service';
import { Reference } from '@/shared/types/referenceType';

// Esquema de validação para criação/edição de referência com Zod
const referenceSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "Title is required." }),
  authors: z.string().min(1, { message: "Authors are required." }),
  year: z.number().optional(),
  edition: z.number().optional(),
  publisher: z.string().optional(),
  type: z.enum(['mandatory', 'optional'], { message: "Type is required." }),
  courseId: z.number({ message: "Course ID is required." }),
  disciplineId: z.number({ message: "Discipline ID is required." }),
});


type ReferenceState = {
  references: Reference[];
  selectedReference: Reference | null;
  loading: boolean;
  error: string | null;
  fetchReferences: (page: number, perPage: number, disciplineId: number) => Promise<void>;
  createReference: (reference: Reference) => Promise<void>;
  updateReference: (id: number, reference: Reference) => Promise<void>;
  deleteReference: (id: number) => Promise<void>;
  getReference: (id: number) => Promise<void>;
  selectReference: (reference: Reference | null) => void;
};

const useReferenceStore = create<ReferenceState>((set) => ({
  references: [],
  selectedReference: null,
  loading: false,
  error: null,

  fetchReferences: async (page: number, perPage: number, disciplineId: number) => {
    set({ loading: true, error: null });
    try {
      const response = await getReferences(page, perPage, disciplineId);
      set({ references: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch references', loading: false });
    }
  },

  createReference: async (reference: Reference) => {
    set({ loading: true, error: null });
    try {
      await createReference(reference);
      set((state) => ({ references: [...state.references, reference], loading: false }));
    } catch (error) {
      set({ error: 'Failed to create reference', loading: false });
    }
  },

  updateReference: async (id: number, reference: Reference) => {
    set({ loading: true, error: null });
    try {
      await updateReference(id, reference);
      set((state) => ({
        references: state.references.map((r) => (r.id === id ? reference : r)),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update reference', loading: false });
    }
  },

  deleteReference: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deleteReference(id);
      set((state) => ({
        references: state.references.filter((r) => r.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete reference', loading: false });
    }
  },

  getReference: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const reference = await getReferenceById(id);
      set({ selectedReference: reference, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch reference', loading: false });
    }
  },

  selectReference: (reference: Reference | null) => {
    set({ selectedReference: reference });
  },
}));

export {
  useReferenceStore,
  referenceSchema,
};
