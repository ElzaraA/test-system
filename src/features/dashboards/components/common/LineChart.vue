<script setup lang="ts">
import * as echarts from "echarts";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { GraphicData } from "../../types/common/Graphics";

const numberIntl = Intl.NumberFormat("ru-RU", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

let resizeObserver: ResizeObserver;
let chart: echarts.ECharts | null = null;
const chartWrapper = ref<HTMLElement | null>(null);
const chartRef = ref<HTMLElement | null>(null);
const props = withDefaults(
  defineProps<{
    data: GraphicData;
    horizontalScroll?: boolean;
    pointWidthPx?: number;
  }>(),
  {
    horizontalScroll: false,
    pointWidthPx: 200,
  },
);

const HORIZONTAL_SCROLL_SLIDER_HEIGHT = 8;
const HORIZONTAL_SCROLL_SLIDER_BOTTOM = 4;
const HORIZONTAL_SCROLL_SLIDER_GAP = 12;
const X_AXIS_OFFSET = 20;
const X_AXIS_LABEL_MARGIN = 8;
const X_AXIS_LABEL_FONT_SIZE = 14;

const horizontalScrollGridBottom =
  X_AXIS_OFFSET +
  X_AXIS_LABEL_MARGIN +
  X_AXIS_LABEL_FONT_SIZE +
  HORIZONTAL_SCROLL_SLIDER_GAP +
  HORIZONTAL_SCROLL_SLIDER_HEIGHT +
  HORIZONTAL_SCROLL_SLIDER_BOTTOM;

const formatNumber = (number: number): string => {
  return numberIntl.format(number);
};

// Вспомогательная функция для получения красивых интервалов графика
// на вход получает значение неровного интервала
// примеры преобразования: 56 -> 60; 127 -> 200; 1358.345 -> 1500
const roundUpToNiceNumber = (value: number): number => {
  if (value <= 0) return 1;
  if (value <= 1) return 1;

  // порядок значения исходного интервала
  const magnitude = Math.floor(Math.log10(value));

  // нормализованное значение интервала, до 10
  const normalized = value / Math.pow(10, magnitude);

  // округляем до целого или до вида x,5
  const normalisedFloorPart = Math.floor(normalized);
  const normalisedFractionPart = normalized - Math.trunc(normalized);
  const normalisedAligned = normalisedFractionPart > 0.5 ? normalisedFloorPart + 1 : normalisedFloorPart + 0.5;

  // возводим обратно в необходимую степень дял получения исходного порядка
  const result = normalisedAligned * Math.pow(10, magnitude);

  return result;
};

const yAxisMaxInterval = computed((): number => {
  const allChartValues: number[] = [];
  props.data.lines.forEach((l) => allChartValues.push(...l.values));

  if (allChartValues.length === 0) return 10;

  const chartMaxValue: number = Math.max(...allChartValues);
  const valueWithPadding = chartMaxValue * 1.1;
  const numberOfIntervals = 9;
  const idealInterval = valueWithPadding / numberOfIntervals;

  return roundUpToNiceNumber(idealInterval);
});

const yAxisMax = computed((): number => {
  return yAxisMaxInterval.value * 9;
});

const getChartOption = () => {
  const chartRect = chartRef.value?.getBoundingClientRect();
  const visiblePoints = Math.max(1, Math.round((chartRect?.width ?? 1) / props.pointWidthPx));

  return {
    backgroundColor: "transparent",
    grid: {
      top: 0,
      bottom: props.horizontalScroll ? horizontalScrollGridBottom : 0,
      left: 0,
      right: 0,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#191D23",
      borderColor: "transparent",
      axisPointer: {
        type: "line",
        label: {
          backgroundColor: "#191D23",
          color: "#fff",
          fontFamily: "Jost",
          fontWeight: 400,
          fontSize: 14,
          formatter: (params: any) => formatNumber(params.value),
        },
      },
      textStyle: { color: "#B8C0CC", fontFamily: "Jost" },
      formatter: (params: any) => {
        if (Array.isArray(params)) {
          let result = params[0].axisValue + "<br/>";
          params.forEach((item: any) => {
            if (item.value == null) return;
            result += `${item.marker}${item.seriesName}: ${formatNumber(item.value)}<br/>`;
          });
          return result;
        }
        return `${params.seriesName}: ${formatNumber(params.value)}`;
      },
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        offset: 20,
        data: props.data.labels,
        axisLine: { lineStyle: { color: "transparent" } },
        axisLabel: {
          margin: 8,
          color: "#fff",
          textBorderColor: "transparent",
          fontWeight: 400,
          fontSize: 14,
          fontFamily: "Jost",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        max: yAxisMax.value,
        splitNumber: 10,
        interval: yAxisMaxInterval.value,
        splitLine: { lineStyle: { color: "rgba(41, 42, 46, 1)", width: 2 } },
        axisLabel: {
          formatter: (value: number) => formatNumber(value),
          margin: 16,
          color: "#fff",
          textBorderColor: "transparent",
          fontWeight: 400,
          fontSize: 14,
          fontFamily: "Jost",
        },
      },
    ],
    ...(props.horizontalScroll
      ? {
          dataZoom: [
            {
              type: "inside",
              zoomOnMouseWheel: false,
              moveOnMouseWheel: true,
              moveOnMouseMove: false,
              filterMode: "none",
              minValueSpan: visiblePoints,
              maxValueSpan: visiblePoints,
              startValue: Math.max(0, props.data.labels.length - visiblePoints),
              endValue: props.data.labels.length - 1,
            },
            {
              type: "slider",
              show: true,
              brushSelect: false,
              showDataShadow: false,
              filterMode: "none",
              bottom: HORIZONTAL_SCROLL_SLIDER_BOTTOM,
              height: HORIZONTAL_SCROLL_SLIDER_HEIGHT,
              borderColor: "transparent",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              fillerColor: "#7e8288",
              handleSize: 0,
              moveHandleSize: 0,
              showDetail: false,
              startValue: Math.max(0, props.data.labels.length - visiblePoints),
              endValue: props.data.labels.length - 1,
            },
          ],
        }
      : {
          dataZoom: [
            {
              type: "inside",
              zoomOnMouseWheel: false,
              moveOnMouseWheel: true,
              moveOnMouseMove: false,
              filterMode: "none",
              minValueSpan: visiblePoints,
              maxValueSpan: visiblePoints,
              startValue: Math.max(0, props.data.labels.length - visiblePoints),
              endValue: props.data.labels.length - 1,
            },
          ],
        }),
    series: props.data.lines.map((l) => ({
      type: "line",
      name: l.label,
      data: l.values,
      emphasis: { focus: "series" },
      itemStyle: {
        color: `rgba(${l.color.r}, ${l.color.g}, ${l.color.b}, 1.0)`,
        borderWidth: 2,
        borderColor: l.borderColor
          ? `rgba(${l.borderColor.r}, ${l.borderColor.g}, ${l.borderColor.b}, 1.0)`
          : "transparent",
      },
      label: {
        formatter: (params: any) => formatNumber(params.value),
        show: true,
        position: "top",
        color: `rgba(${l.color.r}, ${l.color.g}, ${l.color.b}, 1.0)`,
        textBorderColor: "transparent",
        fontWeight: 400,
        fontSize: 14,
        fontFamily: "Jost",
      },
      lineStyle: {
        type: l.style ? l.style : "solid",
      },
      labelLayout: {
        hideOverlap: true,
        moveOverlap: "shiftY",
        dy: l.type === "PLAN" ? 0 : 30,
      },
      areaStyle: {
        color:
          (l.fill ?? true)
            ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: `rgba(${l.color.r}, ${l.color.g}, ${l.color.b}, 0.3)` },
                { offset: 1, color: `rgba(${l.color.r}, ${l.color.g}, ${l.color.b}, 0.0)` },
              ])
            : "transparent",
      },
    })),
  };
};

const recreateChart = () => {
  if (chart !== null && getChartOption() !== null) {
    chart.dispose();

    setTimeout(() => {
      chart = echarts.init(chartRef.value, "dark", { renderer: "svg" });
      chart.setOption(getChartOption());
    }, 0);
  }
};

watch(
  () => props.data,
  () => {
    chart?.setOption(getChartOption(), { replaceMerge: ["series"] });
  },
);

onMounted(() => {
  chart = echarts.init(chartRef.value, "dark", { renderer: "svg" });
  chart.setOption(getChartOption());
  window.addEventListener("resize", recreateChart);
  resizeObserver = new ResizeObserver(() => recreateChart());
  resizeObserver.observe(chartWrapper.value);
});

onBeforeUnmount(() => {
  if (chart !== null) chart.dispose();
  window.removeEventListener("resize", recreateChart);
  resizeObserver.unobserve(chartWrapper.value);
});
</script>

<template>
  <div :ref="(el) => (chartWrapper = el as HTMLDivElement)" :style="{ width: '100%', height: '100%' }">
    <div :ref="(el) => (chartRef = el as HTMLDivElement)" v-bind="$attrs" />
  </div>
</template>
