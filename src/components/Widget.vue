<script setup lang="ts">

import Badge from "@/components/Badge.vue";
import BadgeEditor from "@/components/BadgeEditor.vue";
import type { Widget } from "@/models/widget";

interface WidgetProps {
  widget: Widget
}

const { widget } = defineProps<WidgetProps>();
</script>

<template>
<div class="widget">
  <Badge :widget="widget" />
  <BadgeEditor :widget="widget" />
</div>
</template>

<style scoped>
.widget {
  width: 221px;
}
</style>