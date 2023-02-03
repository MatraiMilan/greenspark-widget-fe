import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import GsWidget from "../GsWidget.vue";
import { getTestWidgets } from "./utils/models";

describe("GsWidget", () => {
  const widget = getTestWidgets()[0];

  it("should be rendered", () => {
    const wrapper = mount(GsWidget, {
      props: { widget },
      global: {
        stubs: {
          GsBadge: {
            template: '<div class="badge" />',
          },
          BadgeEditor: {
            template: '<div class="badge-editor" />',
          },
        },
      },
    });

    expect(wrapper.get(".widget")).exist;
    expect(wrapper.get(".badge")).exist;
    expect(wrapper.get(".badge-editor")).exist;
  });
});
