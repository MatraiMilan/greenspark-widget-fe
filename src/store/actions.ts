import config from "@/config/config";
import axios from "axios";
import type { ActionContext } from "vuex";
import type { State } from "@/models/state";
import { MUTATION } from "@/store/mutations";
import type {
  WidgetActiveChangePayload,
  WidgetColorChangedPayload,
  WidgetLinkedChangePayload,
} from "@/models/widget";

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
    const response = await axios.get(`${config.backendUrl}/product-widgets`);
    commit(MUTATION.SET_WIDGETS, response.data);
  },
  [ACTION.SET_LINKED]: async (
    { commit }: ActionContext<State, State>,
    { id, linked }: WidgetLinkedChangePayload
  ): Promise<void> => {
    commit(MUTATION.SET_LINKED, { id, linked });
    // TODO: backend request to update value
  },
  [ACTION.SET_COLOR]: async (
    { commit }: ActionContext<State, State>,
    { id, selectedColor }: WidgetColorChangedPayload
  ): Promise<void> => {
    commit(MUTATION.SET_COLOR, { id, selectedColor });
    // TODO: backend request to update value
  },
  [ACTION.SET_ACTIVE]: async (
    { commit }: ActionContext<State, State>,
    { id, active }: WidgetActiveChangePayload
  ): Promise<void> => {
    commit(MUTATION.SET_ACTIVE, { id, active });
    // TODO: backend request to update value
  },
};
