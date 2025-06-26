<template>
  <div class="header__lang-switcher">
    <SelectControl
      :items="languagesOptions"
      v-model="selectedOption"
      @update:modelValue="(v) => { setLocale(v.value) }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { setLocale } from '@/logic/i18n';
import { useTranslationStore } from '@/store/translation';
import Flag from '@/components/icons/flags';
import SelectControl from '@/components/controls/SelectControl.vue';
import type { SelectItem } from '@/type/select';
import { useI18n } from 'vue-i18n'

const { locale } = useI18n();

const translationStore = useTranslationStore();

const { languages } = storeToRefs(translationStore);

const languagesOptions = computed(() => languages.value?.map((language) => ({
  icon: Flag[language.tag],
  label: language.originalName,
  value: language.tag,
}) as SelectItem));

const selectedOption = ref(languagesOptions.value?.find((option) => locale.value === option.value));
</script>