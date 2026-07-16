<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import { useExpertiseStore } from "../../model/useExpertiseStore";
import DashboardDate from "../common/DashboardDate.vue";
import { expertiseDashboardRequest } from "../../api/fetchExpertizeData";
import { ExpertiseActual, ExpertiseStatus, type ExpertiseEntity } from "../../types/expertise/Api";
import {
  DashboardExpertiseControl,
  DashboardExpertiseCorrection,
  DashboardExpertiseDesign,
  DashboardExpertiseReady,
} from "./expertise-entries";
import type { LoaderFn } from "../../types/main/Api";

const props = defineProps<{ loadWatcher: LoaderFn }>();

const expertiseStore = useExpertiseStore();
const expertiseData = ref<ExpertiseActual[]>([]);
const currentDate = ref<string | null>(null);
const currentTime = ref<string | null>(null);

const currentDateTime = computed(() => {
  if (!currentDate.value) return new Date();
  const [day, month, year] = currentDate.value.split('.');
  const _date = [year, month, day].join('-');
  return new Date([_date, currentTime.value].join(' '));
});

const componentStatusMap = new Map([
  [ExpertiseStatus.STATE_EXPERTISE, DashboardExpertiseCorrection],
  [ExpertiseStatus.EXPERT_SUPPORT, DashboardExpertiseCorrection],
  [ExpertiseStatus.DESIGN, DashboardExpertiseDesign],
  [ExpertiseStatus.ENTRANCE_CONTROL, DashboardExpertiseControl],
  [ExpertiseStatus.COMPLETED, DashboardExpertiseReady],
]);

const expertiseDataSorted = computed(() => expertiseData.value.sort((e0, e1) => e0.number - e1.number));

function getStageData(info: ExpertiseEntity): ExpertiseActual {
  const {
    dateExpertiseCompletion,
    dateOfSigningContracts,
    dateExpertiseCompletionIsOverdue: expertiseOverdue,
    dateOfSigningContractsIsOverdue: contractOverdue,
    expertiseStatus: status,
    expertiseSubStatus: substatus,
    stageName: name,
    description,
    stageNumber: number,
    totalRemarks: total,
    inProgress: pending,
    resolved,
    file,
    eliminatedComments: percentage,
  } = info;

  const starts = dateOfSigningContracts ? new Date(dateOfSigningContracts).toLocaleDateString("ru-RU") : null;
  const ends = dateExpertiseCompletion ? new Date(dateExpertiseCompletion).toLocaleDateString("ru-RU") : null;
  const remarks = total ? { pending, resolved, total, percentage } : undefined;
  return {
    starts,
    ends,
    contractOverdue,
    expertiseOverdue,
    status,
    substatus,
    name,
    description: description || file?.name || '-',
    number,
    remarks
  };
}

onBeforeMount(async () => {
  try {
    await expertiseStore.loadDateTimes();
    const [date, time] = expertiseStore.getNewestDateTime();
    currentDate.value = date;
    currentTime.value = time;

    const response = await expertiseDashboardRequest(currentDate.value as string, currentTime.value as string);
    if (!response.ok) throw new Error('Ошибка при получении сведений дашборда');
    const stagesInfo: ExpertiseEntity[] = response.data.data.expertisePage?.stagesInfo || [];

    expertiseData.value = stagesInfo.map(getStageData);
  } catch (e) {
    console.error(e);
  } finally {
    props.loadWatcher?.("expertise");
  }
})
</script>

<template>
  <div class="main-expertise-dashboard">
    <DashboardDate :date="currentDateTime" :show-time="true" />
    <div class="main-expertise-dashboard__table">
      <div class="main-expertise-dashboard__table-head">
        Этап
      </div>
      <div class="main-expertise-dashboard__table-head">
        Замечания
      </div>
      <div class="main-expertise-dashboard__table-head" style="grid-column: span 3">
        Статус замечаний
      </div>
      <div class="main-expertise-dashboard__table-head">
        Окончание экспертизы
      </div>
      <component
        :is="componentStatusMap.get(entry.status)"
        v-for="entry in expertiseDataSorted"
        :key="entry.number"
        v-bind="entry"
      />
    </div>
  </div>
</template>
