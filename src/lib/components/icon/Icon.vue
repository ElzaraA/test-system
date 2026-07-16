<script setup>
const {
  name = "",
  colorName = "",
  size = "md",
} = defineProps(["name", "colorName", "hoverColorName", "size", "style"]);

const labels = {
  "log-out": "⎋",
  "chevron-left": "‹",
  "chevron-right": "›",
  info: "i",
  people: "👥",
  "technic-2": "⛟",
  "arrow-up": "↑",
  "arrow-up-right": "↗",
  plus: "+",
  "edit-2": "✎",
  trash: "🗑",
  x: "×",
  analytics: "▤",
  expertise: "◎",
  land: "▭",
  construction: "▧",
  technic: "⚙",
  house: "⌂",
  "gas-pipe": "⌇",
  "construction-time": "⏱",
  pos: "⇄",
  "land-allocation": "⬒",
  train: "🚄",
  money: "₽",
  project: "📐",
  president: "★",
  tv: "▣",
  risks: "⚠",
};

const sizeClass = size === "lg" ? "svg-icon_lg" : "";
</script>

<template>
  <span
    class="svg-icon lib-icon"
    :class="[`lib-icon_${name}`, colorName ? `lib-icon_color-${colorName}` : '', sizeClass]"
    :style="style"
    aria-hidden="true"
  >
    {{ labels[name] ?? "•" }}
  </span>
</template>

<style scoped>
.svg-icon,
.lib-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  font-size: 0.875rem;
  line-height: 1;
  color: #b8c0cc;
  flex-shrink: 0;
}

.svg-icon_lg {
  width: 42px;
  height: 42px;
  font-size: 1.75rem;
}

.lib-icon_chevron-left,
.lib-icon_chevron-right {
  font-size: 1.5rem;
  font-weight: 700;
}

.lib-icon_color-dark-color-text-primary {
  color: #e3e3e3;
}

.lib-icon_color-dark-color-text-secondary {
  color: #b8c0cc;
}

.lib-icon_color-color-text-secondary-darkmode {
  color: #b8c0cc;
}
</style>
