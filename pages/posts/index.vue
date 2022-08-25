<template>
  <v-container>
    <CardHeadlineTitle>みんなの投稿</CardHeadlineTitle>
    <v-tabs v-model="tab" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="pa-5">
      <v-tab-item>
        <v-row class="mt-2">
          <v-col
            v-for="post in fiveMoviesPosts"
            :key="post.id"
            cols="12"
            sm="6"
          >
            <CardPost :post="post" :btnSmall="btnSmall" :imageUrl="imageUrl" />
          </v-col>
          <!-- 無限スクロール -->
          <v-col cols="12" v-if="!!posts">
            <infinite-loading @infinite="addSearchMovies">
              <span slot="no-more" class="white--text"> 投稿は以上です。 </span>
              <span slot="spinner">
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="yellow" />
                </v-row>
              </span>
            </infinite-loading>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab-item>
        <v-row class="mt-2">
          <v-col v-for="post in sixMoviesPosts" :key="post.id" cols="12" sm="6">
            <CardPost :post="post" :btnSmall="btnSmall" :imageUrl="imageUrl" />
          </v-col>
          <!-- 無限スクロール -->
          <v-col cols="12" v-if="!!posts">
            <infinite-loading @infinite="addSearchMovies">
              <span slot="no-more" class="white--text"> 投稿は以上です。 </span>
              <span slot="spinner">
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="yellow" />
                </v-row>
              </span>
            </infinite-loading>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $config: { backendBaseUrl, imageUrl }, $axios }) {
    const posts = await $axios.$get(`${backendBaseUrl}/posts`, {
      params: { page: 1 },
    });
    return { backendBaseUrl, imageUrl, posts };
  },
  data() {
    return {
      addPage: 1,
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
    fiveMoviesPosts() {
      return this.posts.filter((post) => post.movie_count === "5");
    },
    sixMoviesPosts() {
      return this.posts.filter((post) => post.movie_count === "6");
    },
  },
  methods: {
    async addSearchMovies($state) {
      try {
        this.addPage += 1;
        const results = await this.$axios.$get(`${this.backendBaseUrl}/posts`, {
          params: { page: this.addPage },
        });

        setTimeout(() => {
          if (results.length > 0) {
            this.posts.push(...results);
            $state.loaded();
          } else {
            $state.complete();
          }
        }, 1000);
      } catch {
        $state.complete();
      }
    },
  },
};
</script>
