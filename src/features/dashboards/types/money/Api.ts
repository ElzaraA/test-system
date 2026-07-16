/**
 * @description запись данных о финансировании работ
 * @interface MoneyRecordEntry 
*/
export interface MoneyRecordEntry {
  /** разность между фактическим и плановым значением */
  delta: number | null
  /** фактические выделенные средства */
  fact: number
  /** запланированные к выделению средства */
  plan: number
  /** является ли глава финансирования вложенной */
  isSubitem: boolean
  /** название главы финансирования */
  name: string
}
/**
 * @description ответ на запрос о финансировании работ
 * @interface MoneyRecordScenario
 */
export interface MoneyRecordScenario {
  /** сведения о финансировании в относительных значениях */
  PERCENT: Array<MoneyRecordEntry[]>
  /** сведения о финансировании в абсолютной величине */
  VALUE: Array<MoneyRecordEntry[]>
}
