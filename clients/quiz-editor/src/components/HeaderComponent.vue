<template>
  <header class="header">
    <div class="header__wrapper">
      <LogoComponent
        class="header__logo"
      />
      <div class="header__controls">
        <div class="header__menu">
          <LinkControl
            :title="t('Header.Menu.Link.Partners.title')"
            :route="RouteName.PARTNER"
          />
          <LinkControl
            :title="t('Header.Menu.Link.Premium.title')"
            :icon="BIconStarFill"
            :route="RouteName.PREMIUM"
          />
        </div>
        <div class="header__lang-switcher">
          <SelectControl
            :items="languagesOptions"
            v-model="selectedOption"
            @update:modelValue="(v) => { setLocale(v.value) }"
          />
        </div>
        <div class="header__delimiter" />
        <div class="header__buttons">
          <ButtonControl
            :title="t('Header.Menu.Button.Login.title')"
            :color="ButtonColor.PRIMARY_WARM"
          />
          <ButtonControl
            :title="t('Header.Menu.Button.Signup.title')"
            :color="ButtonColor.SECONDARY"
          />
        </div>
      </div>
      <div class="header__mobile-menu">
        <ButtonControl
          :icon="BIconList"
          :size="ButtonSize.LARGE"
          @click="toggleDropdown()"
        />
        <div
          :class="[
            'header__dropdown',
            { 'header__dropdown--opened': isDropdownOpen },
          ]"
        >
          <div class="header__buttons">
            <ButtonControl
              :title="t('Header.Menu.Button.Login.title')"
              :color="ButtonColor.PRIMARY_WARM"
              flex
            />
            <ButtonControl
              :title="t('Header.Menu.Button.Signup.title')"
              :color="ButtonColor.SECONDARY"
              flex
            />
          </div>
          <div class="header__lang-switcher">
            <SelectControl
              :items="languagesOptions"
              v-model="selectedOption"
              @update:modelValue="(v) => { setLocale(v.value) }"
            />
          </div>
          <div class="header-dropdown__delimiter" />
          <LinkControl
            :title="t('Header.Menu.Link.Premium.title')"
            :icon="BIconStarFill"
            :route="RouteName.PREMIUM"
          />
          <LinkControl
            :title="t('Header.Menu.Link.Partners.title')"
            :route="RouteName.PARTNER"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LogoComponent from '@/components/LogoComponent.vue';
import LinkControl from '@/components/controls/LinkControl.vue';
import { RouteName } from '@/router'
import { BIconList, BIconStarFill } from 'bootstrap-icons-vue'
import ButtonControl from '@/components/controls/ButtonControl.vue'
import { ButtonColor, ButtonSize } from '@/type/button.ts'
import SelectControl from '@/components/controls/SelectControl.vue'
import { useTranslationStore } from '@/store/translation.ts'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import Flag from '@/components/icons/flags'
import type { SelectItem } from '@/type/select.ts'
import { setLocale } from '@/logic/i18n.ts';

function toggleDropdown(): void {
  isDropdownOpen.value = !isDropdownOpen.value;
}

const { t, locale } = useI18n();

const translationStore = useTranslationStore();

const { languages } = storeToRefs(translationStore);

const isDropdownOpen = ref(false);

const languagesOptions = computed(() => languages.value?.map((language) => ({
  icon: Flag[language.tag],
  label: language.originalName,
  value: language.tag,
}) as SelectItem));

const selectedOption = ref(languagesOptions.value?.find((option) => locale.value === option.value));
</script>