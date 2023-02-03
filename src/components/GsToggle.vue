<script setup lang="ts">
export interface GsToggleProps {
  selected?: boolean;
}

export interface GsToggleEmits {
  (event: "change", selected: boolean): void;
}

const props = defineProps<GsToggleProps>();
const emit = defineEmits<GsToggleEmits>();

const onToggle = () => emit("change", !props.selected);
</script>

<template>
  <div class="slider-container" :class="{ selected: props.selected }">
    <div class="slider" @click="onToggle"></div>
  </div>
</template>

<style scoped>
.slider-container {
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 30px;
  border: 1px solid var(--color-border-green);
  box-shadow: inset 0 1px 7px rgba(0, 0, 0, 0.15);
  background-color: var(--color-card-background);
  transition: background-color 100ms linear;
}

.slider-container.selected {
  background-color: var(--color-widget-bg-green);
}

.slider {
  position: absolute;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.35);
  width: 20px;
  height: 20px;
  top: 50%;
  left: -3px;
  margin-top: -10px;
  background-color: var(--color-card-background);
  border: 1px solid var(--color-border-beige);
  border-radius: 50px;
  transition: left 100ms linear;
}

.slider:hover {
  cursor: pointer;
}

.slider-container.selected .slider {
  left: 23px;
}

.slider:after {
  content: "";
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  margin-top: -15px;
  margin-left: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 5px solid rgba(var(--gs-green-2-base), 0);
  transition: border 150ms ease-out;
}

.slider:hover:after {
  border: 5px solid rgba(var(--gs-green-2-base), 0.4);
}
</style>
