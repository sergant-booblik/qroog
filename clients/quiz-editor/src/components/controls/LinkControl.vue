<template>
  <template v-if="href">
    <a
      :href="href"
      class="link"
    >
      <component
        :is="icon"
        class="link-icon"
      />
      <span>{{ title }}</span>
    </a>
  </template>
  <template v-else-if="route">
    <RouterLink
      :to="{ name: route }"
      class="link"
    >
      <component
        :is="icon"
        class="link-icon"
      />
      <span>{{ title }}</span>
    </RouterLink>
  </template>
</template>

<script setup lang="ts">
import type { RouteName } from '@/router'
import type { Component } from 'vue'

interface Props {
  title: string,
  icon?: Component,
  href?: string,
  route?: RouteName,
}

defineProps<Props>();
</script>