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
        v-if="isNavigator"
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
  async asyncData({ $config: { backendBaseUrl, imageUrl }, $axios, params }) {
    // 映画情報のとOGP用URLの取得
    const data = await $axios.$get(`${backendBaseUrl}/posts/${params.uuid}`);
    const { movies, post } = data;
    const shareImageUrl = `${imageUrl}/uploads/post/image/${post.id}/${post.uuid}.jpg`;

    // 参照用URL
    const shareUrl = `https://www.five-movies.net/posts/${post.uuid}`;
    return { movies, post, shareImageUrl, shareUrl, imageUrl };
  },
  data() {
    return {
      dialog: false,
      detailMovie: {},
    };
  },
  computed: {
    isNavigator() {
      if (navigator.canShare) return true;
      return false;
    },
  },
  methods: {
    openDetailMovie(movie) {
      this.detailMovie = movie;
      this.dialog = true;
    },
    closeDetailMovie() {
      this.dialog = false;
    },
    async webShareApi() {
      const movieTitleList = this.movies.map((movie) => movie.title);
      const { id, uuid, name } = this.post;
      const movieCount = this.movies.length;

      // urlから画像を取り出しFile型に変更
      const url = `${this.imageUrl}/uploads/post/image/${id}/share_${uuid}.jpg`;
      const res = await fetch(url);
      const blob = await res.blob();
      const imageFile = new File([blob], `${uuid}.jpg`, {
        type: "image/jpeg",
      });

      navigator.share({
        text: `${name}さんを構成する${movieCount}本の映画\n${movieTitleList.join(
          "\n"
        )}\r\n#私を構成する${movieCount}本の映画\n#私を構成する映画`,
        url: "",
        files: [imageFile],
      });
    },
  },
};
</script>
