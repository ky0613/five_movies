<template>
  <v-container>
    <v-card rounded="xl" width="250" color="yellow" class="mx-auto mb-10">
      <v-card-title class="black--text font-weight-bold text-center">
        <span class="mx-auto">みんなの投稿一覧</span>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col v-for="post in posts" :key="post.id" cols="12" sm="6">
        <v-card>
          <v-row align="center" justify="center" class="pt-4">
            <p class="text-overline text-sm-h5 text-center">
              {{ post.name }}さんを<br />構成する5本の映画
            </p>
            <v-btn
              :to="`/posts/${post.uuid}`"
              :small="btnSmall"
              class="ml-8 mb-5 black--text"
              color="yellow"
            >
              詳細ページ
            </v-btn>
          </v-row>
          <v-img
            :src="`https://five-movies.s3.ap-northeast-1.amazonaws.com/uploads/post/image/${post.id}/${post.uuid}.jpg`"
            contain
          />
        </v-card>
      </v-col>
      <!-- 無限スクロール -->
      <v-col cols="12" v-if="posts">
        <infinite-loading @infinite="addSearchMovies">
          <span slot="no-more" v-if="isInfinity" class="white--text">
            投稿は以上です。
          </span>
          <span slot="spinner" v-if="isInfinity">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="yellow" />
            </v-row>
          </span>
        </infinite-loading>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $config: { backendBaseUrl }, $axios }) {
    const posts = await $axios.$get(`${backendBaseUrl}/posts`, {
      params: { page: 1 },
    });
    return { backendBaseUrl, posts };
  },
  data() {
    return {
      addPage: 1,
      isInfinity: false,
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
  },
  methods: {
    async addSearchMovies($state) {
      try {
        this.addPage += 1;
        this.isInfinity = true;
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
