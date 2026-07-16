export type DmsCoordinate = {
  degrees: { value: number; error: boolean };
  minutes: { value: number; error: boolean };
  seconds: { value: number; error: boolean };
};

export type DmsPoint = {
  xCoordinate: DmsCoordinate;
  yCoordinate: DmsCoordinate;
};

export type QuarryPolygon = {
  id: string;
  points: DmsPoint[];
  error: boolean;
};

export type Quarry = {
  id: string | null;
  innerId: string;
  geoId: string | null;
  region: string;
  version: number;
  order: number;
  plotName: { value: string; error: boolean };
  quarryProductionStatus: { value: string | null; error: boolean };
  xCoordinate: { value: string; error: boolean };
  yCoordinate: { value: string; error: boolean };
  polygons: QuarryPolygon[];
  mineralType: { value: string; error: boolean };
  area: { value: string; error: boolean };
  peopleStatistics: { value: string; error: boolean };
  peopleStatisticsDelta: number | null;
  vehicleStatistics: { value: string; error: boolean };
  vehicleStatisticsDelta: number | null;
  totalMineralVolume: { value: string; error: boolean };
  totalMineralVolumeDelta: number | null;
  shippedMineralVolume: { value: string; error: boolean };
  shippedMineralVolumeDelta: number | null;
  licenceForStudy: {
    document: { id: string; name: string; fileId: string | null } | null;
    licenceStatus: { value: string | null; error: boolean };
  };
  licenceForExplorationAndProduction: {
    document: { id: string; name: string; fileId: string | null } | null;
    licenceStatus: { value: string | null; error: boolean };
  };
};

export type CommonQuarry = {
  peopleStatistics: { value: string; error: boolean };
  vehicleStatistics: { value: string; error: boolean };
  geoObjectId: string
  id: string
  plotName: { value: string, error: boolean}
  peopleStatisticsDelta : number | null
  vehicleStatisticsDelta: number | null
  version: number
};

export interface Region {
  region: string
  name: string
  quarries: Quarry[]
  commonQuarry: CommonQuarry
} 
