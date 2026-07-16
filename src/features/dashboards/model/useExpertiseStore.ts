import { defineStore } from "pinia";
import { ref } from "vue";
import { MOCK_EXPERTISE_DATES } from "@/mocks/dashboards/mainPageData";

export const useExpertiseStore = defineStore("expertise-dashboard", () => {
  const dates = ref(MOCK_EXPERTISE_DATES);

  const getNewestDateTime = (): [string | null, string | null] => [
    dates.value[0]?.date ?? null,
    dates.value[0]?.times?.[0] ?? null,
  ];

  const loadDateTimes = async () => {
    dates.value = MOCK_EXPERTISE_DATES;
    return dates.value;
  };

  return {
    dates,
    getNewestDateTime,
    loadDateTimes,
  };
});
