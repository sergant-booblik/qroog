<template>
  <HeaderComponent />
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/header/HeaderComponent.vue'
// import { useTheme } from '@/composable/useTheme';

// useTheme();
</script>

<style src="css/style.css" />
