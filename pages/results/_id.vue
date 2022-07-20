<template>
  <v-container text-center class="pa-2">
    <v-card class="white" rounded="lg" id="capture">
      <v-card-title
        class="black--text pt-4 mb-4 justify-center font-weight-bold text-h3"
      >
        #私を構成する5本の映画
      </v-card-title>
      <v-row v-if="movies.length" class="justify-center pb-10 mb-6" no-gutters>
        <v-col
          v-for="movie in movies"
          :key="`img-${movie.id}`"
          align-self="center"
          cols="2"
        >
          <v-img
            :src="'http://image.tmdb.org/t/p/w300' + movie.poster_path"
            max-height="270"
            @click="openDetailMovie(movie)"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-card color="white">
      <v-card-subtitle class="black--text">
        私を構成する5本の映画は,
        <a @click="openDetailMovie(movies[0])">『{{ movies[0].title }}』</a>,
        <a @click="openDetailMovie(movies[1])">『{{ movies[1].title }}』</a>,
        <a @click="openDetailMovie(movies[2])">『{{ movies[2].title }}』</a>,
        <a @click="openDetailMovie(movies[3])">『{{ movies[3].title }}』</a>,
        <a @click="openDetailMovie(movies[4])">『{{ movies[4].title }}』</a
        >です。
      </v-card-subtitle>
    </v-card>
    <v-btn to="/" class="mt-8">自分も画像を作成する</v-btn>
    <v-dialog v-model="dialog" width="60%">
      <v-card width="100%">
        <v-row>
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + detailMovie.poster_path"
          />
          <v-col align-self="center" width="800">
            <v-card-title class="mb-6 text-sm-h4">
              {{ detailMovie.title }}
            </v-card-title>
            <v-card-subtitle>
              公開日: {{ detailMovie.release_date }}
            </v-card-subtitle>
            <v-progress-circular
              :rotate="270"
              :size="64"
              :width="10"
              :value="Number(detailMovie.vote_average) * 10"
              color="green"
              class="ml-4 ml-sm-10"
            >
              {{ Number(detailMovie.vote_average) * 10 }}%
            </v-progress-circular>
            <v-card-subtitle class="mb-6">
              評価件数: {{ detailMovie.vote_count }}
            </v-card-subtitle>
            <v-card-actions class="mb-4 mb-sm-0">
              <v-row class="justify-end">
                <v-btn
                  :href="'https://www.themoviedb.org/movie/' + detailMovie.id"
                  color="green"
                  target="_blank"
                  class="mr-3 mb-4"
                >
                  詳細(外部リンク)
                </v-btn>
                <v-btn class="blue mr-3 mb-4" @click="closeDetailMovie">
                  閉じる
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
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
          content: this.shareImgUrl,
        },
      ],
    };
  },
  async asyncData({
    $config: { apiKey },
    query,
    $axios,
    $fire,
    params,
    route,
  }) {
    // 映画情報の取得
    const movieIds = Object.keys(query).map((key) => query[key]);
    const fetchMovieList = movieIds.map((movieId) =>
      $axios.$get(`https://api.themoviedb.org/3/movie/${movieId}`, {
        params: {
          api_key: apiKey,
          append_to_response: "videos",
          language: "ja",
        },
      })
    );
    const movies = await Promise.all(fetchMovieList);

    // 画像URLの取得
    const storageRef = $fire.storage.ref(`images/${params.id}.png`);
    const shareImgUrl = await storageRef.getDownloadURL();

    // 参照用URL
    const shareUrl = `https://www.five-movies.net/${route.fullPath}`;
    return { movies, shareImgUrl, shareUrl };
  },
  data() {
    return {
      dialog: false,
      detailMovie: {},
      img: null,
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
