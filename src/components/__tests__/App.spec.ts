import { describe, expect, it, afterEach, vi } from "vitest";
import type { SpyInstance } from "vitest";
import type { VueWrapper } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import type { Store } from "vuex";
import type { State } from "../../models/state";
import App from "../../App.vue";
import { createMockStore } from "./utils/store";
import { getTestWidgets } from "./utils/models";
import { ACTION } from "../../store/actions";

describe("App", () => {
  let store: Store<State>;
  let wrapper: VueWrapper;
  let dispatchSpy: SpyInstance;

  const init = (widgetsLoaded: boolean) => {
    store = createMockStore();
    store.state.widgets = widgetsLoaded ? getTestWidgets() : [];
    dispatchSpy = vi.spyOn(store, "dispatch");
    wrapper = mount(App, {
      global: {
        provide: {
          store: store,
        },
        stubs: {
          ProductWidgets: {
            template: '<div class="product-widgets" />',
          },
          GsLoader: {
            template: '<div class="gs-loader" />',
          },
        },
      },
    });
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should dispatch loadWidgets event", () => {
    init(false);

    expect(dispatchSpy).toBeCalledWith(ACTION.LOAD_WIDGETS);
  });

  it("should render loader when widgets are not loaded", () => {
    init(false);
    expect(wrapper.get(".gs-loader")).exist;
  });

  it("should render loader when widgets are not loaded", () => {
    init(true);
    expect(wrapper.get(".product-widgets")).exist;
  });
});
