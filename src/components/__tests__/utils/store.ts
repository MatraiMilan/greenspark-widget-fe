import { createStore } from "vuex";
import type { State } from "@/models/state";
import { ACTION } from "@/store/actions";
import { MUTATION } from "@/store/mutations";
import { Mock, vi } from "vitest";

export const defaultState: State = {
  widgets: [],
};

export const getters = {};

export const actions = {
  [ACTION.LOAD_WIDGETS]: vi.fn(),
  [ACTION.SET_LINKED]: vi.fn(),
  [ACTION.SET_COLOR]: vi.fn(),
  [ACTION.SET_ACTIVE]: vi.fn(),
};

export const mutations: Mock<any, any> = {
  [MUTATION.SET_WIDGETS]: vi.fn(),
  [MUTATION.SET_LINKED]: vi.fn(),
  [MUTATION.SET_COLOR]: vi.fn(),
  [MUTATION.SET_ACTIVE]: vi.fn(),
};

export const createMockStore = () =>
  createStore<State>({
    defaultState,
    getters,
    actions,
    mutations,
  });
