<template>
  <div class="auth__wrapper">
    <div class="auth__card">
      <h1 class="auth-card__title">
        {{ t(title) }}
        <BIconArrowRight />
      </h1>
      <form
        class="auth__form"
        @submit.prevent="isVerifyForm ? verifyCode() : sendCode()"
      >
        <InputControl
          v-if="isVerifyForm"
          v-model="code"
          id="code"
          :label="t('Auth.Card.Form.Input.Code.label')"
          :disabled="loading"
          :errors="errors?.code"
          :type="InputType.NUMBER"
          @change="authStore.clearFieldError('code')"
        />
        <InputControl
          v-else
          v-model="email"
          id="email"
          :label="t('Auth.Card.Form.Input.Email.label')"
          :disabled="loading"
          :errors="errors?.email"
          @change="authStore.clearFieldError('email')"
        />
        <ButtonControl
          v-if="isVerifyForm"
          v-model="code"
          :label="t('Auth.Card.Form.Button.VerifyCode.label')"
          :color="ButtonColor.PRIMARY_WARM"
          :type="ButtonType.SUBMIT"
          :loading="loading"
          :disabled="code === '' || loading"
          flex
          @click="verifyCode"
          @finally="navigateToDashboard"
        />
        <ButtonControl
          v-else
          :label="t('Auth.Card.Form.Button.SendCode.label')"
          :loadingLabel="t('Auth.Card.Form.Button.SendingCode.label')"
          :color="ButtonColor.PRIMARY_WARM"
          :type="ButtonType.SUBMIT"
          :loading="loading"
          :disabled="email === '' || loading"
          flex
          @click="sendCode"
          @finally="changeForm"
        />
      </form>
      <div class="auth__link">
        {{ t(authLink.text) }}
        <LinkControl
          :label="t(authLink.label)"
          :route="{ name: RouteName.AUTH, query: { page: authLink.page } }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { BIconArrowRight } from 'bootstrap-icons-vue';
import InputControl from '@/components/controls/InputControl.vue';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { ButtonColor, ButtonType } from '@/type/button.ts';
import { computed, ref, watch } from 'vue';
import LinkControl from '@/components/controls/LinkControl.vue';
import { RouteName } from '@/router';
import { useAuthStore } from '@/store/auth.ts';
import { storeToRefs } from 'pinia';
import { useSmartT } from '@/logic/i18n.ts';
import { InputType } from '@/type/input.ts';

async function sendCode(): Promise<void> {
  await authStore.requestCode(email.value).then((res) => {
    if (res.success) {
      isCodeSent.value = true;
    }
  });
}

function changeForm(): void {
  if (isCodeSent.value) {
    isVerifyForm.value = true;
  }
}

async function verifyCode(): Promise<void> {
  await authStore.verifyCode(email.value, code.value).then((res) => {
    if (res.success) {
      isCodeVerifyed.value = true;
    }
  })
}

function navigateToDashboard(): void {
  if (isCodeVerifyed.value) {
    router.push({ name: RouteName.DASHBOARD });
  }
}

const t = useSmartT();

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const { errors, loading } = storeToRefs(authStore);

const email = ref('');
const code = ref('');
const isCodeSent = ref(false);
const isCodeVerifyed = ref(false);
const isVerifyForm = ref(false);

const isSignUp = computed(() => route.query.page === 'sign-up');

const title = computed(() => isSignUp.value ? 'Auth.Card.SignUp.title' : 'Auth.Card.SignIn.title');
const authLink = computed(() => isSignUp.value
  ? { text: 'Auth.Card.SignIn.text', label: 'Auth.Card.SignIn.label', page: 'sign-in' }
  : { text: 'Auth.Card.SignUp.text', label: 'Auth.Card.SignUp.label', page: 'sign-up' }
);

watch(() => route.query.page, () => {
  authStore.clearAllErrors();
});
</script>