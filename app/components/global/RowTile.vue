<script setup lang="ts">
import type { PropType } from "vue";

type AlignSelf = "auto" | "start" | "end" | "center" | "baseline" | "stretch";
type JustifyContent =
  | "start"
  | "end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

defineProps({
  flexLeading: { type: Number, default: 4 },
  flexCenter: { type: Number, default: 4 },
  flexTrailing: { type: Number, default: 4 },

  // Row-level (cross-axis / main-axis for the whole row)
  align: {
    type: String as PropType<
      "center" | "start" | "end" | "stretch" | "baseline"
    >,
    default: "center",
  },
  justify: {
    type: String as PropType<
      | "start"
      | "center"
      | "end"
      | "space-between"
      | "space-around"
      | "space-evenly"
    >,
    default: "start",
  },

  // Per-column vertical alignment (align-self)
  leadingAlign: { type: String as PropType<AlignSelf>, default: "auto" },
  centerAlign: { type: String as PropType<AlignSelf>, default: "auto" },
  trailingAlign: { type: String as PropType<AlignSelf>, default: "auto" },

  // Per-column horizontal alignment (justify-content inside each col)
  leadingJustify: {
    type: String as PropType<JustifyContent>,
    default: "start",
  },
  centerJustify: { type: String as PropType<JustifyContent>, default: "start" },
  trailingJustify: {
    type: String as PropType<JustifyContent>,
    default: "start",
  },
});

const resolveCols = (val: number) => (val === 0 ? "auto" : val);
</script>

<template>
  <v-row :align="align" :justify="justify" no-gutters>
    <v-col
      :cols="resolveCols(flexLeading)"
      :align-self="leadingAlign"
      class="d-flex"
      :class="`justify-${leadingJustify}`"
    >
      <slot name="leading" />
    </v-col>

    <v-col
      :cols="resolveCols(flexCenter)"
      :align-self="centerAlign"
      class="d-flex"
      :class="`justify-${centerJustify}`"
    >
      <slot name="center" />
    </v-col>

    <v-col
      :cols="resolveCols(flexTrailing)"
      :align-self="trailingAlign"
      class="d-flex"
      :class="`justify-${trailingJustify}`"
    >
      <slot name="trailing" />
    </v-col>
  </v-row>
</template>
