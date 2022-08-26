<template>
  <v-container text-center class="pa-2">
    <CardMovies
      :movies="movies"
      :name="post.name"
      @open-modal="openDetailMovie"
    />
    <CardMovieTitles :movies="movies" @open-modal-title="openDetailMovie" />
    <v-col class="pa-6" justify="center" align="center">
      <v-btn to="/" color="primary">自分も画像を作成する</v-btn>
      <v-btn
        @click="webShareApi"
        class="d-flex d-sm-none mt-3 black--text"
        color="yellow"
      >
        SNSで共有する
      </v-btn>
    </v-col>
    <v-dialog v-model="dialog" width="80%" overlay-opacity="0.8">
      <v-card class="pa-4">
        <CardMovieDetail :movie="detailMovie">
          <v-btn
            @click="closeDetailMovie"
            color="primary"
            small
            class="mt-2 mt-sm-0"
          >
            閉じる
          </v-btn>
        </CardMovieDetail>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: "og:url",
          property: "og:url",
          content: this.shareUrl,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.shareImageUrl,
        },
      ],
    };
  },
  async asyncData({ $config: { backendBaseUrl }, $axios, params }) {
    // 映画情報のとOGP用URLの取得
    const data = await $axios.$get(`${backendBaseUrl}/posts/${params.uuid}`);
    const { movies, post } = data;
    const shareImageUrl = `https://five-movies.s3.ap-northeast-1.amazonaws.com/uploads/post/image/${post.id}/${params.uuid}.jpg`;

    // 参照用URL
    const shareUrl = `https://www.five-movies.net/posts/${params.uuid}`;
    return { movies, post, shareImageUrl, shareUrl };
  },
  data() {
    return {
      dialog: false,
      detailMovie: {},
    };
  },
  methods: {
    openDetailMovie(movie) {
      this.detailMovie = movie;
      this.dialog = true;
    },
    closeDetailMovie() {
      this.dialog = false;
    },
    webShareApi() {
      navigator.share({
        text: `${this.post.name}さんを構成する5本の映画\n${this.movies[0].title}\n${this.movies[1].title}\n${this.movies[2].title}\n${this.movies[3].title}\n${this.movies[4].title}\r\n#私を構成する5本の映画\n#私を構成する映画`,
        url: "",
      });
    },
  },
};
</script>
