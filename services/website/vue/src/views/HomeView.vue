<template>
  <div class="home">
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__title">{{ t('Website.Hero.title') }}</h1>
        <p class="hero__subtitle">{{ t('Website.Hero.subtitle') }}</p>
        <Button
          :color="ButtonColor.PRIMARY_WARM"
          :size="ButtonSize.LARGE"
          @click="handleGetStarted"
        >
          {{ t('Website.Hero.cta') }}
        </Button>
      </div>
    </section>

    <section class="features">
      <div class="features__content">
        <h2 class="features__title">{{ t('Website.Features.title') }}</h2>
        <div class="features__grid">
          <div class="feature-card">
            <h3>{{ t('Website.Features.learning') }}</h3>
            <p>Engage with interactive content and real-time feedback.</p>
          </div>
          <div class="feature-card">
            <h3>{{ t('Website.Features.community') }}</h3>
            <p>Connect with learners from around the world.</p>
          </div>
          <div class="feature-card">
            <h3>{{ t('Website.Features.progress') }}</h3>
            <p>Track your learning journey with detailed analytics.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSmartT } from '@/logic/i18n';
import { Button } from '@libs/vue-ui';
import { ButtonColor, ButtonSize } from '@libs/shared-types';
import { authAppUrl } from '@libs/shared-env';

const t = useSmartT();

function handleGetStarted() {
  // Navigate to auth service using shared environment utility
  window.location.href = authAppUrl;
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero__content {
  max-width: 800px;
  margin: 0 auto;
}

.hero__title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.hero__subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.features {
  padding: 80px 20px;
  background: #f8f9fa;
}

.features__content {
  max-width: 1200px;
  margin: 0 auto;
}

.features__title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #333;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}
</style>
