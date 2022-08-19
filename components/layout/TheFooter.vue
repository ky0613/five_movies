<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    isBottomNavigation: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      fixed: false,
      value: null,
    };
  },
};
</script>
