<script lang="ts" setup>
const { state, onConfirm, onCancel } = useDialog();

const iconMap: Record<string, { icon: string; color: string }> = {
  success: { icon: "mdi-check-circle", color: "success" },
  error: { icon: "mdi-close-circle", color: "error" },
  warning: { icon: "mdi-alert", color: "warning" },
  info: { icon: "mdi-information", color: "info" },
  confirm: { icon: "mdi-help-circle", color: "primary" },
};

const current = computed(() => iconMap[state.type] ?? iconMap.info);

const formValid = ref(true);
</script>

<template>
  <v-dialog
    v-model="state.show"
    max-width="420"
    :persistent="state.persistent || state.input"
  >
    <v-card rounded="lg">
      <!-- Icon -->
      <div class="d-flex justify-center pt-6">
        <v-icon
          v-if="current"
          :icon="current.icon"
          :color="current.color"
          size="64"
        />
      </div>

      <!-- Title -->
      <v-card-title class="text-center text-h6 pt-4">
        {{ state.title }}
      </v-card-title>

      <!-- Message -->
      <v-card-text v-if="state.message" class="text-center text-body-1">
        {{ state.message }}
      </v-card-text>

      <!-- Input field -->
      <v-card-text v-if="state.input">
        <v-text-field
          v-model="state.inputValue"
          :label="state.inputLabel"
          :placeholder="state.inputPlaceholder"
          :rules="state.inputRules"
          variant="outlined"
          density="comfortable"
          autofocus
          @keyup.enter="formValid && onConfirm()"
          @update:model-value="
            (v: string) =>
              (formValid = state.inputRules.every((r) => r(v) === true))
          "
        />
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="justify-center pb-5 px-6">
        <v-btn
          v-if="state.showCancel"
          variant="outlined"
          min-width="100"
          @click="onCancel"
        >
          {{ state.cancelText }}
        </v-btn>
        <v-btn
          :color="current?.color ?? 'secondary'"
          variant="flat"
          min-width="100"
          :disabled="state.input && !formValid"
          @click="onConfirm"
        >
          {{ state.confirmText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
