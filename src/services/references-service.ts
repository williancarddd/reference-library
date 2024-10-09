import api from "@/lib/axios";
import { PaginatedResponse } from "@/shared/interfaces/paginate";
import { Reference } from "@/shared/types/referenceType";

// Serviço para criar uma referência
export async  function createReference(reference: Reference): Promise<Reference> {
  try {
    const response = await api.post("/reference", reference);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating reference: ${error}`);
  }
};

// Serviço para buscar referências paginadas por disciplina
export async function getReferences(page: number, perPage: number, disciplineId: number): Promise<PaginatedResponse<Reference>> {
  try {
    const response = await api.get<PaginatedResponse<Reference>>(`/reference?page=${page}&perPage=${perPage}&disciplineId=${disciplineId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching references: ${error}`);
  }
};

// Serviço para buscar uma referência por ID
export async function getReference(id: number): Promise<Reference> {
  try {
    const response = await api.get(`/reference/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching reference with id ${id}: ${error}`);
  }
};

// Serviço para atualizar uma referência
export async function updateReference(id: number, reference: Reference): Promise<Reference> {
  try {
    const response = await api.put(`/reference/${id}`, reference);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating reference with id ${id}: ${error}`);
  }
};

// Serviço para deletar uma referência
export async function deleteReference(id: number): Promise<void> {
  try {
    const response = await api.delete(`/reference/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting reference with id ${id}: ${error}`);
  }
};
