import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDisciplines, createDiscipline, updateDiscipline, deleteDiscipline } from "@/services/disciplines-service";
import { Discipline } from "@/shared/types/disciplineType";

export const useDisciplines = (courseId: number, page: number, perPage: number) => {
  return useQuery({
    queryKey: ['disciplines', courseId, page, perPage],
    queryFn: () => getDisciplines(courseId, page, perPage),
  });
};

export const useCreateDiscipline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (discipline: Discipline) => createDiscipline(discipline),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'disciplines' });
    },
  });
};

export const useUpdateDiscipline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (discipline: Discipline) => updateDiscipline(discipline.id as number, discipline),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'disciplines' });
    },
  });
};

export const useDeleteDiscipline = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteDiscipline(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'disciplines' });
    },
  });
};
