import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GsToggle from "../GsToggle.vue";

describe("GsToggle", () => {
  it("should render", () => {
    const wrapper = mount(GsToggle, { props: { selected: false } });

    expect(wrapper.get(".slider-container")).exist;
    expect(wrapper.get(".slider-container .slider")).exist;
  });

  it("should react on selected prop change", async () => {
    const wrapper = mount(GsToggle, { props: { selected: false } });
    expect(wrapper.get(".slider-container").classes()).not.contains("selected");

    await wrapper.setProps({ selected: true });

    expect(wrapper.get(".slider-container").classes()).contains("selected");
  });

  it("should emit change event on slider click", () => {
    const wrapper = mount(GsToggle, { props: { selected: false } });

    wrapper.get(".slider-container .slider").trigger("click");

    const changeEvent = wrapper.emitted("change");
    expect(changeEvent).toHaveLength(1);
    expect(changeEvent![0]).toEqual([true]);
  });
});
