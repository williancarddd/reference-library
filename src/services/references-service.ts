import api from "@/lib/axios";
import { PaginatedResponse } from "@/shared/interfaces/paginate";
import { Reference } from "@/shared/types/referenceType";

// Serviço para criar uma referência
export const createReference = async (reference: Reference) => {
  try {
    const response = await api.post("/reference", reference);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating reference: ${error}`);
  }
};

// Serviço para buscar referências paginadas por disciplina
export const getReferences = async (page: number, perPage: number, disciplineId: number) => {
  try {
    const response = await api.get<PaginatedResponse<Reference>>(`/reference?page=${page}&perPage=${perPage}&disciplineId=${disciplineId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching references: ${error}`);
  }
};

// Serviço para buscar uma referência por ID
export const getReferenceById = async (id: number) => {
  try {
    const response = await api.get(`/reference/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching reference with id ${id}: ${error}`);
  }
};

// Serviço para atualizar uma referência
export const updateReference = async (id: number, reference: Reference) => {
  try {
    const response = await api.put(`/reference/${id}`, reference);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating reference with id ${id}: ${error}`);
  }
};

// Serviço para deletar uma referência
export const deleteReference = async (id: number) => {
  try {
    const response = await api.delete(`/reference/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting reference with id ${id}: ${error}`);
  }
};
