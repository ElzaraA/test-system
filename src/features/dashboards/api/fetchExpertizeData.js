import { MOCK_EXPERTISE_STAGES } from "@/mocks/dashboards/mainPageData";

export const expertiseDashboardRequest = async () => ({
  ok: true,
  data: {
    data: {
      expertisePage: {
        stagesInfo: MOCK_EXPERTISE_STAGES,
      },
    },
  },
});

export const availableDatesExpertiseRequest = async () => ({
  data: { data: { availableDatesExpertise: [{ date: "25.11.2025", times: ["12:00"] }] } },
});
