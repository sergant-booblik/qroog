<template>
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
          <InputControl
            v-model="code"
            id="code"
            :label="t('Auth.Card.Form.Input.Code.label')"
            :disabled="loading"
            :errors="errors?.code"
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
          <InputControl
            v-model="email"
            id="email"
            :label="t('Auth.Card.Form.Input.Email.label')"
            :disabled="loading"
            :errors="errors?.email"
            @change="authStore.clearFieldError('email')"
          />
          <div class="auth__description">
            {{ t('Auth.Card.description') }}
          </div>
        </div>
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
        />
        <ButtonControl
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
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { BIconArrowRight } from 'bootstrap-icons-vue';
import InputControl from '@/components/controls/InputControl.vue';
import ButtonControl from '@/components/controls/ButtonControl.vue';
import { ButtonColor, ButtonType } from '@/type/button';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { RouteName } from '@/router';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import { useSmartT } from '@/logic/i18n';
import { InputType } from '@/type/input';

const CODE_RESEND_TIMEOUT = 3 * 60 * 1000;

async function sendCode(): Promise<void> {
  authStore.clearAllErrors();
  await authStore.requestCode(email.value).then((res) => {
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
  await authStore.verifyCode(email.value, code.value).then((res) => {
    if (res.success) {
      router.push({ name: RouteName.DASHBOARD });
    }
  })
}

const t = useSmartT();

const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();

const { errors, loading } = storeToRefs(authStore);

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