<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Icon } from "@/lib";
import { useBuildingDashboardService } from "../../api/fetchBuildingData";
import LineChart from "../common/LineChart.vue";
import DashboardDate from "../common/DashboardDate.vue";
import Legend from "../common/Legend.vue";
import type { ResourcesScenario, WorkerEntry } from "../../types";
import { GraphicData, GraphicEntry } from "../../types/common/Graphics";
import type { LoaderFn } from "../../types/main/Api";

const legend = [
  {
    text: "Люди\n(факт)",
    color: "rgba(42, 180, 174, 1)",
  },
  {
    text: "Техника\n(факт)",
    color: "rgba(123, 87, 224, 1)",
  },
  {
    text: "Люди\n(скорр. план)",
    color: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(42, 180, 174, 1)",
  },
  {
    text: "Техника\n(скорр. план)",
    color: "rgba(255, 255, 255, 1)",
    borderColor: "rgba(123, 87, 224, 1)",
  },
];

type ResourcesStageKey = "COMMON" | "STAGE1" | "STAGE2" | "STAGE3" | "STAGE4" | "STAGE5" | "STAGE6" | "STAGE7";

const RESOURCE_STAGES: ResourcesStageKey[] = ["COMMON", "STAGE1", "STAGE2", "STAGE3", "STAGE4", "STAGE5", "STAGE6", "STAGE7" ];

const props = defineProps<{ loadWatcher: LoaderFn }>();

const emit = defineEmits<{
  "update:sectionTitle": [title: string];
}>();

const numberIntl = Intl.NumberFormat("ru-RU");
const buildingService = useBuildingDashboardService();

const date = ref<Date | null>(null);
const scenarioSource = ref<ResourcesScenario | null>(null);
const selectedStage = ref<ResourcesStageKey>("STAGE6");
const resourcesData = ref<GraphicData | null>(null);

const formatNumber = (number: number) => numberIntl.format(number);

const peopleQty = computed(() => {
  if (resourcesData.value === null) return null;
  const values = resourcesData.value.lines.find((d) => d.name === "people")?.values;
  return values ? formatNumber(values[values.length - 1]) : null;
});

const machinesQty = computed(() => {
  if (resourcesData.value === null) return null;
  const values = resourcesData.value.lines.find((d) => d.name === "machines")?.values;
  return values ? formatNumber(values[values.length - 1]) : null;
});

const dateSort = (entry1: WorkerEntry, entry2: WorkerEntry) =>
  new Date(entry1.date).valueOf() - new Date(entry2.date).valueOf();

function sectionTitleForStage(stage: ResourcesStageKey): string {
  switch (stage) {
    case "COMMON":
      return "Ресурсы (весь проект)";
    case "STAGE1":
      return "Ресурсы (Этап 1)";
    case "STAGE2":
      return "Ресурсы (Этап 2)";
    case "STAGE3":
      return "Ресурсы (Этап 3)";
    case "STAGE4":
      return "Ресурсы (Этап 4)";
    case "STAGE5":
      return "Ресурсы (Этап 5)";
    case "STAGE6":
      return "Ресурсы (Этап 6)";
    case "STAGE7":
      return "Ресурсы (Этап 7)";
  }
}

function buildResourcesGraph(data: ResourcesScenario, stage: ResourcesStageKey): GraphicData {
  const graph: GraphicData = { labels: [], lines: [] };
  const peopleLine: GraphicEntry = {
    label: "Люди (факт)",
    name: "people",
    type: "FACT",
    color: { r: 42, g: 180, b: 174 },
    values: [],
  };
  const peoplePlanLine: GraphicEntry = {
    label: "Люди (скорр. план)",
    name: "people-plan",
    type: "PLAN",
    fill: false,
    borderColor: { r: 42, g: 180, b: 174 },
    color: { r: 255, g: 255, b: 255 },
    style: "dashed",
    values: [],
  };
  const vehicleLine: GraphicEntry = {
    label: "Техника (факт)",
    name: "machines",
    type: "FACT",
    color: { r: 123, g: 87, b: 224 },
    values: [],
  };
  const vehiclePlanLine: GraphicEntry = {
    label: "Техника (скорр. план)",
    name: "machines-plan",
    type: "PLAN",
    fill: false,
    borderColor: { r: 123, g: 87, b: 224 },
    color: { r: 255, g: 255, b: 255 },
    style: "dashed",
    values: [],
  };

  const peoplesGraphData =
    data.peopleGraph
      .find((s) => s.stage === stage)
      ?.graph.toSorted(dateSort)
      .map((r) => ({
        ...r,
        plan: r.plan === 0 ? null : r.plan,
        fact: r.fact === 0 ? null : r.fact,
      })) || [];

  const vehiclesGraphData =
    data.vehicleGraph
      .find((s) => s.stage === stage)
      ?.graph.toSorted(dateSort)
      .map((r) => ({
        ...r,
        plan: r.plan === 0 ? null : r.plan,
        fact: r.fact === 0 ? null : r.fact,
      })) || [];

  peoplesGraphData.forEach((r) => {
    graph.labels.push(new Date(r.date).toLocaleDateString("ru-RU"));
    peopleLine.values.push(r.fact);
    peoplePlanLine.values.push(r.plan);
  });

  vehiclesGraphData.forEach((r) => {
    vehicleLine.values.push(r.fact);
    vehiclePlanLine.values.push(r.plan);
  });

  if (peoplesGraphData.length === 0) {
    return graph;
  }

  graph.lines.push(peopleLine, peoplePlanLine, vehicleLine, vehiclePlanLine);
  return graph;
}

function syncGraphAndTitle() {
  const data = scenarioSource.value;
  if (data === null) return;
  resourcesData.value = buildResourcesGraph(data, selectedStage.value);
  emit("update:sectionTitle", sectionTitleForStage(selectedStage.value));
}

watch([scenarioSource, selectedStage], syncGraphAndTitle);

function shiftStage(delta: -1 | 1) {
  const i = RESOURCE_STAGES.indexOf(selectedStage.value);
  selectedStage.value = RESOURCE_STAGES[(i + delta + RESOURCE_STAGES.length) % RESOURCE_STAGES.length]!;
}

defineExpose({ shiftStage });

onMounted(async () => {
  const resourcesDataRaw = await buildingService.getPeopleAndVehicleConstructionGraph();
  const graphResponse = resourcesDataRaw.data?.data?.peopleAndVehicleGraph;
  const data: ResourcesScenario | null = graphResponse
    ? {
        actualDate: graphResponse.actualDate,
        peopleGraph: (graphResponse.peopleAndVehicleGraphs ?? []).map((stageData) => ({
          stage: stageData.stage,
          graph: stageData.peopleGraph ?? [],
        })),
        vehicleGraph: (graphResponse.peopleAndVehicleGraphs ?? []).map((stageData) => ({
          stage: stageData.stage,
          graph: stageData.vehicleGraph ?? [],
        })),
      }
    : null;
  props.loadWatcher?.("resources");
  date.value = data?.actualDate ? new Date(data.actualDate) : null;
  scenarioSource.value = data ?? null;
});
</script>

<template>
  <div v-if="resourcesData !== null && date !== null" class="main-resources-dashboard">
    <DashboardDate :date="date" :style="{ gridColumn: 'span 2' }" />

    <div class="main-resources-dashboard__chart-wrapper">
      <LineChart :data="resourcesData" horizontal-scroll class="main-resources-dashboard__chart" />
    </div>

    <div class="main-resources-dashboard__numbers-wrapper">
      <div class="main-resources-dashboard__numbers-item">
        <Icon name="people" color-name="dark-color-text-secondary" size="lg" />
        <p class="main-resources-dashboard__numbers-value main-resources-dashboard__numbers-value--green">
          {{ peopleQty }}
        </p>
        <p class="main-resources-dashboard__numbers-label">
          человек
        </p>
      </div>

      <div class="main-resources-dashboard__numbers-item">
        <Icon name="technic-2" color-name="dark-color-text-secondary" size="lg" />
        <p class="main-resources-dashboard__numbers-value main-resources-dashboard__numbers-value--purple">
          {{ machinesQty }}
        </p>
        <p class="main-resources-dashboard__numbers-label">
          техники
        </p>
      </div>
      <Legend :data="legend" direction="vertical" class="main-resources-dashboard__legend" />
    </div>
  </div>
</template>
