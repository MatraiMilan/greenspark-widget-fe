import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import type { SpyInstance } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import BadgeEditor from "../BadgeEditor.vue";
import type { Store } from "vuex";
import type { State } from "../../models/state";
import { createMockStore } from "./utils/store";
import { getTestWidgets } from "./utils/models";
import { ACTION } from "../../store/actions";

describe("BadgeEditor", () => {
  let store: Store<State>;
  let wrapper: VueWrapper;
  let dispatchSpy: SpyInstance;

  beforeEach(() => {
    store = createMockStore();
    wrapper = mount(BadgeEditor, {
      global: {
        provide: {
          store: store,
        },
      },
      props: {
        widget: getTestWidgets()[0],
      },
    });

    dispatchSpy = vi.spyOn(store, "dispatch");
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should be rendered", () => {
    expect(wrapper.get(".badge-editor")).exist;
    expect(wrapper.get(".badge-editor .editor-item .checkbox")).exist;
    expect(wrapper.get(".badge-editor .editor-item .color-picker")).exist;
    expect(wrapper.get(".badge-editor .editor-item .slider-container")).exist;
  });

  it("should dispatch setLinked event when public profile linked value is changed", () => {
    wrapper.get(".badge-editor .editor-item .checkbox").trigger("click");

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toBeCalledWith(ACTION.SET_LINKED, {
      id: 1,
      linked: true,
    });
  });

  it("should dispatch setColor event when selected color value is changed", () => {
    wrapper
      .get(".badge-editor .editor-item .color-picker .green")
      .trigger("click");

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toBeCalledWith(ACTION.SET_COLOR, {
      id: 1,
      selectedColor: "green",
    });
  });

  it("should dispatch setActive event when active value is changed", () => {
    wrapper
      .get(".badge-editor .editor-item .slider-container .slider")
      .trigger("click");

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toBeCalledWith(ACTION.SET_ACTIVE, {
      id: 1,
      active: false,
    });
  });
});
