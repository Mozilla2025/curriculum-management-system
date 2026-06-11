// Backend DTO — matches SchoolDto.java exactly
export interface SchoolDto {
  id: number
  name: string
  code: string
  deanId: number | null
}
