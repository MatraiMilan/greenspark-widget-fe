<script setup lang="ts">
import ProductWidgets from './components/ProductWidgets.vue'
import { useStore } from "vuex";
import { ACTION } from "@/store/actions";

const store = useStore();
store.dispatch(ACTION.LOAD_WIDGETS);
</script>

<template>
 <ProductWidgets />
</template>
