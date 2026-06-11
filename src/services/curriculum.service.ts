import { axiosClient } from '@/lib/api/axiosClient'
import type {
  CurriculumDto,
  CurriculumPageResponse,
  CurriculumStatusStats,
  CurriculumSearchCriteria,
  CreateCurriculumRequest,
  UpdateCurriculumRequest,
} from '@/types/curriculum-dto'

const ENDPOINTS = {
  // Public read
  GET_ALL: '/users/curriculums/get-all',
  GET_BY_ID: (id: number) => `/users/curriculums/get-by-id/${id}`,
  SEARCH: '/users/curriculums/search',
  BY_SCHOOL: (schoolId: number) => `/users/curriculums/school/${schoolId}`,
  BY_DEPARTMENT: (deptId: number) => `/users/curriculums/department/${deptId}`,
  BY_LEVEL: (levelId: number) => `/users/curriculums/academic-level/${levelId}`,
  // Admin
  STATS: '/admin/curriculums/stats',
  EXPIRING_SOON: '/admin/curriculums/expiring-soon',
  CREATE: '/admin/curriculums/create',
  UPDATE: (id: number) => `/admin/curriculums/update/${id}`,
  DELETE: (id: number) => `/admin/curriculums/delete/${id}`,
  PERMANENT_DELETE: (id: number) => `/admin/curriculums/permanent-delete/${id}`,
  REVIEW: (id: number) => `/admin/curriculums/review/${id}`,
  TOGGLE_STATUS: (id: number) => `/admin/curriculums/toggle-status/${id}`,
} as const

export const getAllCurricula = async (
  page = 0,
  size = 20
): Promise<CurriculumPageResponse> => {
  const response = await axiosClient.get<{ data: CurriculumPageResponse }>(
    ENDPOINTS.GET_ALL,
    { params: { page, size } }
  )
  return response.data.data
}

export const getCurriculumById = async (id: number): Promise<CurriculumDto> => {
  const response = await axiosClient.get<{ data: CurriculumDto }>(ENDPOINTS.GET_BY_ID(id))
  return response.data.data
}

export const searchCurricula = async (
  criteria: CurriculumSearchCriteria,
  page = 0,
  size = 20
): Promise<CurriculumPageResponse> => {
  const response = await axiosClient.post<{ data: CurriculumPageResponse }>(
    ENDPOINTS.SEARCH,
    criteria,
    { params: { page, size } }
  )
  return response.data.data
}

export const getCurriculaBySchool = async (
  schoolId: number,
  page = 0,
  size = 20
): Promise<CurriculumPageResponse> => {
  const response = await axiosClient.get<{ data: CurriculumPageResponse }>(
    ENDPOINTS.BY_SCHOOL(schoolId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getCurriculaByDepartment = async (
  departmentId: number,
  page = 0,
  size = 20
): Promise<CurriculumPageResponse> => {
  const response = await axiosClient.get<{ data: CurriculumPageResponse }>(
    ENDPOINTS.BY_DEPARTMENT(departmentId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getCurriculaByAcademicLevel = async (
  levelId: number,
  page = 0,
  size = 20
): Promise<CurriculumPageResponse> => {
  const response = await axiosClient.get<{ data: CurriculumPageResponse }>(
    ENDPOINTS.BY_LEVEL(levelId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getCurriculumStats = async (): Promise<CurriculumStatusStats> => {
  const response = await axiosClient.get<{ data: CurriculumStatusStats }>(ENDPOINTS.STATS)
  return response.data.data
}

export const getExpiringSoon = async (
  days = 30,
  page = 0,
  size = 20
): Promise<CurriculumPageResponse> => {
  const response = await axiosClient.get<{ data: CurriculumPageResponse }>(
    ENDPOINTS.EXPIRING_SOON,
    { params: { days, page, size } }
  )
  return response.data.data
}

export const createCurriculum = async (
  data: CreateCurriculumRequest
): Promise<CurriculumDto> => {
  const response = await axiosClient.post<{ data: CurriculumDto }>(ENDPOINTS.CREATE, data)
  return response.data.data
}

export const updateCurriculum = async (
  id: number,
  data: UpdateCurriculumRequest
): Promise<CurriculumDto> => {
  const response = await axiosClient.put<{ data: CurriculumDto }>(ENDPOINTS.UPDATE(id), data)
  return response.data.data
}

export const deleteCurriculum = async (id: number): Promise<void> => {
  await axiosClient.delete(ENDPOINTS.DELETE(id))
}

export const permanentDeleteCurriculum = async (id: number): Promise<void> => {
  await axiosClient.delete(ENDPOINTS.PERMANENT_DELETE(id))
}

export const putUnderReview = async (id: number): Promise<CurriculumDto> => {
  const response = await axiosClient.put<{ data: CurriculumDto }>(ENDPOINTS.REVIEW(id))
  return response.data.data
}

export const toggleCurriculumStatus = async (id: number): Promise<CurriculumDto> => {
  const response = await axiosClient.put<{ data: CurriculumDto }>(
    ENDPOINTS.TOGGLE_STATUS(id)
  )
  return response.data.data
}

export const curriculumService = {
  getAllCurricula,
  getCurriculumById,
  searchCurricula,
  getCurriculaBySchool,
  getCurriculaByDepartment,
  getCurriculaByAcademicLevel,
  getCurriculumStats,
  getExpiringSoon,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
  permanentDeleteCurriculum,
  putUnderReview,
  toggleCurriculumStatus,
}
