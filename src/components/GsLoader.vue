<script setup lang="ts">
import IconSpinner from "./icons/IconSpinner.vue";
</script>

<template>
  <div class="loader">
    <IconSpinner class="spinner" />
    <h3>Loading</h3>
  </div>
</template>

<style scoped>
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  color: var(--color-loader);
  background-color: rgba(var(--gs-gray-base), 0.2);
  transition: all 300ms linear;
}

.spinner {
  width: 80px;
  height: 80px;
  animation: rotate 1.5s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
