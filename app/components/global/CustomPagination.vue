<script lang="ts" setup>
defineProps<{
  page?: number;
  limit?: number | 20;
  totalpage: number | 1;
  color?: string | "primary";
  totalVisible?: number | 3;
}>();
const emit = defineEmits(["onPageChange"]);
</script>

<template>
  <div>
    <v-pagination
      :color="color ?? 'primary'"
      :total-visible="totalVisible ?? 3"
      :length="totalpage ?? 1"
      :model-value="page"
      @update:model-value="$emit('onPageChange', $event)"
    ></v-pagination>
  </div>
</template>
