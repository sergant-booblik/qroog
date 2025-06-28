<template>
  <div class="header__buttons">
    <ButtonControl
      :label="t('Header.Menu.Button.Login.title')"
      :color="ButtonColor.PRIMARY_WARM"
      flex
      @click="navigateToSignIn()"
    />
    <ButtonControl
      :label="t('Header.Menu.Button.Signup.title')"
      :color="ButtonColor.SECONDARY"
      flex
      @click="navigateToSignUp()"
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
  router.push({ name: RouteName.AUTH, query: { page: 'sign-in' } });
}

function navigateToSignUp(): void {
  router.push({ name: RouteName.AUTH, query: { page: 'sign-up' } });
}

const t = useSmartT();

const router = useRouter();
</script>
