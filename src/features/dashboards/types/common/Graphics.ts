/**
 * @description цвет в РГБА-представлении, канал прозрачности - опциональный
 * @interface GraphicRGBA
 */
export interface GraphicRGBA {
  /** красный */
  r: number
  /** зеленый */
  g: number
  /** синий */
  b: number
  /** прозрачность */
  alpha?: number
}
/***
 * @description набор сведений для построения одного кусочно-линейного графика
 * @interface GraphicEntry
 */
export interface GraphicEntry {
  /** тип графика, пока что одно из PLAN / FACT */
  type?: string
  /** заголовок графика */
  label: string,
  /** служебное имя графика */
  name?: string,
  /** заливка под графиком */
  fill?: boolean,
  /** тип линии графика */
  style?: "solid" | "dashed" | "dotted",
  /** цвет рамки для точки графика */
  borderColor?: GraphicRGBA,
  /** цвет линий графика */
  color: GraphicRGBA,

  /** точки значений  */
  values: number[],
}
/**
 * @description набор форматированных данных для построения серии графиков библиотекой echarts
 * @interface GraphicData
 */
export interface GraphicData {
  /** подписи к точкам аргумента */
  labels: string[]
  /** данные для серии графиков */
  lines: GraphicEntry[]

  focusedLabel?: string
}
