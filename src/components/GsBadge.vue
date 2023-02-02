<script setup lang="ts">
import type { Widget } from "@/models/widget";
import { ImpactTypes } from "@/models/widget";
import GreenSparkIcon from "@/components/icons/IconGreenSpark.vue";

export interface BadgeProps {
  widget: Widget;
}

const props = defineProps<BadgeProps>();

const getFormattedImpact = (widget: Widget) => {
  if (widget.type === ImpactTypes.CARBON) {
    return `${widget.amount}kgs of ${widget.type}`;
  }

  return `${widget.amount} ${widget.type}`;
};
</script>

<template>
  <div class="badge" :badge-color="props.widget.selectedColor">
    <div class="gs-avatar">
      <GreenSparkIcon class="gs-icon" />
      <p class="gs-text">greenspark</p>
    </div>
    <div class="info">
      <p class="action">This product {{ props.widget.action }}</p>
      <p class="impact-type">{{ getFormattedImpact(props.widget) }}</p>
    </div>
  </div>
</template>

<style scoped>
.badge {
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-flow: wrap;
  border-radius: 6px;
  gap: 12px;
  padding: 10px 12px;
}

.badge[badge-color="blue"] {
  background-color: var(--color-widget-bg-blue);
  color: var(--color-widget-blue);
}

.badge[badge-color="green"] {
  background-color: var(--color-widget-bg-green);
  color: var(--color-widget-green);
}

.badge[badge-color="beige"] {
  background-color: var(--color-widget-bg-beige);
  color: var(--color-widget-beige);
}

.badge[badge-color="white"] {
  background-color: var(--color-widget-bg-white);
  color: var(--color-widget-white);
}

.badge[badge-color="black"] {
  background-color: var(--color-widget-bg-black);
  color: var(--color-widget-black);
}

.gs-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 3px;
}

.gs-icon {
  width: 33px;
  height: 33px;
}

.gs-text {
  font-size: 8px;
  font-weight: 700;
  line-height: 8px;
}

.info {
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-flow: column;
}

.action {
  font-size: 12px;
}

.impact-type {
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  font-style: normal;
}
</style>
