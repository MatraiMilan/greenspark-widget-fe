import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { getTestWidgets } from "../../components/__tests__/utils/models";
import { ACTION, actions } from "../actions";
import type { Store } from "vuex";
import { createStore } from "vuex";
import type { State } from "../../models/state";
import { state } from "../state";
import { getters } from "../getters";
import { mutations } from "../mutations";
import config from "../../config/config";

describe("Store", () => {
  const testWidgetId = 1;
  let store: Store<State>;

  beforeEach(() => {
    store = createStore({
      state,
      getters,
      actions,
      mutations,
    });
    vi.spyOn(axios, "get").mockResolvedValue({ data: getTestWidgets() });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should load widgets when loadWidgets event dispatched", async () => {
    await store.dispatch(ACTION.LOAD_WIDGETS);

    expect(axios.get).toHaveBeenCalledWith(
      `${config.backendUrl}/product-widgets`
    );
    expect(store.state.widgets).toEqual(getTestWidgets());
  });

  it("should set linked value properly of given widget when setLinked event dispatched", async () => {
    await store.dispatch(ACTION.LOAD_WIDGETS);
    expect(store.state.widgets[0].id).equal(testWidgetId);
    expect(store.state.widgets[0].linked).false;

    await store.dispatch(ACTION.SET_LINKED, { id: testWidgetId, linked: true });

    expect(store.state.widgets[0].linked).true;
  });

  it("should set selectedColor value properly of given widget when setColor event dispatched", async () => {
    await store.dispatch(ACTION.LOAD_WIDGETS);
    expect(store.state.widgets[0].id).equal(testWidgetId);
    expect(store.state.widgets[0].selectedColor).toEqual("blue");

    await store.dispatch(ACTION.SET_COLOR, {
      id: testWidgetId,
      selectedColor: "black",
    });

    expect(store.state.widgets[0].selectedColor).toEqual("black");
  });

  it("should set active value properly of given widget when setActive event dispatched", async () => {
    await store.dispatch(ACTION.LOAD_WIDGETS);
    expect(store.state.widgets[0].id).equal(testWidgetId);
    expect(store.state.widgets[0].active).toEqual(true);

    await store.dispatch(ACTION.SET_ACTIVE, {
      id: testWidgetId,
      active: false,
    });

    expect(store.state.widgets[0].active).toEqual(false);
  });
});
