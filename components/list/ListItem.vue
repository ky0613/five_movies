<template>
  <v-list-item :to="to" nuxt>
    <v-list-item-icon>
      <v-icon><slot name="icon" /></v-icon>
    </v-list-item-icon>
    <v-list-item-content><slot /></v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>
