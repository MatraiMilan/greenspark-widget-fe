import { beforeEach, describe, expect, it } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";

import ProductWidgets from "../ProductWidgets.vue";
import { createMockStore } from "./utils/store";
import type { Store } from "vuex";
import type { State } from "../../models/state";
import { getTestWidgets } from "./utils/models";

describe("ProductWidgets", () => {
  let store: Store<State>;
  let wrapper: VueWrapper;

  beforeEach(() => {
    store = createMockStore();
    store.state.widgets = getTestWidgets();
    wrapper = mount(ProductWidgets, {
      global: {
        provide: {
          store: store,
        },
        stubs: {
          GsBadge: {
            template: "<div>GsBadge</div>",
          },
          BadgeEditor: {
            template: "<div>BadgeEditor</div>",
          },
        },
      },
    });
  });

  it("should be rendered properly", () => {
    expect(wrapper.get(".title").text()).toEqual("Per product widgets");
    expect(wrapper.get(".widget-list")).exist;
    expect(wrapper.findAll(".widget-list .widget").length).toEqual(3);
  });
});
