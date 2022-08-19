<template>
  <div>
    <v-row justify="center">
      <v-col cols="6" sm="3">
        <v-img
          :src="'http://image.tmdb.org/t/p/w300' + movie.poster_path"
          aspect-ratio="0.67114094"
          :width="imgWidth"
          class="mx-auto"
        />
      </v-col>
      <!-- タイトル、投稿数、 公開日、 詳細 -->
      <v-col cols="6">
        <v-row class="text-center" align="center">
          <v-col cols="12">
            <span class="text-subtitle-1 text-sm-h4 font-weight-bold">
              {{ movie.title }}
            </span>
          </v-col>
          <v-col cols="12" class="text-sm-subtitle-1 text-caption">
            <span v-if="ranking"> 投稿数: {{ movie.movie_count }}件 </span>
            <br />
            <span> 公開日: {{ movie.release_date }} </span>
          </v-col>
          <v-col>
            <span :class="overviewClass">
              {{ movie.overview }}
            </span>
          </v-col>
        </v-row>
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
            <slot />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    ranking: {
      type: Boolean,
      default: false,
    },
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imgWidth() {
      return this.ranking ? 125 : 250;
    },
    overviewClass() {
      return this.ranking
        ? "text-caption line-clamp-3"
        : "text-sm-subtitle-1 text-caption line-clamp-5";
    },
  },
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.line-clamp-5 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
}
</style>
