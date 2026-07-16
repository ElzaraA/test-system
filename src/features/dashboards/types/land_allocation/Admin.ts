export type ScenarioStatusType = "IN_PROGRESS" | "FORMALIZE" | "STOP_LIST";

export interface ScenarioStatusRecord {
  scenarioStatusType: ScenarioStatusType;
  value: number;
}

export interface Scenario {
  name: string;
  scenarioStatusRecords: ScenarioStatusRecord[];
}

export interface StageData {
  judicialProceeding: number | null;
  scenarios: Scenario[];
}

export interface LandAllocationAdminStage {
  stageNumber: number;
  land: StageData;
  hectare: StageData;
}

import type { LandPlotRegion } from "./Api";

export interface LandAllocationAdminRegion {
  region: LandPlotRegion;
  land: StageData;
  hectare: StageData;
}




