import { defineStore } from "pinia";
import { ref } from "vue";
import { MOCK_LAND_DATES, MOCK_LAND_MAIN } from "@/mocks/dashboards/mainPageData";

export const useLandStore = defineStore("land-dashboard", () => {
  const dates = ref(MOCK_LAND_DATES);
  const currentDate = ref("25.11.2025");
  const currentTime = ref("12:00");

  const getNewestDateTime = () => [dates.value[0]?.date ?? null, dates.value[0]?.times?.[0] ?? null];

  const loadDateTimes = async () => dates.value;

  const getLandDataForMain = async () => MOCK_LAND_MAIN;

  return {
    dates,
    currentDate,
    currentTime,
    getNewestDateTime,
    loadDateTimes,
    getLandDataForMain,
  };
});
