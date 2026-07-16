const today = new Date("2025-11-25T12:00:00");

export const MOCK_KSG_DATE = today;

export const MOCK_KSG_TABLE = {
  dateAdded: MOCK_KSG_DATE,
  ksgRecords: [
    {
      number: 1,
      name: "Стадии проекта и отчетные даты",
      minimalReserve: 2,
      overdueByCurrentDay: 1,
      totalPoints: 42,
    },
    {
      number: 2,
      name: "Проектирование",
      minimalReserve: 0,
      overdueByCurrentDay: 3,
      totalPoints: 28,
    },
    {
      number: 3,
      name: "Строительство инфраструктуры и землеустройство",
      minimalReserve: 4,
      overdueByCurrentDay: 0,
      totalPoints: 56,
    },
    {
      number: 4,
      name: "Финансирование (в том числе авансирование) ВСМ",
      minimalReserve: 1,
      overdueByCurrentDay: 2,
      totalPoints: 19,
    },
    {
      number: 5,
      name: "Создание подвижного состава",
      minimalReserve: 0,
      overdueByCurrentDay: 0,
      totalPoints: 12,
    },
    {
      number: 6,
      name: "Эксплуатация",
      minimalReserve: 0,
      overdueByCurrentDay: 0,
      totalPoints: 8,
    },
  ],
  totalMinimalReserve: 7,
  totalOverdueByCurrentDay: 6,
  totalPoints: 165,
};

export const MOCK_BUILDING_MAIN = {
  actualDate: today.toISOString(),
  works: [
    {
      stage: "STAGE6",
      title: "Этап 6",
      workElements: [
        {
          order: 1,
          workElementName: "Искусственные сооружения",
          workElementNameId: "Isso",
          unit: "шт",
          fact: 8,
          plan: 16,
          expired: 0,
          percent: 50,
          delta: 0,
          postDescription: "",
          previousDescription: "",
        },
        {
          order: 2,
          workElementName: "Земляное полотно",
          workElementNameId: "Zp",
          unit: "тыс. м³",
          fact: 427.4,
          plan: 8607.4,
          expired: 12.5,
          percent: 4.97,
          delta: 0,
          postDescription: "",
          previousDescription: "",
        },
        {
          order: 3,
          workElementName: "Верхнее строение пути",
          workElementNameId: "Vsp",
          unit: "км",
          fact: 0,
          plan: 74.2,
          expired: 0,
          percent: 0,
          delta: 0,
          postDescription: "",
          previousDescription: "",
        },
        {
          order: 4,
          workElementName: "Контактная сеть",
          workElementNameId: "Ks",
          unit: "км",
          fact: 0,
          plan: 224,
          expired: 0,
          percent: 0,
          delta: 0,
          postDescription: "",
          previousDescription: "",
        },
      ],
    },
  ],
};

const RESOURCE_DATES = [
  "2025-07-01",
  "2025-07-20",
  "2025-08-10",
  "2025-08-25",
  "2025-09-10",
  "2025-10-01",
  "2025-10-20",
  "2025-11-05",
  "2025-11-25",
];

/** Базовые кривые для масштабирования по этапам */
const RESOURCE_BASE_PEOPLE = {
  fact: [2100, 2450, 2800, 3200, 3800, 4500, 5200, 6100, 7200],
  plan: [2000, 2400, 2750, 3150, 3700, 4400, 5100, 6000, 7000],
};

const RESOURCE_BASE_MACHINES = {
  fact: [620, 710, 820, 940, 1100, 1280, 1450, 1680, 1950],
  plan: [600, 700, 800, 920, 1080, 1250, 1420, 1650, 1900],
};

const RESOURCE_STAGE_SCALE = {
  COMMON: { people: 2.35, machines: 2.1 },
  STAGE1: { people: 0.42, machines: 0.38 },
  STAGE2: { people: 0.55, machines: 0.5 },
  STAGE3: { people: 0.68, machines: 0.62 },
  STAGE4: { people: 0.78, machines: 0.72 },
  STAGE5: { people: 0.88, machines: 0.82 },
  STAGE6: { people: 1.65, machines: 1.55 },
  STAGE7: { people: 0.95, machines: 0.9 },
};

function scaleSeries(series, multiplier, jitter = 0) {
  return series.map((value, index) => {
    const wave = 1 + Math.sin(index + jitter) * 0.04;
    return Math.max(0, Math.round(value * multiplier * wave));
  });
}

function makeResourceGraph(peopleScale, jitter = 0) {
  const fact = scaleSeries(RESOURCE_BASE_PEOPLE.fact, peopleScale, jitter);
  const plan = scaleSeries(RESOURCE_BASE_PEOPLE.plan, peopleScale, jitter + 1);

  return RESOURCE_DATES.map((date, i) => ({
    date,
    fact: fact[i],
    plan: plan[i],
  }));
}

function makeVehicleGraph(machinesScale, jitter = 0) {
  const fact = scaleSeries(RESOURCE_BASE_MACHINES.fact, machinesScale, jitter);
  const plan = scaleSeries(RESOURCE_BASE_MACHINES.plan, machinesScale, jitter + 2);

  return RESOURCE_DATES.map((date, i) => ({
    date,
    fact: fact[i],
    plan: plan[i],
  }));
}

function buildResourceStageEntry(stage, index) {
  const scale = RESOURCE_STAGE_SCALE[stage];
  return {
    stage,
    peopleGraph: makeResourceGraph(scale.people, index),
    vehicleGraph: makeVehicleGraph(scale.machines, index),
  };
}

const RESOURCE_STAGES = ["COMMON", "STAGE1", "STAGE2", "STAGE3", "STAGE4", "STAGE5", "STAGE6", "STAGE7"];

export const MOCK_RESOURCES_GRAPH = {
  actualDate: today.toISOString(),
  peopleAndVehicleGraphs: RESOURCE_STAGES.map((stage, index) => buildResourceStageEntry(stage, index)),
};

export const MOCK_LAND_DATES = [{ date: "25.11.2025", times: ["12:00"] }];

export const MOCK_LAND_MAIN = [
  {
    newLandPlotCondition: "UNENCUMBERED_BY_THIRD_PEOPLE",
    completeValue: 1240,
    planValue: 380,
  },
  {
    newLandPlotCondition: "TAKING_FROM_THIRD_PEOPLE",
    completeValue: 86,
    planValue: 214,
  },
  {
    newLandPlotCondition: "SETTING_EASEMENT",
    completeValue: 42,
    planValue: 58,
  },
];

export const MOCK_EXPERTISE_DATES = [{ date: "25.11.2025", times: ["12:00"] }];

export const MOCK_EXPERTISE_STAGES = [
  {
    stageNumber: 1,
    stageName: "1",
    description: "ГГЭ № 45-2025",
    dateOfSigningContracts: "2024-06-01",
    dateExpertiseCompletion: "2025-12-15",
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "COMPLETED",
    inProgress: 0,
    resolved: 12,
    totalRemarks: 12,
    eliminatedComments: 100,
  },
  {
    stageNumber: 2,
    stageName: "2",
    description: "ГГЭ № 78-2025",
    dateOfSigningContracts: "2024-09-10",
    dateExpertiseCompletion: "2026-03-01",
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: true,
    expertiseStatus: "STATE_EXPERTISE",
    inProgress: 5,
    resolved: 8,
    totalRemarks: 13,
    eliminatedComments: 62,
  },
  {
    stageNumber: 3,
    stageName: "3",
    description: "Экспертное сопровождение этапа 3",
    dateOfSigningContracts: "2024-11-15",
    dateExpertiseCompletion: "2025-08-30",
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "EXPERT_SUPPORT",
    inProgress: 7,
    resolved: 15,
    totalRemarks: 22,
    eliminatedComments: 68.2,
  },
  {
    stageNumber: 4,
    stageName: "4",
    description: "Проектная документация",
    dateOfSigningContracts: "2025-01-20",
    dateExpertiseCompletion: "2025-11-01",
    dateOfSigningContractsIsOverdue: true,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "DESIGN",
    inProgress: 3,
    resolved: 1,
    totalRemarks: 4,
    eliminatedComments: 25,
  },
  {
    stageNumber: 5,
    stageName: "5",
    description: "Входной контроль — комплект А",
    dateOfSigningContracts: null,
    dateExpertiseCompletion: null,
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "ENTRANCE_CONTROL",
    expertiseSubStatus: "IN_PROGRESS",
    inProgress: 4,
    resolved: 0,
    totalRemarks: 4,
    eliminatedComments: 0,
  },
  {
    stageNumber: 6,
    stageName: "6",
    description: "Входной контроль — комплект Б",
    dateOfSigningContracts: null,
    dateExpertiseCompletion: null,
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "ENTRANCE_CONTROL",
    expertiseSubStatus: "COMPLETED",
    inProgress: 0,
    resolved: 0,
    totalRemarks: 0,
    eliminatedComments: 0,
  },
  {
    stageNumber: 7,
    stageName: "7",
    description: "Входной контроль — комплект В",
    dateOfSigningContracts: null,
    dateExpertiseCompletion: null,
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "ENTRANCE_CONTROL",
    expertiseSubStatus: "FAIL",
    inProgress: 0,
    resolved: 0,
    totalRemarks: 0,
    eliminatedComments: 0,
  },
  {
    stageNumber: 8,
    stageName: "8",
    description: "ГГЭ № 112-2025",
    dateOfSigningContracts: "2025-02-10",
    dateExpertiseCompletion: "2026-06-15",
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: false,
    expertiseStatus: "STATE_EXPERTISE",
    inProgress: 11,
    resolved: 4,
    totalRemarks: 15,
    eliminatedComments: 26.7,
  },
  {
    stageNumber: 9,
    stageName: "9",
    description: "Экспертное сопровождение этапа 9",
    dateOfSigningContracts: "2025-03-01",
    dateExpertiseCompletion: "2025-12-20",
    dateOfSigningContractsIsOverdue: false,
    dateExpertiseCompletionIsOverdue: true,
    expertiseStatus: "EXPERT_SUPPORT",
    inProgress: 9,
    resolved: 6,
    totalRemarks: 15,
    eliminatedComments: 40,
  },
];
