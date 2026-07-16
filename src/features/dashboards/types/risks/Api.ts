/** ИД на создание меры противодействия рискам */
export interface RiskActionInput {
  deadline: string
  influence: number
  name: string
  responsible: string
} 
/** ИД на создание/редактирование фактора риска */
export interface RiskCreationInput {
  compensatedDelay: number
  compensationImplementationProbability: number
  compensationProbability: number
  dateAdded: string
  hazardDelay: number
  hazardImplementationProbability: number
  hazardProbability: number
  id: string
  name: string
  note: string
  order: number
  parentId: string | null
  riskActions: RiskActionInput[]
  shortName: string
  subfactors: RiskCreationInput[]
}


/** Мероприятие по сдерживанию и компенсации фактора риска */
export interface RiskAction {
  /** Дата завершения мероприятия */
  deadline: string | null 
  /** Количество дней влияния на риск */
  influence: number  
  /** Название мероприятия */
  name: string
  /** Ответственный */
  responsible: string
}

/** описание фактора риска */
export interface RiskFactor {
  /** Количество детей */
  childrenCount: number
  /** Задержка с учетом компенсирующих мероприятий */  
  compensatedDelay: number | null
  /** Вероятность реализации с учётом компенсирующих мероприятий */  
  compensationImplementationProbability?: number
  /** Результат моделирования сроков компенсации с учётом вероятности, дн.*/
  compensationSimulationResult?: number
  /** Оценка влияния на сроки с учётом компенсирующих мероприятий */
  compensationProbability?: number
  /** Задержка без учета компенсирующих мероприятий */
  hazardDelay: number | null
  /** Вероятность реализации без учёта компенсирующих мероприятий */
  hazardImplementationProbability?: number
  /** Результат моделирования задержки риска - срок с учётом вероятности, дн. */
  hazardSimulationResult?: number
  /** Оценка влияния на сроки без учёта вероятности реализации (без компенсирующих мероприятий) */
  hazardProbability?: number
  /** Дата добавления записи */
  dateAdded: string  
  /** Id фактора */
  id: string
  /** Название фактора */
  name: string
  /**   Примечание */  
  note: string
  /** Порядковый номер элемента  */
  order: number
  /** Id родителя */  
  parentId?: string | null
  /** Список мероприятий противодействия факторам рисука */
  riskActions: RiskAction[]
  /** Краткое название фактора */
  shortName: string
  /** */
  subfactors?: RiskFactor[]
}

export type RiskFactorExtended = RiskFactor & {
  provisional?: boolean
  isAggregate?: boolean
};
