import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GsCheckbox from "../GsCheckbox.vue";

describe("GsCheckbox", () => {
  it("should render", () => {
    const wrapper = mount(GsCheckbox, { props: { checked: false } });

    expect(wrapper.get(".checkbox")).exist;
  });

  it("should react on checked prop change", async () => {
    const wrapper = mount(GsCheckbox, { props: { checked: false } });
    expect(wrapper.find(".checkbox > .checkmark").exists()).toBe(false);

    await wrapper.setProps({ checked: true });

    expect(wrapper.find(".checkbox > .checkmark").exists()).toBe(true);
  });

  it("should emit change event on click", () => {
    const wrapper = mount(GsCheckbox, { props: { checked: false } });

    wrapper.get(".checkbox").trigger("click");

    const changeEvent = wrapper.emitted("change");
    expect(changeEvent).toHaveLength(1);
    expect(changeEvent![0]).toEqual([true]);
  });
});
