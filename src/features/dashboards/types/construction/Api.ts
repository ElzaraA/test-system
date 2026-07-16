export type DesignTypes = "CENTRAL_SECTION" | "ENTRANCE_MOSCOW" | "ENTRANCE_PETERSBURG";

export type StatusDesigning = "APPROVED" | "AT_WORK" | "NOT_REQUIRED";

export interface Deadline {
  success?: StatusDesigning;
  date?: Date;
  description?: string;
}

export interface AdjustmentDpt {
  statusDesigning: StatusDesigning;
  adjustmentDate?: Date;
  furtherInformation?: string;
}

export interface CompletionPeriodGge {
  statusDesigning: StatusDesigning;
  description?: string;
  positiveConclusionDate?: Date;
}

export interface DesigningRecordInfo {
  stageNumber: string;
  stageName: string;
  /**
   * float
   */
  designingCost: number;
  percentReadinessIi: number;
  percentReadinessDpt: number;
  percentReadinessPd: number;
  approvalStatusDpt: StatusDesigning;
  adjustmentDpt: AdjustmentDpt;
  termConclusionContract: Date;
  completionPeriodGge: CompletionPeriodGge;
  isUnionSubstage: boolean;
  children?: DesigningRecordInfo[];
}

export interface DesigningPage {
  /**
   * float
   */
  designCost: number;
  dateAdded: Date;
  designTypes: DesignTypes;
  designingRecordInfos: DesigningRecordInfo[];
}

export interface AvailableDatesDesigningType {
  designTypes: DesignTypes;
  availableDate: Date[];
}

export type AvailableDatesDesigning = Record<DesignTypes, Date[]>;

export interface RecordDefault extends DesigningRecordInfo {
  children?: RecordDefault[];
  error: boolean;
  id: number;
}

export interface TableRowData {
  step?: string;
  description: string;
  data?: {
    cost?: number;
    readiness: [number, number, number];
    approval?: StatusDesigning;
    correction: Deadline;
    obtainment?: Deadline;
  };
  joined: number | null;
  named: boolean;
}

export interface WorkElement {
  delta: number
  expired: number
  fact: number
  order: number
  percent: number
  plan: number
  postDescription: string
  previousDescription: string
  unit: string
  workElementName: string
  workElementNameId: string
}

export interface WorkStageData {
  stage: string
  title: string
  workElements: WorkElement[]
}

export interface WorkBuildingData {
  actualDate: Date
  works: WorkStageData[]
}

export interface WorkStageDescription {
  shortTitle: string
  title: string
  number: number | null
  startStation: string
  startStationIncluded: boolean
  endStation: string
  endStationIncluded: boolean
  length: number
}
