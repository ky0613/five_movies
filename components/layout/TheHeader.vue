<template>
  <div>
    <v-app-bar fixed app style="z-index: 500">
      <nuxt-link to="/" class="ml-2">
        <img src="../../static/logo.png" width="200" style="cursor: pointer" />
      </nuxt-link>
      <v-spacer v-if="!isBottomNavigation" />
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="!isBottomNavigation"
      />
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      bottom
      style="z-index: 600"
      v-if="!isBottomNavigation"
    >
      <v-list nav dense>
        <v-list-item-group v-model="group" color="yellow">
          <ListItem to="/">
            <template #icon>mdi-movie-star-outline</template>
            映画検索
          </ListItem>
          <ListItem to="/posts">
            <template #icon>mdi-movie-roll</template>
            みんなの投稿
          </ListItem>
          <ListItem to="/search">
            <template #icon>mdi-movie-search-outline</template>
            投稿検索
          </ListItem>
          <ListItem to="/ranking">
            <template #icon>mdi-filmstrip-box-multiple</template>
            ランキング
          </ListItem>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
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
    return { group: null, drawer: false };
  },
};
</script>
