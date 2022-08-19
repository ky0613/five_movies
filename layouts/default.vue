<template>
  <v-app dark>
    <TheHeader :isBottomNavigation="isBottomNavigation" />
    <v-main class="blue-grey darken-3">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <TheFooter :isBottomNavigation="isBottomNavigation" />
  </v-app>
</template>

<script>
import TheHeader from "../components/layout/TheHeader.vue";
import TheFooter from "../components/layout/TheFooter.vue";

export default {
  name: "DefaultLayout",
  components: {
    TheHeader,
    TheFooter,
  },
  computed: {
    isBottomNavigation() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        default:
          return false;
      }
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
