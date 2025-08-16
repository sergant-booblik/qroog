<template>
  <header class="header">
    <div class="header__wrapper">
      <LogoComponent
        class="header__logo"
      />
      <div class="header__right">
        <div class="header__controls">
          <div class="header__menu">
            <HeaderMenu />
          </div>
          <HeaderLangSwitcher
            v-if="!isAuth"
          />
          <div class="header__delimiter" />
          <HeaderButtons
            v-if="!isAuth"
          />
        </div>
        <HeaderProfileDropdown
          v-if="isAuth"
          class="dropdown--profile"
        />
      </div>
      <div
        v-if="!isAuth"
        class="header__mobile-menu"
      >
        <ButtonControl
          :icon="BIconList"
          :size="ButtonSize.LARGE"
          @click="toggleDropdown()"
        />
        <div
          :class="[
            'header__dropdown',
            { 'header__dropdown--opened': isDropdownOpen },
          ]"
        >
          <HeaderButtons />
          <HeaderLangSwitcher />
          <div class="header-dropdown__delimiter" />
          <HeaderMenu />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoComponent from '@/components/LogoComponent.vue';
import { BIconList } from 'bootstrap-icons-vue';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { ButtonSize } from '@/type/button';
import { ref } from 'vue';
import HeaderButtons from '@/components/header/HeaderButtons.vue';
import HeaderLangSwitcher from '@/components/header/HeaderLangSwitcher.vue';
import HeaderMenu from '@/components/header/HeaderMenu.vue';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import HeaderProfileDropdown from '@/components/header/HeaderProfileDropdown.vue';

function toggleDropdown(): void {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const authStore = useAuthStore();

const { isAuth } = storeToRefs(authStore);

const isDropdownOpen = ref(false);
</script>