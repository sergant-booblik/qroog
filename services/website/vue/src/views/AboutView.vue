<template>
  <div class="about">
    <div class="about__content">
      <h1>{{ t('Website.About.title') }}</h1>
      <p>{{ t('Website.About.description') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSmartT } from '@/logic/i18n';

const t = useSmartT();
</script>

<style scoped>
.about {
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.about__content h1 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.about__content p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #666;
}
</style>
