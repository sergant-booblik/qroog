<template>
  <DropdownControl ref="dropdownRef">
    <template #button>
      <div class="profile__button">
        <div class="profile__avatar">
          <PictureComponent
            v-if="profile?.imageUrl"
            :src="profile?.imageUrl"
          />
          <BIconPersonCircle v-else/>
        </div>
        <div class="profile__toggle">
          {{ `@${profile?.username}` }}
          <BIconChevronDown />
        </div>
      </div>
    </template>
    <template #body>
      <div class="profile__settings">
        <div class="settings__main">
          <div class="settings__right">
            <div class="profile__avatar">
              <PictureComponent
                v-if="profile?.imageUrl"
                :src="profile?.imageUrl"
              />
              <BIconPersonCircle v-else/>
            </div>
            <div class="profile__about">
              <div class="profile__username">
                {{ `@${profile?.username}` }}
              </div>
              <div class="profile__email">
                {{ profile?.email }}
              </div>
            </div>
          </div>
          <div class="settings__left">
            <div class="profile__edit-button">
              <ButtonControl
                flex
                :label="t('Header.Profile.Button.Edit.label')"
                :color="ButtonColor.PRIMARY_COOL"
                @click="navigateToProfileSettings()"
              />
            </div>
          </div>
        </div>
        <div class="settings__buttons">
          <HeaderLangSwitcher />
          <ButtonControl
            flex
            :color="ButtonColor.SECONDARY"
            :label="t('Settings.Theme.Dark.label')"
            :icon="BIconMoon"
          />
        </div>
        <div class="settings__links">
          <HeaderMenu />
        </div>
        <div class="settings__logout">
          <ButtonControl
            :color="ButtonColor.DANGER_GHOST"
            :label="t('Auth.Profile.Button.Logout.label')"
            :icon="BIconBoxArrowRight"
            @click="logout"
          />
        </div>
      </div>
    </template>
  </DropdownControl>
</template>

<script setup lang="ts">
import DropdownControl from '@/components/controls/DropdownControl.vue';
import { useProfileStore } from '@/store/profile';
import { storeToRefs } from 'pinia';
import { BIconPersonCircle, BIconChevronDown, BIconMoon, BIconBoxArrowRight } from 'bootstrap-icons-vue';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { useI18n } from 'vue-i18n';
import { ButtonColor } from '@/type/button';
import HeaderLangSwitcher from '@/components/header/HeaderLangSwitcher.vue';
import HeaderMenu from '@/components/header/HeaderMenu.vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { RouteName } from '@/router';
import { type ComponentPublicInstance, ref } from 'vue';
import PictureComponent from '@/components/PictureComponent.vue';

async function logout(): Promise<void> {
  await authStore.logout(router);
}

function navigateToProfileSettings(): void {
  router.push({ name: RouteName.PROFILE_SETTINGS });
  dropdownRef.value?.closeDropdown();
}

const router = useRouter();

const authStore = useAuthStore();
const profileStore = useProfileStore();

const { t } = useI18n();

const { profile } = storeToRefs(profileStore);

const dropdownRef = ref<ComponentPublicInstance<{ closeDropdown: () => void }>>();
</script>