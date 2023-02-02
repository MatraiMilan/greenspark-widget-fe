import type { State } from "@/models/state";
import type { Widget } from "@/models/widget";

export const MUTATION = {
    SET_WIDGETS: 'setWidgets',
};

export const mutations = {
    [MUTATION.SET_WIDGETS]: (state: State, widgets: Widget[]) => state.widgets = widgets,
};