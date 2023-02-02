<script setup lang="ts">
import { ref } from "vue";

const linkUrl = ref("https://www.getgreenspark.com/");
</script>
<template>
  <div class="info-card elevated">
    <div class="info-text">
      This widget links directly to your public profile so that you can easily
      share your impact with your customers. Turn it off here if you do not want
      the badge to link to it.
    </div>
    <a class="profile-link" :href="linkUrl" target="_blank"
      >View Public Profile</a
    >
  </div>
</template>

<style scoped>
.info-card {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-background);
  border-radius: 4px;
  padding: 24px 16px;
}

.info-text {
  text-align: center;
  color: var(--color-text);
  font-size: 14px;
}

.profile-link,
.profile-link:visited,
.profile-link:hover,
.profile-link:active {
  text-decoration: none;
  font-weight: 700;
  color: var(--color-text-widget);
}

.profile-link:hover {
  cursor: pointer;
}
</style>
