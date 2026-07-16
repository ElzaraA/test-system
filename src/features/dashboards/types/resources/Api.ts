/**
 * @description сведения о выделенной на заданный период рабочей силе (сотрудники/единицы техники)
 * @interface WorkerEntry
 */
export interface WorkerEntry {
  /** обозначение периода */
  date: string 
  /** выделено по факту */
  fact: number
  /** запланировано выделить */
  plan: number
}

/**
 * @description запись о рабочей силе, выделенной на отдельный этап работ
 * @interface WorkerEntryPeriod
 */
export interface WorkerEntryPeriod {
  /** список сведений о выделенных рабочих/технике */
  graph: WorkerEntry[]
  /** название этапа работ*/
  stage: string
}

/**
 * @description ответ на запрос о выделении рабочей силы на все этапы выполняемых работ
 * @interface ResourcesScenario
 */
export interface ResourcesScenario {
  /**  */
  actualDate: string
  /** данные о выделенных сотрудниках */
  peopleGraph: WorkerEntryPeriod[]
  /** данные о выделенной рабочей технике */
  vehicleGraph: WorkerEntryPeriod[]
}
