import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GsLoader from "../GsLoader.vue";

describe("GsLoader", () => {
  it("should be rendered", () => {
    const wrapper = mount(GsLoader);

    expect(wrapper.get(".loader")).exist;
    expect(wrapper.get(".loader .spinner")).exist;
    expect(wrapper.get(".loader h3").text()).toEqual("Loading");
  });
});
