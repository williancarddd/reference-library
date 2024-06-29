import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCourses, createCourse, updateCourse, deleteCourse } from "@/services/coursers-services";
import { Course } from "@/shared/types/coursesType";

// Hook para buscar cursos com paginação
export const useCourses = (page: number, perPage: number) => {
  return useQuery({
    queryKey: ['courses', page, perPage],
    queryFn: () => getCourses(page, perPage),
  });
};

// Hook para criar um curso
export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: Course) => createCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'courses' }); // Invalidar a query de cursos para atualizar a lista
    },
  });
};

// Hook para atualizar um curso
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: Course) => updateCourse(course?.id as number, course),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'courses' }); // Invalidar a query de cursos para atualizar a lista
    },
  });
};

// Hook para deletar um curso
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'courses' }); // Invalidar a query de cursos para atualizar a lista
    },
  });
};
