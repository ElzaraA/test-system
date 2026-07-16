/**
 * Типы для API заводов/полигонов.
 * Запрашиваются только поля, используемые в UI дашборда «Заводы».
 */

export const FACTORY_TYPE = {
  PLATE_FACTORIES: "PLATE_FACTORIES",
  POLYGONS_OF_BEAMS: "POLYGONS_OF_BEAMS",
} as const;

export type FactoryType = (typeof FACTORY_TYPE)[keyof typeof FACTORY_TYPE];

export type SortDirection = "ASC" | "DESC";

export interface FactoriesSortingInput {
  /** Сортировка по названию объекта. */
  name?: SortDirection | null;
  /** Сортировка по статусу работ. */
  workStatus?: SortDirection | null;
  /** Сортировка по дате выпуска первой балки/плиты. */
  releaseFirstBeam?: SortDirection | null;
}

export interface GetFactoriesRequestInput {
  /** Дата среза данных. */
  dateAdded: string;
  /** Типы объектов (полигоны или заводы). */
  factoryTypes: FactoryType;
  /** Бэкенд-поиск по подстроке в названии. */
  subString?: string | null;
  /** Фильтр по статусам работ, прокидывается как есть в API. */
  workStatuses?: string[] | null;
  /** Сортировка колонок (name, workStatus, releaseFirstBeam) на бэкенде. */
  sorting?: FactoriesSortingInput | null;
}

export interface ApiPrepayment {
  name: string;
  paymentDate: string | null;
  financingStatus: string;
}

export interface ApiPlannedFinancing {
  /** Общий статус финансирования (для колонки «Плановое финансирование»). */
  financingStatus: string;
  prepayments?: ApiPrepayment[];
}

export interface ApiBlogRecord {
  id: string;
  title: string;
}

export interface ApiCameraInfo {
  id: string;
  name: string;
  cameraSource: string;
  cameraSourceType: string;
}

export interface ApiConstructionMonitoring {
  id: string;
  fileId: string;
  title: string;
}

export interface ApiProjectDocumentInfo {
  id: string;
  fileId: string;
  title: string;
  documentationType: string;
}

export interface ApiVideoInfo {
  id: string;
  fileId: string;
}

export interface ApiFactory {
  id: string;
  geoObjectId: string;
  name: string;
  polygonNumber?: number | null;
  criticality: string;
  workStatus: string;
  startDateTime: string | null;
  endDateTime: string | null;
  totalDays: number | null;
  version: number;
  plannedFinancing: ApiPlannedFinancing | null;
  equipmentSupply: string | null;
  releaseFirstBeam: string | null;
  xCoordinate?: number | null;
  yCoordinate?: number | null;
  area?: number | null;
  camerasIds: string[];
  projectDocumentsIds: string[];
  constructionMonitoringId: string | null;
  beamsCount?: number | null;
  blogRecordsIds?: string[];
  blogRecords?: ApiBlogRecord[] | null;
  camerasInfo?: ApiCameraInfo[] | null;
  constructionMonitoring?: ApiConstructionMonitoring | null;
  constructionMonitoringInfo?: ApiConstructionMonitoring[] | null;
  dateAdded?: string | null;
  endDateDelta?: number | null;
  equipment?: string | null;
  factoryType?: string | null;
  location?: unknown;
  order?: number | null;
  peopleCount?: number | null;
  photosIds?: string[];
  photosInfo?: unknown[] | null;
  productionStatus?: string | null;
  projectDocumentsInfo?: ApiProjectDocumentInfo[] | null;
  smr?: string | null;
  startDateDelta?: number | null;
  videosIds?: string[];
  videosInfo?: ApiVideoInfo[] | null;
}

export interface FactoriesQueryResponse {
  factories: ApiFactory[];
}

/** Вход для мутации saveFactories (соответствует FactoryInput в API). */
export interface FactoryInput {
  id: string | null;
  geoObjectId: string;
  version: number;
  name: string;
  polygonNumber: number | null;
  order: number;
  dateAdded: string;
  factoryType: FactoryType;
  productionStatus: string;
  criticality: string;
  workStatus: string;
  startDateTime: string | null;
  endDateTime: string | null;
  equipmentSupply: string | null;
  releaseFirstBeam: string | null;
  plannedFinancing: {
    financingStatus: string;
    prepayments: Array<{ name: string; paymentDate: string | null; financingStatus: string }>;
  } | null;
  projectDocumentsIds: string[];
  camerasIds: string[];
  videosIds: string[];
  photosIds: string[];
  blogRecordsIds: string[];
  constructionMonitoringId: string | null;
  xCoordinate: number | null;
  yCoordinate: number | null;
  area?: number | null;
  beamsCount?: number | null;
  equipment?: string | null;
  smr?: string | null;
  location?: string | null;
}
