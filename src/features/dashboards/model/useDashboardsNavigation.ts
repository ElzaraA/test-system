import { computed } from "vue";
import { useRoute } from "vue-router";

export enum tabKeyToRoute {
  "status" = 1,
  "expertise" = 2,
  "land" = 3,
  "land-allocation" = 4,
  "construction" = 5,
  "building" = 6,
  "quarries" = 7,
  "money" = 8,
  "train" = 9,
  "media" = 10,
  "president" = 11,
  "schedule" = 12,
  "pos" = 13,
  "risks" = 14,
  "factories" = 15,
  "scp" = 16,
}

export const useDashboardsNavigation = () => {
  const route = useRoute();

  const currentDashboardPage = computed({
    get() {
      const section = route?.path.split("/").at(2) || "status";
      return tabKeyToRoute[section as keyof typeof tabKeyToRoute] || tabKeyToRoute.status;
    },
    set() {
      /* навигация отключена в standalone */
    },
  });

  return {
    currentDashboardPage,
    setDashboardPage: () => {
      /* навигация отключена в standalone */
    },
  };
};
