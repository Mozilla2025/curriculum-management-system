import { axiosClient } from '@/lib/api/axiosClient'
import type {
  DepartmentDto,
  DepartmentPageResponse,
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from '@/types/department'

const ENDPOINTS = {
  GET_ALL: '/user/departments/get-all-departments',
  BY_SCHOOL: (schoolId: number) => `/user/departments/school/${schoolId}`,
  BY_ID: (id: number) => `/user/departments/department/${id}`,
  COUNT: (schoolId: number) => `/user/departments/school/${schoolId}/count`,
  EXISTS: (id: number) => `/user/departments/${id}/exists`,
  CREATE: '/admin/departments/create-department',
  UPDATE: (id: number) => `/admin/departments/update/${id}`,
  DELETE: (id: number) => `/admin/departments/delete/${id}`,
} as const

export const getAllDepartments = async (
  page = 0,
  size = 20,
  search?: string
): Promise<DepartmentPageResponse> => {
  const params: Record<string, unknown> = { page, size }
  if (search) params.search = search
  const response = await axiosClient.get<{ data: DepartmentPageResponse }>(
    ENDPOINTS.GET_ALL,
    { params }
  )
  return response.data.data
}

export const getDepartmentsBySchool = async (schoolId: number): Promise<DepartmentDto[]> => {
  const response = await axiosClient.get<{ data: DepartmentDto[] }>(
    ENDPOINTS.BY_SCHOOL(schoolId)
  )
  return response.data.data
}

export const getDepartmentPageBySchool = async (
  schoolId: number,
  page = 0,
  size = 20
): Promise<DepartmentPageResponse> => {
  const response = await axiosClient.get<{ data: DepartmentPageResponse }>(
    ENDPOINTS.BY_SCHOOL(schoolId),
    { params: { page, size } }
  )
  return response.data.data
}

export const getDepartmentById = async (id: number): Promise<DepartmentDto> => {
  const response = await axiosClient.get<{ data: DepartmentDto }>(ENDPOINTS.BY_ID(id))
  return response.data.data
}

export const getDepartmentCount = async (schoolId: number): Promise<number> => {
  const response = await axiosClient.get<{ data: number }>(ENDPOINTS.COUNT(schoolId))
  return response.data.data
}

export const createDepartment = async (
  data: CreateDepartmentRequest
): Promise<DepartmentDto> => {
  const response = await axiosClient.post<{ data: DepartmentDto }>(ENDPOINTS.CREATE, data)
  return response.data.data
}

export const updateDepartment = async (
  id: number,
  data: UpdateDepartmentRequest
): Promise<DepartmentDto> => {
  const response = await axiosClient.put<{ data: DepartmentDto }>(ENDPOINTS.UPDATE(id), data)
  return response.data.data
}

export const deleteDepartment = async (id: number): Promise<void> => {
  await axiosClient.delete(ENDPOINTS.DELETE(id))
}

export const departmentService = {
  getAllDepartments,
  getDepartmentsBySchool,
  getDepartmentPageBySchool,
  getDepartmentById,
  getDepartmentCount,
  createDepartment,
  updateDepartment,
  deleteDepartment,
}
