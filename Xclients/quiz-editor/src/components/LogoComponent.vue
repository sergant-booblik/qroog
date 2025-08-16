<template>
  <RouterLink
    role="button"
    :to="{ name: mainRouteName }"
  >
    <LogoSVG />
  </RouterLink>
</template>

<script setup lang="ts">
import LogoSVG from '@/assets/logo.svg';
import { RouteName } from '@/router';
import { useAuthStore } from '@/store/auth';
import { computed } from 'vue';

const authStore = useAuthStore();

const mainRouteName = computed(() => authStore.isAuth ? RouteName.DASHBOARD : RouteName.HOME);
</script>