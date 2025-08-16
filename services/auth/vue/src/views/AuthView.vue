<template>
  <div class="auth-page">
    <div class="auth__wrapper">
      <div class="auth__card">
        <h1 class="auth-card__title">
          {{ t('Auth.Card.SignIn.title') }}
          <BIconArrowRight />
        </h1>
        <form
          class="auth__form"
          @submit.prevent="isVerifyForm ? verifyCode() : sendCode()"
        >
          <div v-if="isVerifyForm">
            <Input
              v-model="code"
              id="code"
              :label="t('Auth.Card.Form.Input.Code.label')"
              :disabled="loading"
              :errors="translatedErrors?.code"
              :type="InputType.TEXT"
              inputmode="numeric"
              pattern="[0-9]*"
              @change="authStore.clearFieldError('code')"
            />
            <div class="auth__description">
              {{ t('Auth.Card.Code.Resend.timeLeft', { timeLeft: formattedTimeLeft }) }}
            </div>
          </div>
          <div v-else>
            <Input
              v-model="email"
              id="email"
              :label="t('Auth.Card.Form.Input.Email.label')"
              :disabled="loading"
              :errors="translatedErrors?.email"
              @change="authStore.clearFieldError('email')"
            />
            <div class="auth__description">
              {{ t('Auth.Card.description') }}
            </div>
          </div>
          <Button
            v-if="isVerifyForm"
            v-model="code"
            :label="t('Auth.Card.Form.Button.VerifyCode.label')"
            :color="ButtonColor.PRIMARY_WARM"
            :type="ButtonType.SUBMIT"
            :loading="loading"
            :disabled="code === '' || loading"
            flex
            @click="verifyCode"
          />
          <Button
            v-else
            :label="t('Auth.Card.Form.Button.SendCode.label')"
            :loadingLabel="t('Auth.Card.Form.Button.SendingCode.label')"
            :color="ButtonColor.PRIMARY_WARM"
            :type="ButtonType.SUBMIT"
            :loading="loading"
            :disabled="email === '' || loading"
            withSuccess
            flex
            @click="sendCode"
            @finally="changeForm"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { BIconArrowRight } from 'bootstrap-icons-vue';
import { Button, Input } from '@libs/vue-ui';
import { ButtonColor, ButtonType, InputType } from '@libs/shared-types';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useSmartT } from '@/logic/i18n';
import { storeToRefs } from 'pinia';
import type { RequestCodeResponse } from '@/api/auth/send-code';
import type { VerifyCodeResponse } from '@/api/auth/verify-code';
import { websiteAppUrl } from '@libs/shared-env';

const CODE_RESEND_TIMEOUT = 3 * 60 * 1000;

async function sendCode(): Promise<void> {
  authStore.clearAllErrors();
  await authStore.requestCode(email.value).then((res: RequestCodeResponse) => {
    if (res.success) {
      lastCodeSentAt.value = Date.now();
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
  authStore.clearAllErrors();
  await authStore.verifyCode(email.value, code.value).then((res: VerifyCodeResponse) => {
    if (res.success) {
      // Redirect to the website app after successful auth
      // Using shared environment utility
      window.location.href = websiteAppUrl;
    }
  })
}

const route = useRoute();

const authStore = useAuthStore();

const { loading, translatedErrors } = storeToRefs(authStore);
const t = useSmartT();

const email = ref('');
const code = ref('');
const isCodeSent = ref(false);
const isVerifyForm = ref(false);

const lastCodeSentAt = ref<number | null>(null);
const now = ref(Date.now());
const interval = ref<any>();

const timeLeft = computed(() => {
  if (!lastCodeSentAt.value || !now.value) return 0;
  const diff = CODE_RESEND_TIMEOUT - (now.value - lastCodeSentAt.value);
  return Math.max(0, diff);
});

const formattedTimeLeft = computed(() => {
  const seconds = Math.floor(timeLeft.value / 1000)
  const m = Math.floor(seconds / 60).toString().padStart(1, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
});

watch(() => route.query.page, () => {
  authStore.clearAllErrors();
});

watch(timeLeft, (newValue) => {
  if (newValue === 0) {
    isVerifyForm.value = false;
    code.value = '';
  }
});

onMounted(() => {
  interval.value = setInterval(() => {
    now.value = Date.now()
  }, 1000);
});

onUnmounted(() => {
  authStore.clearAllErrors;
  email.value = '';
  code.value = '';
  clearInterval(interval.value);
})
</script>
