<template>
  <div class="header__buttons">
    <ButtonControl
      :title="t('Header.Menu.Button.Login.title')"
      :color="ButtonColor.PRIMARY_WARM"
      flex
    />
    <ButtonControl
      :title="t('Header.Menu.Button.Signup.title')"
      :color="ButtonColor.SECONDARY"
      flex
    />
  </div>
</template>

<script setup lang="ts">
import { ButtonColor } from '@/type/button';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n();
</script>
