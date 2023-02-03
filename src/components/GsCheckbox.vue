<script setup lang="ts">
import IconCheckMark from "@/components/icons/IconCheckMark.vue";

export interface CheckboxProps {
  checked?: Boolean;
}

export interface CheckboxEmits {
  (event: "change", checked: boolean): void;
}

const props = defineProps<CheckboxProps>();
const emit = defineEmits<CheckboxEmits>();

const onClick = () => emit("change", !props.checked);
</script>

<template>
  <div class="checkbox" :class="{ checked: props.checked }" @click="onClick">
    <IconCheckMark v-if="props.checked" class="checkmark" />
  </div>
</template>

<style scoped>
.checkbox {
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  color: var(--color-checkbox-bg);
  background-color: var(--color-checkbox);
}

.checkbox:hover {
  cursor: pointer;
}

.checkbox:after {
  content: "";
  position: absolute;
  width: 34px;
  height: 34px;
  top: 50%;
  left: 50%;
  margin-top: -17px;
  margin-left: -17px;
  border-radius: 50%;
  background-color: rgba(var(--gs-green-1-base), 0);
  transition: all 150ms ease-out;
}

.checkbox:hover:after {
  background-color: rgba(var(--gs-green-1-base), 0.2);
}

.checkmark {
  width: 100%;
  height: 100%;
}

.checkbox:not(.checked) {
  border: 2px solid var(--color-border-black);
}

.checkbox:not(.checked):hover {
  border-color: var(--color-border-green-2);
}
</style>
