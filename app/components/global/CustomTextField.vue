<template>
  <div>
    <label :style="{ fontSize: '14px', fontWeight: 600 }" v-if="label">
      {{ label }}
      <span v-if="!optional && rules && rules?.length > 0" class="text-red"
        >*</span
      >
    </label>
    <v-text-field
      v-model="model"
      :variant="variant"
      :density="density"
      :hide-details="hideDeatails"
      :placeholder="placeholder"
      :rules="rules"
      :readonly="readonly"
      :type="type ?? undefined"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  placeholder?: string;
  rules?: ((v: string) => true | string)[];
  optional?: boolean; // hide the required mark when rules are only format checks (e.g. max length)
  density?: null | "default" | "comfortable" | "compact";
  hideDeatails?: "auto" | boolean | undefined;
  readonly?: boolean | null | undefined;
  type?: string | undefined;
  variant?:
    | "outlined"
    | "filled"
    | "plain"
    | "solo"
    | "solo-filled"
    | "solo-inverted"
    | "underlined"
    | undefined;
}>();

const model = defineModel<string>();
</script>
