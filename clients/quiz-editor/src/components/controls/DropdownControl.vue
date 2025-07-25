<template>
  <div
    ref="dropdownRef"
    role="button"
    tabindex="0"
    :class="[
      'dropdown',
      { 'dropdown--opened': isDropdownOpened },
    ]"
  >
    <div
      role="button"
      class="dropdown__button"
      @click="toggleDropdown"
    >
      <slot name="button" />
    </div>
    <div
      v-if="isDropdownOpened"
      class="dropdown__body"
    >
      <div class="dropdown__wrapper">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

function openDropdown(): void {
  isDropdownOpened.value = true;
}

function closeDropdown(): void {
  isDropdownOpened.value = false;
}

function toggleDropdown(): void {
  if (isDropdownOpened.value) {
    closeDropdown();
  } else {
    openDropdown();
  }
}

defineExpose({ closeDropdown });

const dropdownRef = ref<HTMLElement>();
const isDropdownOpened = ref(false);

onClickOutside(dropdownRef, () => closeDropdown());
</script>