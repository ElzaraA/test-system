export const STAGES = {
  ENTRANCE_TO_MOSCOW: "ENTRANCE_TO_MOSCOW",
  ENTRANCE_TO_PETERSBURG: "ENTRANCE_TO_PETERSBURG",
  STAGE1: "STAGE1",
  STAGE2: "STAGE2",
  STAGE3: "STAGE3",
  STAGE4: "STAGE4",
  STAGE5: "STAGE5",
  STAGE6: "STAGE6",
  STAGE7: "STAGE7",
  STAGE8: "STAGE8",
  STAGE9: "STAGE9",
}

export const STAGE_DISPLAY_INFO = {
  COMMON: {
    shortTitle: "Итого",
    title: "Общий статус",
    number: null,
    startStation: "Обухово-2",
    startStationIncluded: false,
    endStation: "Крюково (Алабушево)",
    endStationIncluded: false,
    length: 622,
  },
  ENTRANCE_TO_MOSCOW: {
    shortTitle: "Вход в Москву",
    title: "Вход в Москву (Москва – Алабушево)",
    number: null,
    startStation: "",
    startStationIncluded: false,
    endStation: "",
    endStationIncluded: false,
    length: 0,
  },
  ENTRANCE_TO_PETERSBURG: {
    shortTitle: "Вход в Санкт-Петербург",
    title: "Вход в Санкт-Петербург",
    number: null,
    startStation: "",
    startStationIncluded: false,
    endStation: "",
    endStationIncluded: false,
    length: 0,
  },
  STAGE1: {
    shortTitle: "Этап 1",
    title: "Обухово-2 (искл.) – Великий Новгород ВСМ (вкл.)",
    number: 1,
    startStation: "Обухово-2",
    startStationIncluded: false,
    endStation: "Великий Новгород ВСМ",
    endStationIncluded: true,
    length: 141,
  },
  STAGE2: {
    shortTitle: "Этап 2",
    title: "Великий Новгород ВСМ (искл.) – Валдай ВСМ (искл.)",
    number: 2,
    startStation: "Великий Новгород ВСМ",
    startStationIncluded: false,
    endStation: "Валадай ВСМ",
    endStationIncluded: false,
    length: 110,
  },
  STAGE3: {
    shortTitle: "Этап 3",
    title: "Валдай ВСМ (искл.) – Выползово ВСМ (вкл.)",
    number: 3,
    startStation: "Валадай ВСМ",
    startStationIncluded: true,
    endStation: "Выползово ВСМ",
    endStationIncluded: true,
    length: 69,
  },
  STAGE4: {
    shortTitle: "Этап 4",
    title: "Выползово ВСМ (искл.) – Логовежь ВСМ (искл.)",
    number: 4,
    startStation: "Выползово ВСМ",
    startStationIncluded: false,
    endStation: "Логовежь ВСМ",
    endStationIncluded: false,
    length: 117,
  },
  STAGE5: {
    shortTitle: "Этап 5",
    title: "Логовежь ВСМ (вкл.) – Новая Тверь ВСМ (искл.)",
    number: 5,
    startStation: "Логовежь ВСМ",
    startStationIncluded: true,
    endStation: "Новая Тверь ВСМ",
    endStationIncluded: false,
    length: 56,
  },
  STAGE6: {
    shortTitle: "Этап 6",
    title: "Новая Тверь ВСМ (вкл.) – Высоково (искл.)",
    number: 6,
    startStation: "Новая Тверь ВСМ",
    startStationIncluded: true,
    endStation: "Высоково ВСМ",
    endStationIncluded: false,
    length: 74,
  },
  STAGE7: {
    shortTitle: "Этап 7",
    title: "Высоково ВСМ (вкл.) – Крюково (Алабушево) (искл.)",
    number: 7,
    startStation: "Высоково ВСМ",
    startStationIncluded: true,
    endStation: "Крюково (Алабушево)",
    endStationIncluded: false,
    length: 55,
  },
  STAGE8: {
    shortTitle: "Этап 8",
    title: "ДЦУ",
    number: 8,
    startStation: "",
    startStationIncluded: false,
    endStation: "",
    endStationIncluded: false,
    length: 0,
  },
  STAGE9: {
    shortTitle: "Этап 9",
    title: "Основное депо ВСМ – Обухово",
    number: 9,
    startStation: "",
    startStationIncluded: false,
    endStation: "",
    endStationIncluded: false,
    length: 0,
  },
};

export const graphFrag = `
  peopleGraph {
    date
    fact
    plan
  }
  vehicleGraph {
    date
    fact
    plan
  }
`;
