/** Значения соответствуют enum Criticality в API (CRITICAL, MEDIUM, MINIMAL, OPTIMAL, WITHOUT_RESERVE). */
export type PolygonCriticality =
  | "critical"
  | "medium"
  | "minimal"
  | "optimal"
  | "without_reserve";
export type PolygonWorkStatus = "started" | "not_started";
export type PolygonFinancingStatus = "on-schedule" | "delayed";

export interface PolygonPrepayment {
  name: string;
  paymentDate: string;
  financingStatus: PolygonFinancingStatus;
}

export interface PolygonCamera {
  name: string;
  cameraSource: string;
  cameraSourceType: string;
}

export interface PolygonDocument {
  name: string;
  fileId: string;
}

export interface Polygon {
  id: string;
  /** Идентификатор геообъекта (из GET при обновлении; при создании генерируется). */
  geoObjectId: string;
  name: string;
  polygonNumber: number | null;
  criticality: PolygonCriticality;
  workStatus: PolygonWorkStatus;
  constructionStart: string;
  totalDays: number;
  constructionEnd: string;
  financingStatus: PolygonFinancingStatus;
  prepayments: PolygonPrepayment[];
  equipmentDelivery: string;
  firstBeamDate: string;
  /** Версия для оптимистичной блокировки при сохранении. */
  version: number;
  /** Документы мониторинга (объезды). */
  monitoring: PolygonDocument[];
  /** Камеры. */
  cameras: PolygonCamera[];
  /** Проектная документация. */
  documentation: PolygonDocument[];
  /** Долгота (для ссылки на карту). */
  xCoordinate: number | null;
  /** Широта (для ссылки на карту). */
  yCoordinate: number | null;
  /** Площадь (м²), из GET — передаётся обратно при сохранении. */
  area: number | null;
  /** Кол-во балок. */
  beamsCount: number | null;
  /** Расположение (строковый параметр из API). */
  location: string | null;
  /** СМР. */
  smr: string | null;
  /** Оборудование. */
  equipment: string | null;
  /** ID камер (из GET, для подстановки в админке). */
  camerasIds?: string[];
  /** ID проектных документов (из GET, для подстановки в админке). */
  projectDocumentsIds?: string[];
  /** ID объезда строительного мониторинга (из GET, для подстановки в админке). */
  constructionMonitoringId?: string | null;
  /** Названия проектных документов из GET (для автозаполнения в админке). */
  projectDocumentsDisplay?: { id: string; name: string }[];
  /** Названия камер из GET (для автозаполнения в админке). */
  camerasDisplay?: { id: string; name: string }[];
  /** Объезд из GET (для автозаполнения в админке). */
  monitoringDisplay?: { id: string; name: string } | null;
}

/** Полигон с полями для редактирования в админке (доп. поля не отображаются в основной секции). */
export interface PolygonEditable extends Polygon {
  projectDocumentsIds: string[];
  cameraIds: string[];
  /** ID объезда (одна строка). */
  monitoringId: string;
  xCoordinate: number | null;
  yCoordinate: number | null;
}
