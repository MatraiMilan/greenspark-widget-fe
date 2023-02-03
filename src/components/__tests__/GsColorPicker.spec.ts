import { describe, it, expect, beforeEach } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import ColorPicker from "../ColorPicker.vue";

describe("ColorPicker", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(ColorPicker, { props: { selectedColor: "green" } });
  });

  it("should be rendered", () => {
    expect(wrapper.get(".color-picker")).exist;
  });

  it("should react on selectedColor prop change", async () => {
    expect(wrapper.get(".color-picker > .green").classes()).contains(
      "selected"
    );
    expect(wrapper.get(".color-picker > .blue").classes()).not.contains(
      "selected"
    );

    await wrapper.setProps({ selectedColor: "blue" });

    expect(wrapper.get(".color-picker > .green").classes()).not.contains(
      "selected"
    );
    expect(wrapper.get(".color-picker > .blue").classes()).contains("selected");
  });

  it("should emit change event on new color select", () => {
    wrapper.get(".color-picker > .blue").trigger("click");

    const changeEvent = wrapper.emitted("change");
    expect(changeEvent).toHaveLength(1);
    expect(changeEvent![0]).toEqual(["blue"]);
  });

  it("should not emit change event on same color select", () => {
    wrapper.get(".color-picker > .green").trigger("click");

    const changeEvent = wrapper.emitted("change");
    expect(changeEvent).undefined;
  });
});
