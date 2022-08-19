<template>
  <v-container text-center class="pa-2">
    <CardMovies :movies="movies" @open-modal="openDetailMovie" />
    <CardMovieTitles :movies="movies" @open-modal-title="openDetailMovie" />
    <!-- ニックネーム入力フォーム -->
    <v-card class="mt-5 mr-auto ml-auto pt-2">
      <p class="text-body-2 flex text-center">
        <v-icon small>mdi-information-outline</v-icon>
        共有する時のニックネームを入力してください
      </p>
      <v-card-actions>
        <v-row align="center">
          <v-text-field
            v-model="name"
            label="ニックネーム"
            prepend-icon="mdi-lead-pencil"
            outlined
            counter="10"
            class="ml-3 mr-3"
            :error-messages="errorMessage"
          />
          <v-btn
            color="blue"
            class="ml-sm-3 mr-sm-3 mb-5 ml-auto mr-auto"
            @click="twitterShare"
            :disabled="!name || name.length > 10"
          >
            <v-overlay :value="overlay">
              <p class="text-sm-h1 text-subtitle-2">画像作成中</p>
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
            <v-icon class="mr-2">mdi-twitter</v-icon>結果をツイート
          </v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
    <MovieDetailDialog
      :dialog="dialog"
      :detailMovie="detailMovie"
      @close-modal="closeDetailMovie"
    />
  </v-container>
</template>

<script>
import CardMovies from "../components/card/CardMovies.vue";
import CardMovieTitles from "../components/card/CardMovieTitles.vue";
import MovieDetailDialog from "../components/dialog/MovieDetailDialog.vue";

export default {
  asyncData({ $config: { baseUrl, backendBaseUrl } }) {
    return { baseUrl, backendBaseUrl };
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
      uuid: "",
      overlay: false,
      name: "",
      errorMessage: [],
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
    url() {
      return encodeURIComponent(`${this.baseUrl}/posts/${this.uuid}`);
    },
    textAndHashTag() {
      return encodeURIComponent(
        `${this.name}さんを構成する5本の映画は\n${this.movies[0].title}\n${this.movies[1].title}\n${this.movies[2].title}\n${this.movies[3].title}\n${this.movies[4].title}\nです。\r\n #私を構成する5本の映画 \n #私を構成する映画`
      );
    },
  },
  mounted() {
    this.generateUuid();
  },
  methods: {
    openDetailMovie(movie) {
      this.detailMovie = movie;
      this.dialog = true;
    },
    closeDetailMovie() {
      this.dialog = false;
    },
    // uuidを作成する処理
    generateUuid() {
      const strong = 1000;
      this.uuid =
        new Date().getTime().toString(16) +
        Math.floor(strong * Math.random()).toString(16);
    },
    async createPostImage() {
      const image_paths = this.movies.map(
        (movie) => `http://image.tmdb.org/t/p/w300${movie.poster_path}`
      );
      const movie_ids = this.movies.map((movie) => movie.id);

      try {
        return await this.$axios.post(`${this.backendBaseUrl}/posts`, {
          uuid: this.uuid,
          name: this.name,
          image_paths,
          movie_ids,
        });
      } catch (e) {
        return e.response;
      }
    },
    async twitterShare() {
      this.overlay = true;
      const res = await this.createPostImage();
      this.overlay = false;

      // uuidが一意かどうかを判定
      if (res.status === 422) {
        this.errorMessage = "画像は既に作成されています。";
        return;
      }

      const shareUrl = `https://twitter.com/intent/tweet?text=${this.textAndHashTag}&url=${this.url}`;

      const checkWiondowOpen = window.open(shareUrl);

      // window.open(shareUrl)が作動しない場合はlocation.hrefでページ遷移する
      if (!checkWiondowOpen) location.href = shareUrl;
    },
  },
};
</script>
