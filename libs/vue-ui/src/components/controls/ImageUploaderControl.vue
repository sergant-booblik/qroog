<template>
  <div class="image-uploader">
    <div
      class="image-uploader__preview"
      :class="{ 'animate-pulse grayscale': loading }"
      @click="triggerFileInput"
    >
      <PictureComponent
        v-if="imageUrl"
        :src="imageUrl"
      />
    </div>
    <div class="image-uploader__body">
      <div class="image-uploader__text">
        <div class="image-uploader__title">
          {{ title }}
        </div>
        <div class="image-uploader__subtitle">
          {{ subtitle }}
        </div>
      </div>
      <div
        class="image-uploader__controls"
        :class="controlClassList"
      >
        <ButtonControl
          :label="currentImage || initialImage ? editImageButtonSettings?.labelReplace : editImageButtonSettings?.labelUpload"
          :append-icon="currentImage || initialImage ? editImageButtonSettings?.iconReplace : editImageButtonSettings?.iconUpload"
          :color="editImageButtonSettings?.color"
          :size="editImageButtonSettings?.size"
          :flex="editImageButtonSettings?.flex"
          :class="editImageButtonSettings?.classList"
          @click="triggerFileInput"
        />
        <ButtonControl
          v-if="(currentImage || initialImage) && !isDefaultImagePath"
          :label="removeImageButtonSettings?.label"
          :icon="removeImageButtonSettings?.icon"
          :color="removeImageButtonSettings?.color"
          :size="removeImageButtonSettings?.size"
          :flex="removeImageButtonSettings?.flex"
          class="image-uploader__remove"
          :class="removeImageButtonSettings?.classList"
          @click="removeImage"
        />
      </div>
    </div>
    <input
      type="file"
      accept="image/jpg, image/jpeg, image/webp, image/png"

      ref="fileInputRef"
      class="image-uploader__input"
      @change="handleFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import PictureComponent from '../PictureComponent.vue';
import ButtonControl from './ButtonControl.vue';
import { type Component, computed, ref } from 'vue';
import { ButtonColor, ButtonSize } from '@libs/shared-types';

function removeImage() {
  currentImage.value = undefined;
  emit('remove');
}

interface Props {
  title?: string,
  subtitle?: string,
  initialImage?: string | null,
  imagePlaceholder?: string,
  loading?: boolean,
  controlClassList?: string,
  removeImageButtonSettings: {
    label?: string,
    icon?: Component,
    color?: ButtonColor,
    size?: ButtonSize,
    flex?: boolean,
    classList?: string,
  },
  editImageButtonSettings: {
    labelReplace?: string,
    labelUpload?: string,
    iconReplace?: Component,
    iconUpload?: Component,
    color?: ButtonColor,
    size?: ButtonSize,
    flex?: boolean,
    classList?: string,
  },
}

const props = withDefaults(defineProps<Props>(), {
  initialImage: undefined,
  imagePlaceholder: undefined,
  loading: false,
  removeImageButtonSettings: undefined,
  editImageButtonSettings: undefined,
});

const emit = defineEmits(['update:image', 'upload', 'remove']);

const fileInputRef = ref<HTMLInputElement | undefined>(undefined);
const currentImage = ref<File | undefined>(undefined);

const imageUrl = computed(() => {
  if (currentImage.value) {
    return URL.createObjectURL(currentImage.value);
  } else if (props.initialImage) {
    return props.initialImage;
  } else {
    return props.imagePlaceholder;
  }
});

const isDefaultImagePath = computed(() => props.initialImage?.includes('/default/'));

const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement)?.files;
  if (files && files[0]) {
    currentImage.value = files[0];
    emit('upload', files);
  }
};

</script>