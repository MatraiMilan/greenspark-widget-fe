<script setup lang="ts">
import type { WidgetColorType } from "@/models/widget";
import { WidgetColors } from "@/models/widget";
import { ref } from "vue";

export interface ColorPickerProps {
  selectedColor: WidgetColorType;
}

export interface ColorPickerEmits {
  (event: "change", selectedColor: WidgetColorType): void;
}

const props = defineProps<ColorPickerProps>();
const emit = defineEmits<ColorPickerEmits>();

const colors = ref([...WidgetColors]);

const selectColor = (color: WidgetColorType) => emit("change", color);
</script>

<template>
  <div class="color-picker">
    <div
      v-for="color in colors"
      :key="color"
      :class="[color, props.selectedColor === color && 'selected', 'color']"
      @click="() => selectColor(color)"
    ></div>
  </div>
</template>

<style scoped>
.color-picker {
  display: flex;
  flex-flow: row;
  gap: 4px;
}

.color {
  box-sizing: border-box;
  height: 16px;
  width: 16px;
}

.color:hover {
  cursor: pointer;
}

.color.blue {
  background-color: var(--color-widget-bg-blue);
}

.color.blue:hover {
  background-color: rgba(var(--gs-blue-base), 0.8);
}

.color.green {
  background-color: var(--color-widget-bg-green);
}

.color.green:hover {
  background-color: rgba(var(--gs-green-1-base), 0.8);
}

.color.beige {
  background-color: var(--color-widget-bg-beige);
}

.color.beige:hover {
  background-color: rgba(var(--gs-beige-base), 0.8);
}

.color.white {
  background-color: var(--color-widget-bg-white);
}

.color.white:hover {
  background-color: rgba(var(--gs-white-1-base), 0.8);
}

.color.black {
  background-color: var(--color-widget-bg-black);
}

.color.black:hover {
  background-color: rgba(var(--gs-black-base), 0.8);
}

.color.selected {
  border: 1px solid var(--color-border-grey);
}
</style>
