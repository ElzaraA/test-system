import { ref } from "vue";
import { defineStore } from "pinia";
import { MOCK_KSG_DATE, MOCK_KSG_TABLE } from "@/mocks/dashboards/mainPageData";

export const ksgPageKey = (date) => date.toISOString() ?? null;
export const ksgTableKey = (date) => date.toISOString() ?? null;

export const useKsgStore = defineStore("ksg-dashboard", () => {
  const loading = ref(false);
  const loadingReason = ref(null);
  const availableDates = ref([MOCK_KSG_DATE]);
  const ksgPages = ref({});
  const ksgTables = ref({ [ksgTableKey(MOCK_KSG_DATE)]: MOCK_KSG_TABLE });

  const clearCached = () => {
    availableDates.value = [MOCK_KSG_DATE];
    ksgTables.value = { [ksgTableKey(MOCK_KSG_DATE)]: MOCK_KSG_TABLE };
  };

  const loadAvailableDates = async () => ({ ok: true, error: null });

  const loadKsgTable = async (date) => {
    ksgTables.value[ksgTableKey(date)] = MOCK_KSG_TABLE;
    return { ok: true, error: null };
  };

  const deletePage = async () => ({ ok: true, error: null });

  return {
    loading,
    loadingReason,
    availableDates,
    ksgPages,
    ksgTables,
    clearCached,
    loadAvailableDates,
    loadKsgTable,
    deletePage,
  };
});
