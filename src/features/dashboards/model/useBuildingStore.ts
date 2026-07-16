import { defineStore } from "pinia";
import { ref } from "vue";
import { MOCK_BUILDING_MAIN } from "@/mocks/dashboards/mainPageData";

export const useBuildingDashboardStore = defineStore("building-dashboard", () => {
  const loading = ref(false);

  const getBuildingDataForMainPage = async () => MOCK_BUILDING_MAIN;

  return {
    loading,
    getBuildingDataForMainPage,
  };
});
