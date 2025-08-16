<template>
  <div
    ref="selectRef"
    :class="[
      'select',
      `select--${color}`,
      ]"
  >
    <label
      class="select__label"
    >
      {{ label }}
    </label>
    <button
      type="button"
      :class="[
        'select-button',
        { 'select-button--opened': isOpen },
      ]"
      @click="toggle"
    >
      <div class="select-item">
        <component
          v-if="selected?.icon"
          :is="selected?.icon"
        />
        {{ selected?.label }}
      </div>
      <BIconChevronDown class="select-chevron" />
    </button>
    <div
      v-if="isOpen"
      class="select-dropdown"
    >
      <button
        v-for="(item, index) in unselectedItems"
        :key="index"
        @click="select(item)"
        class="select-option"
      >
        <div class="select-item">
          <component
            v-if="item.icon"
            :is="item.icon"
          />
          {{ item.label }}
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { BIconChevronDown } from 'bootstrap-icons-vue';
import { SelectColor, type SelectItem } from '@/type/select';
import { onClickOutside } from '@vueuse/core'

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

function select(item: SelectItem) {
  emit('update:modelValue', item);
  isOpen.value = false;
}

interface Props {
  label?: string;
  items?: SelectItem[];
  modelValue?: SelectItem;
  color?: SelectColor;
}

const props = withDefaults(defineProps<Props>(), {
  color: SelectColor.SECONDARY,
});
const emit = defineEmits(['update:modelValue']);

const selectRef = ref<HTMLElement>();
const isOpen = ref(false);
const selected = ref(props.modelValue);

const unselectedItems = computed(() => props.items?.filter((item) => selected.value?.value !== item.value));

watchEffect(() => {
  selected.value = props.modelValue;
});

onClickOutside(selectRef, () => close());
</script>
