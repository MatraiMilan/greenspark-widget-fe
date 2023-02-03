import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GsBadge from "../GsBadge.vue";
import type { Widget } from "../../models/widget";
import { ImpactTypes } from "../../models/widget";

const testWidget: Widget = {
  id: 1,
  type: "plastic bottles",
  amount: 100,
  action: "collects",
  active: true,
  linked: false,
  selectedColor: "blue",
};

const testWidgetCarbon = { ...testWidget, type: ImpactTypes.CARBON };

describe("GsBadge", () => {
  it("should render properly", () => {
    const wrapper = mount(GsBadge, { props: { widget: testWidget } });

    expect(wrapper.get(".badge")).exist;
    expect(wrapper.get(".badge").classes()).contains(testWidget.selectedColor);
    expect(wrapper.get(".info .action").text()).contains(
      `This product ${testWidget.action}`
    );
    expect(wrapper.get(".info .impact-type").text()).contains(
      `${testWidget.amount} ${testWidget.type}`
    );
  });

  it("should render different impact type text when impact type is carbon", () => {
    const wrapper = mount(GsBadge, { props: { widget: testWidgetCarbon } });

    expect(wrapper.get(".info .impact-type").text()).contains(
      `${testWidgetCarbon.amount}kgs of ${testWidgetCarbon.type}`
    );
  });
});
