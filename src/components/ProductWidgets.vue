<script setup lang="ts">
import Widget from "@/components/Widget.vue";
import { useStore } from "vuex";
import type { State } from "@/models/state";

const store = useStore<State>();
</script>

<template>
    <div class="container">
      <h3 class="title">
        Per product widgets
      </h3>
      <div class="widget-list">
        <Widget v-for="widget in store.state.widgets" :key="widget.id" :widget="widget" />
      </div>
    </div>
</template>


<style scoped>
.container {
  max-width: 851px;
  height: 419px;
  padding: 36px;
  background-color: var(--color-card-background);
  border-radius: 8px;
  box-shadow: 0px 42px 76px rgba(0, 0, 0, 0.05),
              0px 27.2222px 44.5093px rgba(0, 0, 0, 0.037963),
              0px 16.1778px 24.2074px rgba(0, 0, 0, 0.0303704),
              0px 8.4px 12.35px rgba(0, 0, 0, 0.025),
              0px 3.42222px 6.19259px rgba(0, 0, 0, 0.0196296),
              0px 0.777778px 2.99074px rgba(0, 0, 0, 0.012037);
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
    width: 331px;
  }
}
</style>