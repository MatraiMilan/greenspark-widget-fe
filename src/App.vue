<script setup lang="ts">
import ProductWidgets from "./components/ProductWidgets.vue";
import { useStore } from "vuex";
import { ACTION } from "@/store/actions";
import type { State } from "@/models/state";

const store = useStore<State>();
store.dispatch(ACTION.LOAD_WIDGETS);
</script>

<template>
  <ProductWidgets />
</template>
