import type { ActionContext } from "vuex";
import type { State } from "@/models/state";
import { MUTATION } from "@/store/mutations";
import type { WidgetActiveChangePayload, WidgetColorChangedPayload, WidgetLinkedChangePayload, } from "@/models/widget";
import widgetService from "@/service/widget-service";
import { WidgetUpdateError } from "@/errors/widget-update-error";
import { WidgetFetchError } from "@/errors/widget-fetch-error";

export const ACTION = {
  LOAD_WIDGETS: "loadWidgets",
  SET_LINKED: "setLinked",
  SET_COLOR: "setColor",
  SET_ACTIVE: "setActive",
};

export const actions = {
  [ACTION.LOAD_WIDGETS]: async ({
    commit,
  }: ActionContext<State, State>): Promise<void> => {
    try {
      const widgets = await widgetService.fetchAllWidget();
      commit(MUTATION.SET_WIDGETS, widgets);
    } catch (error) {
      logError(error);
    }
  },
  [ACTION.SET_LINKED]: async (
    { commit, state }: ActionContext<State, State>,
    { id, linked }: WidgetLinkedChangePayload
  ): Promise<void> => {
    const originalValue = getOriginalValue(state, id, 'linked');
    commit(MUTATION.SET_LINKED, { id, linked });

    try {
      await widgetService.updateWidgetLinked(id, linked);
    } catch(error) {
      logError(error);
      commit(MUTATION.SET_LINKED, { id, linked: originalValue });
    }
  },
  [ACTION.SET_COLOR]: async (
    { commit, state }: ActionContext<State, State>,
    { id, selectedColor }: WidgetColorChangedPayload
  ): Promise<void> => {
    const originalValue = getOriginalValue(state, id, 'selectedColor');
    commit(MUTATION.SET_COLOR, { id, selectedColor });

    try {
      await widgetService.updateWidgetColor(id, selectedColor);
    } catch(error) {
      logError(error);
      commit(MUTATION.SET_COLOR, { id, selectedColor: originalValue });
    }
  },
  [ACTION.SET_ACTIVE]: async (
    { commit, state }: ActionContext<State, State>,
    { id, active }: WidgetActiveChangePayload
  ): Promise<void> => {
    const originalValue = getOriginalValue(state, id, 'active');
    commit(MUTATION.SET_ACTIVE, { id, active });

    try {
      await widgetService.updateWidgetActive(id, active);
    } catch(error) {
      logError(error);
      commit(MUTATION.SET_ACTIVE, { id, active: originalValue });
    }
  },
};

const getOriginalValue = (state: State, id: number, propName: string): any => {
  const widget = state.widgets.find(widget => widget.id === id);
  return widget![propName as keyof typeof widget];
}

const logError = (error: any): void => {
  if (error instanceof WidgetUpdateError || error instanceof WidgetFetchError) {
    console.error(error.message);
  } else {
    const message = (error as Error).message;
    console.error(`Something went wrong. ${message || ''}`);
  }
}
