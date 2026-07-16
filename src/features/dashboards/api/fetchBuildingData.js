import { MOCK_BUILDING_MAIN, MOCK_RESOURCES_GRAPH } from "@/mocks/dashboards/mainPageData";

const ok = (data) => Promise.resolve({ ok: true, data: { data } });

export const useBuildingDashboardService = () => ({
  getBuildingMainPage: () => ok({ constructionWorks: MOCK_BUILDING_MAIN }),
  getPeopleAndVehicleConstructionGraph: () =>
    ok({ peopleAndVehicleGraph: MOCK_RESOURCES_GRAPH }),
});
