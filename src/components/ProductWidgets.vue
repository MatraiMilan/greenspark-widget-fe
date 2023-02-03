<script setup lang="ts">
import GsWidget from "@/components/GsWidget.vue";
import { useStore } from "vuex";
import type { State } from "@/models/state";

const store = useStore<State>();
</script>

<template>
  <div class="container elevated">
    <h3 class="title">Per product widgets</h3>
    <div class="widget-list">
      <GsWidget
        v-for="widget in store.state.widgets"
        :key="widget.id"
        :widget="widget"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  min-width: 851px;
  min-height: 419px;
  padding: 36px;
  background-color: var(--color-card-background);
  border-radius: 8px;
}

.title {
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 36px;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border-grey);
  height: 48px;
  margin-bottom: 20px;
}

.widget-list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row;
  flex-wrap: wrap;
  gap: 58px;
}

@media (max-width: 870px) {
  .container {
    min-width: unset;
    width: 331px;
  }
}
</style>
