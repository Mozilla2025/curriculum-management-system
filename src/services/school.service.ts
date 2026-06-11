import { axiosClient } from '@/lib/api/axiosClient'
import type { SchoolDto } from '@/types/school'

const ENDPOINTS = {
  GET_ALL: '/schools/get-all',
  GET_BY_ID: (id: number) => `/schools/get-by-id/${id}`,
} as const

export const getAllSchools = async (): Promise<SchoolDto[]> => {
  // /schools/get-all returns a plain array (no { message, data } envelope).
  // The backend also returns id: null for all records — assign sequential IDs
  // based on array index so school-based curriculum filtering works correctly.
  const response = await axiosClient.get<SchoolDto[]>(ENDPOINTS.GET_ALL)
  const schools: SchoolDto[] = Array.isArray(response.data) ? response.data : []
  return schools.map((school, index) => ({
    ...school,
    id: school.id ?? index + 1,
  }))
}

export const getSchoolById = async (id: number): Promise<SchoolDto> => {
  const response = await axiosClient.get<{ data: SchoolDto }>(ENDPOINTS.GET_BY_ID(id))
  return response.data.data
}

export const schoolService = { getAllSchools, getSchoolById }
