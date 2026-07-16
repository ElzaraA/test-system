export enum ExpertiseStatus {
  DESIGN = 'DESIGN',
  EXPERT_SUPPORT = 'EXPERT_SUPPORT',
  ENTRANCE_CONTROL = 'ENTRANCE_CONTROL',
  STATE_EXPERTISE = 'STATE_EXPERTISE',
  COMPLETED = 'COMPLETED'
}

export enum ExpertiseSubStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAIL = 'FAIL',
}

export interface ExpertiseDatetime {
  date: string
  times: string[]
}

/**
 * @description сведения о приложенном файле
 */
export interface FileInfo {
  /** Расширение файла */
  extension: string
  /** Тип файла */  
  fileType: 'ARCHIVE' | 'DOCUMENT' | 'PHOTO' | 'RASTER' | 'VIDEO'
  /** Id файла */
  id: string
  /**   Архивирован / Не архивирован */  
  isArchived: boolean
  /** Название файла */  
  name: string
  /** Размер файла */
  size: number
}

/**
 * @description сведения о результатах исправления дефектов на этапе работы
 */
export interface IntervalInfo {
  /** Конечная дата интервала */
  endDateTime: string
  /** Начальная дата интервала */
  startDateTime: string
  /** Значение */
  value: number
}

/**
 * @description интервал проведения работы
 */
export interface ExpertiseEntity {
  /** Срок окончания экспертизы */
  dateExpertiseCompletion: string
  /** Срок заключения договора */
  dateOfSigningContracts: string
  /** True если срок окончания экспертизы просрочен, иначе false */
  dateExpertiseCompletionIsOverdue: boolean
  /** True если заключения договора просрочен, иначе false */
  dateOfSigningContractsIsOverdue: boolean
  /** Описание */
  description?: string
  /** Процент устраненных замечаний по этапу */
  eliminatedComments?: number
  /** Статус этапа */
  expertiseStatus: ExpertiseStatus
  /** Подстатус этапа */
  expertiseSubStatus?: ExpertiseSubStatus
  /** ID прикрепленного файла - для create/update */
  documentId?: string
  /** Информация о прикрепленном файле */
  file?: FileInfo
  /** Устраняется */
  inProgress: number
  /** Информация по интервалам */
  intervalsInfo: IntervalInfo[]
  /** Устранено */
  resolved: number
  /** Название этапа */
  stageName: string
  /** Номер этапа */
  stageNumber: number
  /** Общее количество замечаний по этапу */
  totalRemarks?: number
  /** На рассмотрении у экспертов */
  underExpertReview: number
  /** сортировочный  указатель*/
  order?: number
}

export interface ExpertiseEntryInput {
  inProgress: string,
  resolved: string,
  underExpertReview: string,
  expertiseStatus: ExpertiseStatus,
  expertiseSubStatus?: ExpertiseSubStatus,
  dateExpertiseCompletionIsOverdue: boolean
  dateOfSigningContractsIsOverdue: boolean
  dateExpertiseCompletion: string,
  dateOfSigningContracts: string,
  stageNumber: string,
  intervalDateStart_1: Date,
  intervalDateEnd_1: Date,
  intervalValue_1: string,
  intervalDateStart_2: Date,
  intervalDateEnd_2: Date,
  intervalValue_2: string,
  intervalDateStart_3: Date,
  intervalDateEnd_3: Date,
  intervalValue_3: string,
  description: string,
  documentId: string,
  file?: {
    id: string
    name: string
  }
  order: number
}
/** запись данных об этапе экспертизы с временным ID для привязке к форме редактирования */
export interface ExpertiseEntryStage {
  id: string
  inputs: ExpertiseEntryInput
}

/**
 * @description актуальные данные об этапе работ, получаемые с эндпойнта
 */
export interface ExpertiseActual {
  starts: string | null
  ends: string | null
  contractOverdue: boolean
  expertiseOverdue: boolean
  name: string
  status: ExpertiseStatus
  substatus?: ExpertiseSubStatus
  number: number
  description?: string
  remarks?: {
    total: number
    resolved: number
    pending: number
    percentage?: number
  }
}
/**
 * @description хардкодные данные об этапе работ
 */
export interface ExpertisePreset {
  agreementStatusText: string
  agreementStatusType: "positive" | "negative"
  expertiseEndDate: string
  isOnGovernmentExpertise: boolean
  agreementConclusionDateText?: string
  number: number
}
/**
 * @description запись об этапе работ с указанием источника (эндпойнт/хардкод)
 */
export interface ExpertiseRecord {
  data: ExpertiseActual | ExpertisePreset
  type: 'ACTUAL' | "PRESET"
}

export interface ExpertiseResponse {
  dateTimeAdded: string
  stagesInfo: ExpertiseEntity[]
}
