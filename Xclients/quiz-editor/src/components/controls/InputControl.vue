<template>
  <div
    :class="[
      'input__control',
      { 'input__control--flex': flex },
      { 'input__control--disabled': disabled },
      { 'input__control--invalid': errors },
    ]"
  >
    <label
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>
    <component
      :is="prependIcon"
      class="input__prepend-icon"
    />
    <input
      v-model="localValue"
      :name="id"
      :type="type"
      :disabled="disabled"
      :pattern="pattern"
      :inputmode="inputmode"
      autocomplete="false"
      class="input__field"
    />
    <ul
      v-if="errors"
      class="input__error-list"
    >
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ t(error.label, error.params ?? {}) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { InputType } from '@/type/input';
import { type Component, computed } from 'vue';
import type { ErrorDetail } from '@/type/error';
import { useSmartT } from '@/logic/i18n';

interface Props {
  modelValue: string | number,
  disabled?: boolean,
  type?: InputType,
  prependIcon?: Component,
  pattern?: string,
  inputmode?: 'search' | 'text' | 'email' | 'tel' | 'url' | 'none' | 'numeric' | 'decimal' | undefined,
  label?: string,
  flex?: boolean,
  id: string,
  errors?: ErrorDetail[],
}

const emit = defineEmits(['update:modelValue', 'change']);

const props = withDefaults(defineProps<Props>(), {
  type: InputType.TEXT,
  flex: true,
});

const t = useSmartT();

const localValue = computed(({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
    emit('change');
  },
}));
</script>
