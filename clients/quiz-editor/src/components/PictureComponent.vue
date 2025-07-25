<template>
  <div class="picture">
    <img
      :src="src"
      :alt="alt"
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string,
  alt?: string,
}

withDefaults(defineProps<Props>(), {
  alt: undefined,
});
</script>