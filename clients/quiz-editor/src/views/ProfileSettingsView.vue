<template>
  <div class="page page--profile-settings">
    <h1>{{ t('Profile.Settings.title') }}</h1>
    <div class="page__inner">
      <section class="section section--profile-settings-personal">
        <div class="section__title">
          {{ t('Profile.Settings.Personal.title') }}
        </div>
        <div class="section__body">
          <ImageUploaderControl
            :title="t('Profile.Settings.Personal.ImageUploader.title')"
            :subtitle="t('Profile.Settings.Personal.ImageUploader.subtitle')"
            :initial-image="profile?.imageUrl"
            :image-placeholder="PlaceholderProfileImage"
            :loading="profileStore.loading"
            :edit-image-button-settings="{
                labelReplace: t('Profile.Settings.Personal.ImageUploader.ReplaceImage'),
                labelUpload: t('Profile.Settings.Personal.ImageUploader.UploadImage'),
                color: ButtonColor.SECONDARY,
              }"
            :remove-image-button-settings="{
                label: t('Profile.Settings.Personal.ImageUploader.DeleteImage'),
                color: ButtonColor.DANGER_GHOST,
              }"
            @remove="removeProfileImage"
            @upload="(v) => updateProfileImage(v)"
          />
          <InputControl
            v-model="username"
            id="username"
            :label="t('Profile.Settings.Personal.Username.label')"
            :prepend-icon="BIconAt"
          />
          <InputControl
            v-model="fullName"
            id="fullName"
            :label="t('Profile.Settings.Personal.FullName.label')"
            @update:modelValue="(v) => updateProfile('fullName', v)"
          />
          <SelectControl
            v-if="languagesOptions"
            :label="t('Profile.Settings.Personal.Language.label')"
            :items="languagesOptions"
            :color="SelectColor.GHOST"
            v-model="selectedLanguage"
            @update:modelValue="(v) => setLocale(v.value)"
          />
          <InputControl
            v-model="location"
            id="fullName"
            :label="t('Profile.Settings.Personal.Location.label')"
          />
        </div>
      </section>
      <section class="section section--profile-settings-account">
        <h3 class="section__title">
          {{ t('Profile.Settings.Account.title') }}
        </h3>
        <div class="section__body">
          <div class="section__group">
            <InputControl
              v-model="email"
              id="username"
              :disabled="!isEmailChanging"
              :label="t('Profile.Settings.Account.Email.label')"
            />
            <div class="section__button-group">
              <ButtonControl
                v-if="!isEmailChanging"
                :label="t('Profile.Settings.Account.Email.Change.Button.label')"
                :color="ButtonColor.PRIMARY_WARM"
                @click="allowChangeEmail()"
              />
              <ButtonControl
                v-if="isEmailChanging"
                :label="t('Profile.Settings.Account.Email.Confirm.Button.label')"
                :color="ButtonColor.PRIMARY_WARM"
                :disabled="profile?.email === email"
              />
              <ButtonControl
                v-if="isEmailChanging"
                :label="t('Profile.Settings.Account.Email.Cancel.Button.label')"
                :color="ButtonColor.SECONDARY"
                @click="cancelChangeEmail()"
              />
            </div>
          </div>
          <div class="section__group">
            <div class="section-group__text">
              <h4 class="section-group__title">{{ t('Profile.Settings.Account.Delete.title') }}</h4>
              <p>{{ t('Profile.Settings.Account.Delete.description') }}</p>
            </div>
            <ButtonControl
              :label="t('Profile.Settings.Account.Delete.Button.Confirm.label')"
              :color="ButtonColor.DANGER"
              @click="openConfirmDeleteModal()"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import InputControl from '@/components/controls/InputControl.vue';
import { computed, ref } from 'vue';
import { useProfileStore } from '@/store/profile';
import { storeToRefs } from 'pinia';
import { BIconAt } from 'bootstrap-icons-vue';
import { setLocale } from '@/logic/i18n';
import SelectControl from '@/components/controls/SelectControl.vue';
import { useTranslationStore } from '@/store/translation';
import Flag from '@/components/icons/flags';
import { SelectColor, type SelectItem } from '@/type/select';
import ImageUploaderControl from '@/components/controls/ImageUploaderControl.vue';
import PlaceholderProfileImage from '@/assets/profile.png';
import { ButtonColor } from '@/type/button';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { Profile } from '@/type/profile';

function removeProfileImage(): void {
  profileStore.updateProfileImage(undefined);
}

function updateProfileImage(files: FileList | undefined): void {
  if (!files) {
    return;
  }
  profileStore.updateProfileImage(files);
}

function updateProfile(field: keyof Profile, value: unknown): void {
  profileStore.updateProfile({ [field]: value });
}

function allowChangeEmail(): void {
  isEmailChanging.value = true;
  initialEmail.value = profile.value?.email ?? '';
}

function cancelChangeEmail(): void {
  isEmailChanging.value = false;
  email.value = initialEmail.value;
}

const profileStore = useProfileStore();
const translationStore = useTranslationStore();

const { t, locale } = useI18n();

const { profile } = storeToRefs(profileStore);
const { languages } = storeToRefs(translationStore);

const isEmailChanging = ref(false);
const initialEmail = ref('');

const username = computed({
  get: () => profile.value?.username,
  set: (v) => v,
});
const fullName = computed({
  get: () => profile.value?.fullName,
  set: (v) => v,
});
const location = computed({
  get: () => profile.value?.location,
  set: (v) => v,
});
const email = computed({
  get: () => profile.value?.email,
  set: (v) => v,
});

const languagesOptions = computed(() => languages.value?.map((language) => ({
  icon: Flag[language.tag],
  label: language.originalName,
  value: language.tag,
}) as SelectItem));
const selectedLanguage = ref(languagesOptions.value?.find((option) => locale.value === option.value));

</script>