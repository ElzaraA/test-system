export interface KsgEntity {
  minimalReserve: number
  name: string
  number: number
  overdueByCurrentDay: number
  totalPoints: number  
}

export interface KsgModel {
  dateAdded: Date | null
  ksgRecords: KsgEntity[]
  totalMinimalReserve: number
  totalOverdueByCurrentDay: number
  totalPoints: number
}

export enum CONTROL_POINTS_TYPE {
  OVERDUE = "OVERDUE",
  RESERVE = "RESERVE" 
}

export type LoaderFn = ((arg: string) => void) | null;

export type DatetimeRecord = {
  date: string
  times?: string[]
}
