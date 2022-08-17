<template>
  <v-container text-center class="pa-2">
    <CardMovies
      :movies="movies"
      :name="post.name"
      @open-modal="openDetailMovie"
    />
    <CardMovieTitles :movies="movies" @open-modal-title="openDetailMovie" />
    <v-btn to="/" class="mt-8">自分も画像を作成する</v-btn>
    <MovieDetailDialog
      :dialog="dialog"
      :detailMovie="detailMovie"
      @close-modal="closeDetailMovie"
    />
  </v-container>
</template>

<script>
import CardMovies from "../../components/card/CardMovies.vue";
import CardMovieTitles from "../../components/card/CardMovieTitles.vue";
import MovieDetailDialog from "../../components/MovieDetailDialog.vue";

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
  components: {
    CardMovies,
    CardMovieTitles,
    MovieDetailDialog,
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
  },
};
</script>
