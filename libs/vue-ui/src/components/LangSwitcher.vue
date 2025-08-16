<template>
  <div class="header__lang-switcher">
    <SelectControl
      v-if="selectedOption"
      :items="languagesOptions"
      v-model="selectedOption"
      @update:modelValue="handleSelectionChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { markRaw } from 'vue';
import Flag from '../components/icons/flags';
import SelectControl from '../components/controls/SelectControl.vue';
import { type SelectItem, Language, Locale } from '@libs/shared-types';

interface Props {
  locale?: Locale,
  languages?: Language[],
}

const props = defineProps<Props>();

const emit = defineEmits(['set-language']);

const languagesOptions = computed(() => props.languages?.map((language) => ({
  icon: markRaw(Flag[language.tag] as any), // Use markRaw to prevent reactivity
  label: language.originalName,
  value: language.tag,
}) as SelectItem));

const selectedOption = computed(() => 
  languagesOptions.value?.find((option) => props.locale === option.value)
);

function handleSelectionChange(item: SelectItem) {
  emit('set-language', item.value as Locale);
}
</script>