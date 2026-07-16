export type LandPlotType = "LAND" | "HECTARY";

export type AggregationType = "BY_STAGE" | "BY_REGION";

export type LandPlotRegion =
  | "LENINGRAD_REGION"
  | "MOSCOW"
  | "MOSCOW_REGION"
  | "NOVGOROD_REGION"
  | "SAINT_PETERSBURG"
  | "TVER_REGION";

export type ScenarioStatusKey = "all" | "work" | "give" | "held";

export type LandStatus = "UNENCUMBERED_BY_THIRD_PEOPLE" | "TAKING_FROM_THIRD_PEOPLE" | "SETTING_EASEMENT";

export interface LandPlotScenarioStatusRecord {
  scenarioStatusType: string;
  value: number;
}

export interface LandPlotScenario {
  name: string;
  scenarioStatusRecords: LandPlotScenarioStatusRecord[];
}

export interface LandPlotEntry {
  allLandType: number;
  dateAdded?: string;
  formalize: number;
  inProgress: number;
  judicialProceeding?: number | null;
  landPlotType: LandPlotType;
  percent: number;
  region?: LandPlotRegion | null;
  scenarios: LandPlotScenario[];
  stageNumber: number;
  stopList: number;
}

export interface LandAllocationScenarioStatus {
  all: number;
  work: number;
  give: number;
  held: number;
}

export interface LandAllocationPage {
  total: {
    is: number;
    from: number;
    plan: number;
  };
  diversionHead: {
    all: number;
    work: number;
    give: number;
    held: number;
  };
  diversion: Record<string, LandAllocationScenarioStatus>;
  judicialProceeding: number | null;
}

export interface LandAllocationStage {
  land: LandAllocationPage | null;
  hectare: LandAllocationPage | null;
}

export type LandAllocationPages = LandAllocationStage[];

export interface LandAllocationPagesResponse {
  registryFileId: string | null;
  pages: LandAllocationPages;
}


export type CreateLandPlotInput = {
  aggregatedBy?: AggregationType | null;
  dateAdded: string;
  judicialProceeding: number | null;
  landPlotType: LandPlotType;
  region?: LandPlotRegion | null;
  scenarios: Array<{
    name: string;
    scenarioStatusRecords: Array<{
      scenarioStatusType: string;
      value: number;
    }>;
  }>;
  stageNumber: number | null;
};

export type CreateLandPlotResponse = Array<{
  aggregatedBy?: AggregationType | null;
  dateAdded: string;
  judicialProceeding: number | null;
  landPlotType: LandPlotType;
  region?: LandPlotRegion | null;
  scenarios: Array<{
    name: string;
    scenarioStatusRecords: Array<{
      scenarioStatusType: string;
      value: number;
    }>;
  }>;
  stageNumber: number | null;
}>;

export interface LandAllocationInfo {
  completeValue: number
  newLandPlotCondition: LandStatus
  planValue: number
}

/** Ответ GraphQL landPlotsInfo для таблицы судебных разбирательств */
export interface LandPlotsInfoEntry {
  additionalComment: string | null;
  allotmentType: string | null;
  cadastralNumber: string;
  courtSessionInfo: string | null;
  id: string;
  issueDescription: string | null;
  responsiblePerson: string | null;
  stage: string | null;
  xCoordinate: number | null;
  yCoordinate: number | null;
}

/** Строка таблицы в модальном окне судебных разбирательств */
export interface JudicialTableRow {
  cadastralNumber: string;
  problematic: string;
  responsible: string;
  hearingDateOrStatus: string;
  withdrawalType: string;
  comment: string;
  commentFull?: string;
  mapLink: string | null;
  stage: string;
}
