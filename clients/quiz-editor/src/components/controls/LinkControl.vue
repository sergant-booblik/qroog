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
        :is="icon"
        class="link-icon"
      />
      <span>{{ label }}</span>
    </a>
  </template>
  <template v-else-if="route">
    <RouterLink
      :to="route"
      :class="[
        'link',
        `link--${color}`
      ]"
    >
      <component
        :is="icon"
        class="link-icon"
      />
      <span>{{ label }}</span>
    </RouterLink>
  </template>
</template>

<script setup lang="ts">
import { type Component } from 'vue';
import { type RouteLocationRaw } from 'vue-router';
import { LinkColor } from '@/type/link.ts';

interface Props {
  label: string,
  icon?: Component,
  href?: string,
  route?: RouteLocationRaw,
  color?: LinkColor,
}

withDefaults(defineProps<Props>(), {
  color: LinkColor.PRIMARY,
});
</script>