<!-- components/base/BaseSelect.vue -->
<script setup lang="ts">
interface Props {
  items: any[];
  label?: string;
  placeholder?: string;
  rules?: any[];
  itemTitle?: string;
  itemValue?: string;
  returnObject?: boolean;
  disabled?: boolean;
  clearable?: boolean;
  hideDetails?: boolean | "auto" | undefined;
  density?: null | "default" | "comfortable" | "compact";
  variants?:
    | "outlined"
    | "plain"
    | "filled"
    | "solo"
    | "solo-filled"
    | "solo-inverted"
    | "underlined"
    | undefined;
}

withDefaults(defineProps<Props>(), {
  label: "",
  placeholder: "",
  rules: () => [],
  itemTitle: "name",
  itemValue: "code",
  returnObject: true,
  disabled: false,
  clearable: false,
});

const model = defineModel<any>();
</script>

<template>
  <div>
    <label v-if="label" class="base-select-label"
      >{{ label }}

      <span v-if="rules.length > 0" class="text-red">*</span>
    </label>
    <v-select
      v-model="model"
      :items="items"
      :variant="variants"
      :placeholder="placeholder"
      :density="density"
      :hide-details="hideDetails ?? false"
      :rules="rules"
      :item-title="itemTitle"
      :item-value="itemValue"
      :return-object="returnObject"
      :disabled="disabled"
      :clearable="clearable"
    />
  </div>
</template>

<style scoped>
.base-select-label {
  font-size: 14px;
  font-weight: 600;
}
</style>
