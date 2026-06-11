import { axiosClient } from '@/lib/api/axiosClient'
import type {
  UserResponse,
  CreateUserRequest,
  AssignRoleRequest,
} from '@/types/user-management'

const ENDPOINTS = {
  GET_ALL: '/users/get-all-users',
  GET_BY_ID: (id: number) => `/users/user/${id}`,
  CREATE: '/users/create',
  ASSIGN_ROLE: '/users/assign-role',
  REMOVE_ROLE: (userId: number, roleName: string) =>
    `/users/${userId}/roles/${roleName}/delete`,
} as const

export const getAllUsers = async (): Promise<UserResponse[]> => {
  const response = await axiosClient.get<{ data: UserResponse[] }>(ENDPOINTS.GET_ALL)
  return response.data.data
}

export const getUserById = async (id: number): Promise<UserResponse> => {
  const response = await axiosClient.get<{ data: UserResponse }>(ENDPOINTS.GET_BY_ID(id))
  return response.data.data
}

export const createUser = async (data: CreateUserRequest): Promise<UserResponse> => {
  const response = await axiosClient.post<{ data: UserResponse }>(ENDPOINTS.CREATE, data)
  return response.data.data
}

export const assignRole = async (data: AssignRoleRequest): Promise<void> => {
  await axiosClient.post(ENDPOINTS.ASSIGN_ROLE, data)
}

export const removeRole = async (userId: number, roleName: string): Promise<void> => {
  await axiosClient.delete(ENDPOINTS.REMOVE_ROLE(userId, roleName))
}

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  assignRole,
  removeRole,
}
