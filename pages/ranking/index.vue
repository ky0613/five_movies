<template>
  <v-container>
    <v-card color="yellow" class="mx-auto mb-3">
      <v-card-title class="black--text font-weight-bold text-center pa-1">
        <span class="mx-auto">ランキング</span>
      </v-card-title>
    </v-card>
    <v-card v-for="(movie, i) in movies" :key="movie.id" class="pa-3 mb-2">
      <p class="text-center text-h5">{{ i + 1 }}位</p>
      <v-row justify="center">
        <v-col cols="6" sm="3">
          <v-img
            :src="'http://image.tmdb.org/t/p/w300' + movie.poster_path"
            aspect-ratio="0.67114094"
            width="125"
            class="mx-auto"
          />
        </v-col>
        <!-- タイトル、投稿数、 公開日、 詳細 -->
        <v-col cols="6">
          <v-row class="text-center">
            <v-col cols="12">
              <span class="text-subtitle-1 text-sm-h5 font-weight-bold">
                {{ movie.title }}
              </span>
            </v-col>
            <v-col cols="12">
              <span>
                投稿数:
                <span class="text-sm-subtitle-1">
                  {{ movie.movie_count }}
                </span>
                件
                <br />
                公開日:
                <span class="text-sm-subtitle-1">
                  {{ movie.release_date }}
                </span>
              </span>
            </v-col>
          </v-row>
          <p class="line-clamp text-caption">
            {{ movie.overview }}
          </p>
        </v-col>
        <!-- TMDBの評価 -->
        <v-col cols="12" sm="3" class="text-center">
          <v-row align="center">
            <v-col cols="3" sm="12">
              <v-progress-circular
                :rotate="270"
                :size="54"
                :width="10"
                :value="Number(movie.vote_average) * 10"
                color="yellow"
              >
                {{ Math.floor(Number(movie.vote_average) * 10) }}%
              </v-progress-circular>
            </v-col>
            <v-col cols="4" sm="12">
              <span class="">評価件数 <br />{{ movie.vote_count }}件</span>
            </v-col>
            <v-col cols="5" sm="12">
              <v-btn
                :href="'https://www.themoviedb.org/movie/' + movie.id"
                color="yellow"
                target="_blank"
                class="black--text pa-1"
                small
              >
                詳細(外部リンク)
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $config: { backendBaseUrl }, $axios }) {
    const movies = await $axios.$get(`${backendBaseUrl}/movies/ranking`);
    return { movies };
  },
};
</script>

<style scoped>
.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 制限したい行数が3の場合 */
  overflow: hidden;
}
</style>
