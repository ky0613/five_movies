<template>
  <v-container>
    <CardHeadlineTitle>みんなの投稿</CardHeadlineTitle>
    <v-tabs v-model="tab" grow color="yellow">
      <v-tabs-slider color="yellow" />
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pa-3">
      <v-tab-item>
        <v-row class="mt-2">
          <v-col
            v-for="post in fiveMoviesPostList"
            :key="post.id"
            cols="12"
            sm="6"
          >
            <CardPost :post="post" :btnSmall="btnSmall" :imageUrl="imageUrl" />
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row class="mt-2">
          <v-col
            v-for="post in sixMoviesPostList"
            :key="post.id"
            cols="12"
            sm="6"
          >
            <CardPost :post="post" :btnSmall="btnSmall" :imageUrl="imageUrl" />
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $config: { backendBaseUrl, imageUrl }, $axios }) {
    const posts = await $axios.$get(`${backendBaseUrl}/posts`);
    return { backendBaseUrl, imageUrl, posts };
  },
  data() {
    return {
      tab: null,
      items: ["5本の映画", "6本の映画"],
    };
  },
  computed: {
    btnSmall() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return true;
        default:
          return false;
      }
    },
    sixMoviesPostList() {
      return this.posts.filter((post) => post.movie_count === "6");
    },
    fiveMoviesPostList() {
      return this.posts.filter((post) => post.movie_count === "5");
    },
  },
};
</script>
