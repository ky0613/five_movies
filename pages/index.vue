<template>
  <v-container class="mt-0 pt-0">
    <!-- 検索フォーム -->
    <v-row
      class="blue-grey darken-3"
      :style="`position: sticky; top: ${headerHeight}; z-index: 300;`"
    >
      <v-text-field
        prepend-icon="mdi-movie-search"
        type="search"
        label="映画検索"
        v-model="query"
        placeholder="検索したい映画を入力"
        height="30"
        @input="debounceSearchMovies"
        class="mt-4 pt-1 mr-3"
        id="searchField"
        solo
        dense
        rounded
      />
      <v-row justify="center" align="center">
        <PreviewDialog />
        <v-switch
          v-model="toggle"
          label="タイトル表示"
          color="yellow"
          class="ml-sm-5 mt-sm-6 ml-3 mt-3"
        />
      </v-row>
    </v-row>
    <!-- 検索結果表示 -->
    <v-row justify="center">
      <v-col v-for="result in results" :key="result.id" cols="6" sm="3">
        <v-card class="mb-2" :style="cardBackground">
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + result.poster_path"
            :lazy-src="'http://image.tmdb.org/t/p/w300/' + result.poster_path"
            @click="handleMovieData(result)"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="blue-grey" />
              </v-row>
            </template>
          </v-img>
          <v-fab-transition>
            <v-btn
              v-if="checkSelectMovie(result)"
              icon
              small
              outlined
              color="black"
              class="yellow"
              fab
              absolute
              bottom
              right
              style=""
            >
              {{ selectMovieIndex(result) }}
            </v-btn>
          </v-fab-transition>
          <div v-if="toggle">
            <v-card-title class="justify-center text-subtitle-2">
              {{ result.title }}
            </v-card-title>
            <v-card-subtitle class="justify-center text-caption text-sm-body-2">
              {{ result.release_date }}
            </v-card-subtitle>
          </div>
        </v-card>
      </v-col>
      <!-- 無限スクロール -->
      <v-col v-if="results.length" cols="12">
        <infinite-loading @infinite="addSearchMovies">
          <span slot="no-more" v-if="isInfinity" class="white--text">
            検索結果は以上です。
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
import PreviewDialog from "../components/preview/PreviewDialog.vue";

export default {
  asyncData({ $config: { backendBaseUrl } }) {
    return { backendBaseUrl };
  },
  name: "TopIndex",
  components: {
    PreviewDialog,
  },
  data() {
    return {
      query: "",
      results: [],
      toggle: false,
      debounce: null,
      page: 1,
      isInfinity: false,
      headerHeight: "",
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies.movies;
    },
    cardBackground() {
      return this.toggle ? "" : "background: rgba(0, 0, 0, 0)";
    },
  },
  mounted() {
    document.getElementById("searchField").focus();
  },
  methods: {
    async getMovieData() {
      const { results } = await this.$axios.$get(
        `${this.backendBaseUrl}/movies/search`,
        {
          params: {
            search_word: this.query,
            page: this.page,
          },
        }
      );

      return results;
    },
    setResults(results) {
      // 画像が設定されているものだけを返す
      const newResults = results.filter((result) => result.poster_path);

      // オブジェクトの重複を防ぐためにMapのインスタンスを作成
      const setNewResults = new Map(
        [...this.results, ...newResults].map((result) => [result.id, result])
      );

      this.results = Array.from(setNewResults.values());
    },
    async getSearchMovies() {
      this.results = [];

      // 検索ワードがないときに初期化
      if (!this.query.length) {
        this.page = 1;
        this.isInfinity = false;
        return;
      }

      // 無限スクロールが有効なら初期化
      if (this.isInfinity) {
        this.page = 1;
        this.isInfinity = false;
      }

      const results = await this.getMovieData();

      this.setResults(results);
    },
    debounceSearchMovies() {
      // デバウンス処理 300msごとに検索する
      if (this.debounce) clearTimeout(this.debounce);
      this.debounce = setTimeout(this.getSearchMovies.bind(this), 300);
    },
    checkSelectMovie(_movie) {
      // 選択した映画の中に同じ映画があるかを判定
      return this.movies.some((movie) => movie.id === _movie.id);
    },
    selectMovieIndex(_movie) {
      const index = this.movies.findIndex((movie) => movie.id === _movie.id);
      return index + 1;
    },
    handleMovieData(movie) {
      if (this.checkSelectMovie(movie)) {
        return this.$store.dispatch("movies/deleteMovies", movie);
      }

      if (this.movies.length === 5) return;

      this.$store.dispatch("movies/addMovies", movie);
    },
    async addSearchMovies($state) {
      try {
        this.page += 1;
        this.isInfinity = true;
        const results = await this.getMovieData();

        setTimeout(() => {
          if (results.length > 0) {
            this.setResults(results);
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
  updated() {
    // fixedの高さを設定するためにheaderの高さを取得
    this.headerHeight = document.querySelector(
      ".v-toolbar__content"
    ).style.height;
  },
};
</script>
