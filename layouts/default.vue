<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app style="z-index: 500">
      <img
        src="../static/logo.png"
        width="130"
        @click="jumpHome"
        style="cursor: pointer"
        class="ml-5"
      />
      <v-spacer />
      <v-btn to="/posts" color="yellow" class="black--text">みんなの投稿</v-btn>
    </v-app-bar>
    <v-main class="blue-grey darken-3">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
    };
  },
  methods: {
    jumpHome() {
      this.$router.push("/");
    },
  },
};
</script>
