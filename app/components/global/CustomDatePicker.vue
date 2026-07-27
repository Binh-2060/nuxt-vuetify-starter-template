<script setup lang="ts">
const props = defineProps<{
  label?: string;
  placeholder?: string;
  rules?: ((v: string) => true | string)[];
}>();

const model = defineModel<Date | string | null>({ default: null });

const dialog = ref(false);
const internalDate = ref(model.value);

watch(model, (val) => {
  internalDate.value = val;
});

const formattedDate = computed(() => {
  if (!model.value) return "";
  return FormateDate(model.value ?? "");
});

const confirm = () => {
  model.value = internalDate.value;
  dialog.value = false;
};

const cancel = () => {
  internalDate.value = model.value;
  dialog.value = false;
};
</script>

<template>
  <v-dialog v-model="dialog" max-width="360">
    <template #activator="{ props: activatorProps }">
      <label v-if="label" style="font-size: 14px; font-weight: 600">
        {{ label }}
        <span v-if="rules && rules.length > 0" class="text-red">*</span>
      </label>
      <v-text-field
        v-bind="activatorProps"
        :model-value="formattedDate"
        :placeholder="placeholder ?? 'DD/MM/YYYY'"
        :rules="rules"
        prepend-inner-icon="mdi-calendar"
        readonly
        density="compact"
        variant="outlined"
        hide-details="auto"
      />
    </template>

    <v-date-picker v-model="internalDate" color="primary" show-adjacent-months>
      <template #actions>
        <v-btn variant="text" @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="confirm">OK</v-btn>
      </template>
    </v-date-picker>
  </v-dialog>
</template>
