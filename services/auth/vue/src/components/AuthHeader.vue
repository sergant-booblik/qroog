<template>
  <BaseHeader>
    <template #actions>
      <LangSwitcher
        :locale="locale"
        :languages="languages"
        @set-language="handleLanguageChange"
      />
    </template>
  </BaseHeader>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { api } from '@/api';
import { BaseHeader, LangSwitcher } from '@libs/vue-ui';
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/logic/i18n';
import type { Locale, Language } from '@libs/shared-types';

const i18n = useI18n();

const locale = ref<Locale>('en-US');
const languages = ref<Language[]>([]);

onMounted(async () => {
  locale.value = i18n.locale.value as Locale;
  const languagesResponse = await api.fetchLanguages();
  // Map API response to shared-types Language interface
  languages.value = languagesResponse.languages.map(lang => ({
    id: parseInt(lang.id),
    name: lang.name,
    tag: lang.tag,
    originalName: lang.name, // Use name as originalName since API doesn't provide it
    base: lang.tag === 'en-US', // Assume en-US is base language
  }));
});

async function handleLanguageChange(newLocale: Locale) {
  await setLocale(newLocale);
  locale.value = newLocale as Locale;
}
</script>
