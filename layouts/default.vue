<template>
  <v-app dark>
    <v-app-bar fixed app style="z-index: 500">
      <img
        src="../static/logo.png"
        width="130"
        @click="jumpHome"
        style="cursor: pointer"
      />
      <v-spacer v-if="!isBottomNavigation" />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="!isBottomNavigation"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      floating
      style="z-index: 600"
      v-if="!isBottomNavigation"
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" color="yellow">
          <v-list-item to="/" link>
            <v-list-item-title>映画検索</v-list-item-title>
          </v-list-item>
          <v-list-item to="/posts" link>
            <v-list-item-title>みんなの投稿</v-list-item-title>
          </v-list-item>
          <v-list-item to="/ranking" link>
            <v-list-item-title>ランキング</v-list-item-title>
          </v-list-item>
          <!-- TODO: 実装予定
          <v-list-item to="/random" link>
            <v-list-item-title>ランダム</v-list-item-title>
          </v-list-item> -->
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main class="blue-grey darken-3">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      v-model="value"
      v-if="isBottomNavigation"
      color="yellow"
      app
    >
      <v-btn value="serch" to="/">
        <span>Search</span>
        <v-icon>mdi-movie-search-outline</v-icon>
      </v-btn>
      <v-btn value="posts" to="posts">
        <span>All Posts</span>
        <v-icon>mdi-movie-roll</v-icon>
      </v-btn>
      <v-btn value="ranking" to="/ranking">
        <span>Ranking</span>
        <v-icon>mdi-filmstrip-box-multiple</v-icon>
      </v-btn>
      <!-- TODO: 実装予定
      <v-btn value="random">
        <span>Random</span>
        <v-icon>mdi-find-replace</v-icon>
      </v-btn> -->
    </v-bottom-navigation>
    <v-footer app v-else>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      group: null,
      fixed: false,
      value: null,
    };
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
  methods: {
    jumpHome() {
      this.$router.push("/");
    },
  },
};
</script>
