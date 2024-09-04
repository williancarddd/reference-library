import api from '@/lib/axios';
import { PaginatedResponse } from '@/shared/interfaces/paginate';
import { Discipline } from '@/shared/types/disciplineType';



export const getDisciplines = async (courseId: number, page: number, perPage: number): Promise<PaginatedResponse<Discipline>> => {
  const response = await api.get(`/discipline?page=${page}&perPage=${perPage}&courseId=${courseId}`);
  return response.data;
};

export const createDiscipline = async (discipline: Discipline): Promise<Discipline> => {
  const response = await api.post('/discipline', discipline);
  return response.data;
};

export const updateDiscipline = async (id: number, discipline: Discipline): Promise<Discipline> => {
  const response = await api.put(`/discipline/${id}`, discipline);
  return response.data;
};

export const deleteDiscipline = async (id: number): Promise<void> => {
  await api.delete(`/discipline/${id}`);
};
