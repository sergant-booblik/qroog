<template>
  <button
    type="button"
    :class="[
      'button',
      `button--${color}`,
      `button--${size}`,
      { 'button--flex': flex },
      { 'button--loading': loading },
      { 'button--success': success },
      { 'button--disabled': disabled },
    ]"
    :disabled="disabled || loading"
    @click="emit('click')"
  >
    <div class="button__wrapper">
      <template v-if="loading">
        <div
          v-if="icon"
          class="button__icon"
        >
          <component :is="icon" />
        </div>
        {{ loadingLabel ?? label }}
      </template>
      <template v-if="success">
        <component :is="successIcon" />
      </template>
      <template v-if="!loading && !success">
        <div
          v-if="icon"
          class="button__icon"
        >
          <component :is="icon" />
        </div>
        {{ label }}
      </template>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ButtonColor, ButtonSize, ButtonType } from '@/type/button';
import { type Component, ref, toRefs, watch } from 'vue';
import { BIconCheckLg } from 'bootstrap-icons-vue';

interface Props {
  label?: string,
  icon?: Component,
  color?: ButtonColor,
  size?: ButtonSize,
  type?: ButtonType,
  flex?: boolean,
  loading?: boolean,
  loadingLabel?: string,
  successIcon?: any,
  withSuccess?: boolean,
  disabled?: boolean,
}

const emit = defineEmits(['click', 'finally']);

const props = withDefaults(defineProps<Props>(), {
  color: ButtonColor.GHOST,
  size: ButtonSize.MEDIUM,
  type: ButtonType.BUTTON,
  flex: false,
  successIcon: BIconCheckLg,
});

const { loading, withSuccess } = toRefs(props);

const success = ref(false);

watch(loading, (newValue, oldValue) => {
  if (oldValue && !newValue && withSuccess.value) {
    success.value = true;
    setTimeout(() => {
      success.value = false;
      emit('finally');
    }, 1000);
  }
});
</script>