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
          <v-list-item to="/search" link>
            <v-list-item-title>投稿検索</v-list-item-title>
          </v-list-item>
          <v-list-item to="/ranking" link>
            <v-list-item-title>ランキング</v-list-item-title>
          </v-list-item>
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
