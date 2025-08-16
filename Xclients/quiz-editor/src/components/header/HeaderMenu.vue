<template>
  <LinkControl
    :label="t('Header.Menu.Link.Partners.title')"
    :route="{ name: RouteName.PARTNER }"
    :color="LinkColor.GHOST"
  />
  <LinkControl
    :label="t('Header.Menu.Link.Premium.title')"
    :icon="BIconStarFill"
    :route="{ name: RouteName.PREMIUM }"
    :color="LinkColor.GHOST"
  />
</template>

<script setup lang="ts">
import { RouteName } from '@/router';
import { BIconStarFill } from 'bootstrap-icons-vue';
import LinkControl from '@/components/controls/LinkControl.vue';
import { LinkColor } from '@/type/link';
import { useSmartT } from '@/logic/i18n';

const t = useSmartT();
</script>