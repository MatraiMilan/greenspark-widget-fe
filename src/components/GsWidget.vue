<script setup lang="ts">
import GsBadge from "@/components/GsBadge.vue";
import BadgeEditor from "@/components/BadgeEditor.vue";
import type { Widget } from "@/models/widget";

export interface GsWidgetProps {
  widget: Widget;
}

const props = defineProps<GsWidgetProps>();
</script>

<template>
  <div class="widget">
    <GsBadge :widget="props.widget" />
    <BadgeEditor :widget="props.widget" />
  </div>
</template>

<style scoped>
.widget {
  min-width: 221px;
}
</style>
