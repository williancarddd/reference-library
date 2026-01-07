// src/services/reports-service.ts
import api from '../lib/axios'; // seu axios instance

export interface CopiesByReferenceData {
  totalReferences: number;
  referencesWithBooks: number;
  referencesWithoutBooks: number;
  details: Array<{
    referenceId: number;
    referenceTitle: string;
    totalCopies: number;
    hasBooks: boolean;
    byEdition: Record<string, number>;
  }>;
}

export interface CopiesByDisciplineData {
  disciplineId: number;
  disciplineName: string;
  totalReferences: number;
  totalBooks: number;
  averageBooksPerReference: string;
  references: Array<{ referenceTitle: string; copies: number }>;
}

export interface CoverageByDisciplineData {
  disciplineId: number;
  disciplineName: string;
  totalReferences: number;
  referencesWithBooks: number;
  coveragePercentage: number;
}

export interface SharedReferencesData {
  totalSharedReferences: number;
  sharedReferences: Array<{
    referenceTitle: string;
    sharedBy: number;
    disciplines: Array<{ id: number; name: string }>;
    referenceIds: number[];
  }>;
}

export interface CourseSummaryData {
  course: {
    id: number;
    name: string;
  };
  totalDisciplines: number;
  totalReferences: number;
  referencesWithoutBooks: number;
}

class ReportsService {
  async getCopiesByReference(courseId: string): Promise<CopiesByReferenceData> {
    const { data } = await api.get(`/reports/copies-by-reference/${courseId}`);
    return data;
  }

  async getCopiesByDiscipline(courseId: string): Promise<CopiesByDisciplineData[]> {
    const { data } = await api.get(`/reports/copies-by-discipline/${courseId}`);
    return data;
  }

  async getCoverageByDiscipline(courseId: string): Promise<CoverageByDisciplineData[]> {
    const { data } = await api.get(`/reports/coverage-by-discipline/${courseId}`);
    return data;
  }

  async getSharedReferences(courseId: string): Promise<SharedReferencesData> {
    const { data } = await api.get(`/reports/shared-references/${courseId}`);
    return data;
  }

  async getCourseSummary(courseId: string): Promise<CourseSummaryData> {
    // Vamos buscar dados de múltiplos endpoints para criar o resumo
    const [copiesByRef, disciplines] = await Promise.all([
      this.getCopiesByReference(courseId),
      this.getCopiesByDiscipline(courseId)
    ]);

    // Buscar nome do curso (você precisará criar este endpoint ou usar um existente)
    const course = await this.getCourseInfo(courseId);

    return {
      course,
      totalDisciplines: disciplines.length,
      totalReferences: copiesByRef.totalReferences,
      referencesWithoutBooks: copiesByRef.referencesWithoutBooks
    };
  }

  private async getCourseInfo(courseId: string): Promise<{ id: number; name: string }> {
    // Se você já tem um endpoint para pegar curso, use aqui
    // Por enquanto, retornaremos um mock
    const { data } = await api.get(`/courses/${courseId}`);
    return { id: data.id, name: data.name };
  }
}

export default new ReportsService();