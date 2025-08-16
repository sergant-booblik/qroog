<template>
  <RouterLink
    role="button"
    :to="{ name: mainRouteName }"
  >
    <LogoSVG />
  </RouterLink>
</template>

<script setup lang="ts">
import LogoSVG from '../assets/logo.svg';

interface Props {
  mainRouteName: string,
}

defineProps<Props>();
</script>