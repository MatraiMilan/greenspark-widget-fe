<script setup lang="ts">
import ProductWidgets from "./components/ProductWidgets.vue";
import { useStore } from "vuex";
import { ACTION } from "@/store/actions";
import type { State } from "@/models/state";
import GsLoader from "@/components/GsLoader.vue";
import { onMounted } from "vue";

const store = useStore<State>();

onMounted(() => {
  store.dispatch(ACTION.LOAD_WIDGETS);
});
</script>

<template>
  <Transition>
    <ProductWidgets v-if="store.state.widgets.length" />
    <GsLoader v-else />
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
