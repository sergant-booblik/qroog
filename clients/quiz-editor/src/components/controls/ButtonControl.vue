<template>
  <button
    type="button"
    :class="[
      'button',
      `button--${color}`,
      `button--${size}`,
      { 'button--flex': flex },
    ]"
    @click="emit('click')"
  >
    <div class="button__wrapper">
      <div class="button__icon">
        <component :is="icon" />
      </div>
      {{ title }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { ButtonColor, ButtonSize } from '@/type/button'
import type { Component } from 'vue'

interface Props {
  title?: string,
  icon?: Component,
  color?: ButtonColor,
  size?: ButtonSize,
  flex?: boolean,
}

const emit = defineEmits(['click']);

withDefaults(defineProps<Props>(), {
  color: ButtonColor.GHOST,
  size: ButtonSize.MEDIUM,
  flex: false,
});
</script>