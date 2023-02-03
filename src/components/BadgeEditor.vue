<script setup lang="ts">
import type { Widget, WidgetColorType } from "@/models/widget";
import IconInfoOutline from "@/components/icons/IconInfoOutline.vue";
import PublicProfileInfoCard from "@/components/PublicProfileInfoCard.vue";
import GsCheckbox from "@/components/GsCheckbox.vue";
import ColorPicker from "@/components/ColorPicker.vue";
import GsToggle from "@/components/GsToggle.vue";
import { useStore } from "vuex";
import type { State } from "@/models/state";
import { ACTION } from "@/store/actions";

export interface BadgeEditorProps {
  widget: Widget;
}

const store = useStore<State>();
const props = defineProps<BadgeEditorProps>();

const onLinkedChange = (linked: boolean) =>
  store.dispatch(ACTION.SET_LINKED, { id: props.widget.id, linked });

const onColorChange = (selectedColor: WidgetColorType) =>
  store.dispatch(ACTION.SET_COLOR, { id: props.widget.id, selectedColor });

const onActiveChange = (active: boolean) =>
  store.dispatch(ACTION.SET_ACTIVE, { id: props.widget.id, active });
</script>

<template>
  <div class="badge-editor">
    <div class="editor-item">
      <p>
        Link to Public Profile
        <span class="info">
          <IconInfoOutline class="info-icon" />
          <PublicProfileInfoCard class="info-tooltip" />
        </span>
      </p>
      <GsCheckbox
        :checked="props.widget.linked"
        @change="onLinkedChange"
        class="checkbox-linked"
      />
    </div>
    <div class="editor-item">
      <div class="editor-item">
        <p>Badge colour</p>
        <ColorPicker
          :selectedColor="props.widget.selectedColor"
          @change="onColorChange"
        />
      </div>
    </div>
    <div class="editor-item">
      <p>Activate badge</p>
      <GsToggle :selected="props.widget.active" @change="onActiveChange" />
    </div>
  </div>
</template>

<style scoped>
.badge-editor {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-flow: column;
}

.editor-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row;
  font-size: 14px;
  line-height: 17px;
  color: var(--color-text-widget);
}

.info-icon {
  margin-bottom: 4px;
  height: 10px;
  width: 10px;
}

.info-tooltip {
  position: absolute;
  top: 30px;
  width: 248px;
  height: 162px;
  left: 50%;
  margin-left: -124px;
  opacity: 0;
  visibility: hidden;
  z-index: 1000;
  transform: translateY(-20px);
  transition: opacity 300ms ease-out, visibility 300ms linear,
    top 300ms cubic-bezier(0.67, -0.5, 1, 1);
}

.info:hover .info-tooltip {
  opacity: 1;
  visibility: visible;
  top: 40px;
  transition: opacity 300ms ease-in, top 300ms cubic-bezier(0.67, 1.92, 0.83, 1);
}

.checkbox-linked {
  margin-right: 2px;
}
</style>
