import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import PublicProfileInfoCard from "../PublicProfileInfoCard.vue";

describe("PublicProfileInfoCard", () => {
  it("should be rendered", () => {
    const wrapper = mount(PublicProfileInfoCard, {});

    expect(wrapper.get(".info-card")).exist;
    expect(wrapper.get(".info-text")).exist;
    expect(wrapper.get(".profile-link")).exist;
  });
});
