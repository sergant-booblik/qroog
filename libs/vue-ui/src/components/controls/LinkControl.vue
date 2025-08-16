<template>
  <template v-if="href">
    <a
      :href="href"
      :class="[
        'link',
        `link--${color}`
      ]"
    >
      <component
        v-if="icon"
        :is="icon"
        class="link-icon"
      />
      <span>{{ label }}</span>
    </a>
  </template>
  <template v-else-if="route && hasRouter">
    <RouterLink
      :to="route"
      :class="[
        'link',
        `link--${color}`
      ]"
    >
      <component
        v-if="icon"
        :is="icon"
        class="link-icon"
      />
      <span>{{ label }}</span>
    </RouterLink>
  </template>
  <template v-else>
    <span
      :class="[
        'link',
        `link--${color}`
      ]"
    >
      <component
        v-if="icon"
        :is="icon"
        class="link-icon"
      />
      <span>{{ label }}</span>
    </span>
  </template>
</template>

<script setup lang="ts">
import { type Component, computed } from 'vue';
import { LinkColor } from '@libs/shared-types';

interface Props {
  label: string,
  icon?: Component,
  href?: string,
  route?: any, // Using any to avoid vue-router dependency
  color?: LinkColor,
}

withDefaults(defineProps<Props>(), {
  color: LinkColor.PRIMARY,
});

// Check if vue-router is available
const hasRouter = computed(() => {
  try {
    return typeof window !== 'undefined' && 'RouterLink' in window;
  } catch {
    return false;
  }
});
</script>