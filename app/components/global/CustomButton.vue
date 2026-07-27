<script lang="ts" setup>
defineProps<{
  label?: string;
  block?: boolean;
  height?: string | number;
  width?: string | number;
  variant?: "elevated" | "flat" | "outlined" | "plain" | "text" | "tonal";
  loading?: boolean;
  color?: string | "secondary";
  fontSize?: string;
  colorText?: string | "text-black";
  leadingIcon?: string | "";
  type?: "submit" | "button" | "reset";
  rounded?: string | number | boolean | undefined;
  disabled?: boolean | undefined;
}>();
</script>

<template>
  <v-btn
    :color="color ?? 'secondary'"
    :block="block ?? false"
    :variant="variant ?? 'elevated'"
    :height="height ?? '48px'"
    :width="width ?? '80px'"
    :loading="loading ?? false"
    :prepend-icon="leadingIcon ?? ''"
    :type="type ?? 'button'"
    :rounded="rounded"
    :disabled="disabled ?? false"
  >
    <div :class="fontSize ? '' : `font-size: ${fontSize ?? '12px'}`">
      <div :class="colorText ?? 'text-white'">
        {{ label ?? "" }}
      </div>
    </div>
  </v-btn>
</template>
