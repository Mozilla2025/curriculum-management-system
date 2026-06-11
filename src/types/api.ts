// Standard Spring Boot response envelope — wraps every endpoint's payload
export interface ApiEnvelope<T> {
  message: string
  data: T
}

// Shared pagination metadata returned by every paginated endpoint
export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  hasNext: boolean
  hasPrevious: boolean
}
