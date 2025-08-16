<template>
  <header class="header">
    <div class="header__wrapper">
      <div class="header__logo">
        <slot name="logo">
          <LogoSVG class="header__logo-svg" />
        </slot>
      </div>
      <div class="header__right">
        <div class="header__controls">
          <div class="header__menu">
            <slot name="navigation" />
          </div>
          <div class="header__delimiter"
            v-if="slots.navigation && (slots.actions || slots.profile)"
          />
          <div class="header__buttons">
            <slot name="actions" />
          </div>
          <div class="header__profile">
            <slot name="profile" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import LogoSVG from '../assets/logo.svg';

const slots = defineSlots();
</script>