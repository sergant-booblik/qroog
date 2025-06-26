<template>
  <LinkControl
    :title="t('Header.Menu.Link.Partners.title')"
    :route="RouteName.PARTNER"
  />
  <LinkControl
    :title="t('Header.Menu.Link.Premium.title')"
    :icon="BIconStarFill"
    :route="RouteName.PREMIUM"
  />
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
import { BIconStarFill } from 'bootstrap-icons-vue';
import LinkControl from '@/components/controls/LinkControl.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>

</style>