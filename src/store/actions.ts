import config from "@/config/config";
import axios from 'axios';
import type { ActionContext } from "vuex";
import type { State } from "@/models/state";
import { MUTATION } from "@/store/mutations";

export const ACTION = {
    LOAD_WIDGETS: 'loadWidgets',
};

export const actions = {
    loadWidgets: async ({ commit }: ActionContext<State, State>): Promise<void> => {
        const response = await axios.get(`${config.backendUrl}/product-widgets`);
        commit(MUTATION.SET_WIDGETS, response.data);
    },
};
