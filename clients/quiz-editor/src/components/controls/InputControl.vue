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
    <input
      v-model="localValue"
      :name="id"
      :type="type"
      :disabled="disabled"
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
import { computed } from 'vue';
import type { ErrorDetail } from '@/type/error.ts';
import { useSmartT } from '@/logic/i18n.ts';

interface Props {
  modelValue: string | number,
  disabled?: boolean,
  type?: InputType
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
