// src/hooks/useReports.ts
import { useQuery } from '@tanstack/react-query';
import reportsService, {
  CopiesByReferenceData,
  CopiesByDisciplineData,
  CoverageByDisciplineData,
  SharedReferencesData,
  CourseSummaryData
} from '@/services/reports-service';

export const useCopiesByReference = (courseId: string) => {
  return useQuery({
    queryKey: ['reports', 'copies-by-reference', courseId],
    queryFn: () => reportsService.getCopiesByReference(courseId),
    enabled: !!courseId,
  });
};

export const useCopiesByDiscipline = (courseId: string) => {
  return useQuery({
    queryKey: ['reports', 'copies-by-discipline', courseId],
    queryFn: () => reportsService.getCopiesByDiscipline(courseId),
    enabled: !!courseId,
  });
};

export const useCoverageByDiscipline = (courseId: string) => {
  return useQuery({
    queryKey: ['reports', 'coverage-by-discipline', courseId],
    queryFn: () => reportsService.getCoverageByDiscipline(courseId),
    enabled: !!courseId,
  });
};

export const useSharedReferences = (courseId: string) => {
  return useQuery({
    queryKey: ['reports', 'shared-references', courseId],
    queryFn: () => reportsService.getSharedReferences(courseId),
    enabled: !!courseId,
  });
};

export const useCourseSummary = (courseId: string) => {
  return useQuery({
    queryKey: ['reports', 'course-summary', courseId],
    queryFn: () => reportsService.getCourseSummary(courseId),
    enabled: !!courseId,
  });
};