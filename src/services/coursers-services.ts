import api from '@/lib/axios';
import { PaginatedResponse } from '@/shared/interfaces/paginate';
import { Course } from '@/shared/types/coursesType';



export const getCourses = async (page: number, perPage: number): Promise<PaginatedResponse<Course>> => {
  const response = await api.get<PaginatedResponse<Course>>('/course', {
    params: {
      page,
      perPage,
    },
  });

  return response.data;
};

export const createCourse = async (course: Course): Promise<Course> => {
  const response = await api.post('/course', course);
  return response.data;
};

export const updateCourse = async (id: number, course: Course): Promise<Course> => {
  const response = await api.put(`/course/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id: number): Promise<void> => {
  await api.delete(`/course/${id}`);
};
