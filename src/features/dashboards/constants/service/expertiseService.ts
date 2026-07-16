import { ExpertiseStatus, ExpertiseSubStatus } from "../../types/expertise/Api";

/** Обязательные поля на этапе экспертного сопровождения/гос.экспертизы  */
const RequiredKeysCorrection = ["stageNumber", "resolved", "inProgress", "underExpertReview"];
/** Обязательные поля на этапе 'контроль пройден'  */
const RequiredKeysReady = ["stageNumber", "description", "documentId"];
/** Обязательные поля на этапе входного контроля */
const RequiredKeysEntry = ["stageNumber", "description", "expertiseSubStatus"];
/** Обязательные поля не этапе проектирования */
const RequiredKeysDesign = ["stageNumber", "dateExpertiseCompletion", "dateOfSigningContracts"];

/** список полей, обязательных для каждого статуса этапа проверки документации */
export const requiredKeysMap = new Map([
  [ExpertiseStatus.EXPERT_SUPPORT, RequiredKeysCorrection],
  [ExpertiseStatus.STATE_EXPERTISE, RequiredKeysCorrection],
  [ExpertiseStatus.ENTRANCE_CONTROL, RequiredKeysEntry],
  [ExpertiseStatus.COMPLETED, RequiredKeysReady],
  [ExpertiseStatus.DESIGN, RequiredKeysDesign],
]);

/** Название каждого статуса*/
export const ExpertiseLabelMap = new Map([
  [ExpertiseStatus.STATE_EXPERTISE, "Государственная экспертиза"],
  [ExpertiseStatus.EXPERT_SUPPORT, "Экспертное сопровождение"],
  [ExpertiseStatus.ENTRANCE_CONTROL, "Входной контроль"],
  [ExpertiseStatus.COMPLETED, "Экспертиза пройдена"],  
  [ExpertiseStatus.DESIGN, "Этап проектирования"],  
]);

/** Название каждого подстатуса входного контроля*/
export const ControlLabelMap = new Map([
  [ExpertiseSubStatus.IN_PROGRESS, "В работе"],
  [ExpertiseSubStatus.COMPLETED, "Пройдена"],
  [ExpertiseSubStatus.FAIL, "Не пройдена"],
]);

/** Цветовая подборка для входного контроля*/
export const ControlColorMap = new Map([
  [ExpertiseSubStatus.IN_PROGRESS, "orange"],
  [ExpertiseSubStatus.COMPLETED, "green"],
  [ExpertiseSubStatus.FAIL, "red"],
]);

/** Варианты ошибок, возможные при попытке сохранения этапов работ */
export const expertiseErrorMap = new Map([
  ["hasEmptyInputs", "Для сохранения необходимо заполнить все поля"],
  ["hasDuplicateStageNumber", "Этап не может быть добавлен более одного раза"],
  ["hasIncorrectDates", "Дата начала интервала не может быть позже конца"],
  ["hasEmptyDate", "Для сохранения необходимо выбрать дату"],
]);
/** индексы интервалов, которые существуют в этапе */
export const expertiseIntervalIndices = [1, 2, 3];
/** цвета графиков для динамики отработки замечаний */
export const chartDynamicColors = ["#2AB4AE", "#1C8783", "#0E5755"];
export const chartRemarksColors = ["#1C8783", "#FF4D4D", "#FF8A00"];
