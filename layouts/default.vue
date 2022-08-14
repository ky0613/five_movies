<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title
        v-text="title"
        @click="jumpHome"
        style="cursor: pointer"
        class="ml-3 ml-sm-8 text-body-1 text-sm-subtitle-1"
      />
      <v-spacer />
      <v-btn to="/posts" color="green darken-2">みんなの投稿</v-btn>
    </v-app-bar>
    <v-main class="blue darken-3">
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
      title: "私を構成する5本の映画",
    };
  },
  methods: {
    jumpHome() {
      this.$router.push("/");
    },
  },
};
</script>
