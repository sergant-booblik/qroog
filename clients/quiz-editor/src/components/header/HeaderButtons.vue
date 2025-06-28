<template>
  <div class="header__buttons">
    <ButtonControl
      flex
      :label="t('Header.Menu.Button.Login.title')"
      :color="ButtonColor.PRIMARY_WARM"
      @click="navigateToSignIn()"
    />
  </div>
</template>

<script setup lang="ts">
import { ButtonColor } from '@/type/button';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { useRouter } from 'vue-router';
import { RouteName } from '@/router';
import { useSmartT } from '@/logic/i18n.ts';

function navigateToSignIn(): void {
  router.push({ name: RouteName.AUTH });
}

const t = useSmartT();

const router = useRouter();
</script>
