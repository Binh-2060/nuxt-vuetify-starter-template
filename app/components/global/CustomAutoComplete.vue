<script setup lang="ts">
type ValidationRule = (value: any) => string | boolean;

withDefaults(
  defineProps<{
    modelValue?: Record<string, any> | null;
    items?: any[];
    label?: string;
    placeholder?: string;
    itemTitle?: string;
    itemValue?: string;
    cols?: string | number;
    rules?: ValidationRule[];
    disabled?: boolean;
    clearable?: boolean;
    returnObject?: boolean;
    hideDetails?: "auto" | boolean | undefined;
    density?: null | "default" | "comfortable" | "compact";
    variant?:
      | "filled"
      | "outlined"
      | "plain"
      | "solo"
      | "solo-filled"
      | "solo-inverted"
      | "underlined";
  }>(),
  {
    modelValue: null,
    items: () => [],
    label: "",
    placeholder: "",
    itemTitle: "name",
    itemValue: "id",
    cols: "12",
    rules: () => [],
    disabled: false,
    clearable: false,
  },
);

defineEmits<{
  "update:modelValue": [value: Record<string, any> | null];
  search: [value: string];
}>();
</script>

<template>
  <label style="font-size: 14px; font-weight: 600" v-if="label"
    >{{ label }}
    <span class="text-red" v-if="rules && rules.length > 0">*</span>
  </label>
  <v-autocomplete
    :items="items"
    :variant="variant"
    :placeholder="placeholder"
    :density="density"
    :hide-details="hideDetails"
    :item-title="itemTitle"
    :item-value="itemValue"
    :return-object="returnObject ?? false"
    :rules="rules"
    no-filter
    :model-value="modelValue"
    :disabled="disabled"
    :clearable="clearable"
    @update:model-value="$emit('update:modelValue', $event)"
    @update:search="$emit('search', $event)"
  >
    <slot />
  </v-autocomplete>
</template>
