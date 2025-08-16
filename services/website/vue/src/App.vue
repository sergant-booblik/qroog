<script setup lang="ts">
import { RouterView } from 'vue-router'
import WebsiteHeader from '@/components/WebsiteHeader.vue'
</script>

<template>
  <div id="app">
    <WebsiteHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
