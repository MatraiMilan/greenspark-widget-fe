import type { State } from "@/models/state";
import type {
  Widget,
  WidgetActiveChangePayload,
  WidgetColorChangedPayload,
  WidgetLinkedChangePayload,
} from "@/models/widget";

export const MUTATION = {
  SET_WIDGETS: "setWidgets",
  SET_LINKED: "setLinked",
  SET_COLOR: "setColor",
  SET_ACTIVE: "setActive",
};

export const mutations = {
  [MUTATION.SET_WIDGETS]: (state: State, widgets: Widget[]) =>
    (state.widgets = widgets),
  [MUTATION.SET_LINKED]: (
    state: State,
    { id, linked }: WidgetLinkedChangePayload
  ) => {
    const index = findWidgetIndexById(state, id);
    state.widgets[index] = { ...state.widgets[index], linked };
  },
  [MUTATION.SET_COLOR]: (
    state: State,
    { id, selectedColor }: WidgetColorChangedPayload
  ) => {
    const index = findWidgetIndexById(state, id);
    state.widgets[index] = { ...state.widgets[index], selectedColor };
  },
  [MUTATION.SET_ACTIVE]: (
    state: State,
    { id, active }: WidgetActiveChangePayload
  ) => {
    const index = findWidgetIndexById(state, id);
    state.widgets[index] = { ...state.widgets[index], active };
  },
};

const findWidgetIndexById = (state: State, id: number): number => {
  return state.widgets.findIndex((widget) => widget.id === id);
};
