<template>
  <v-container text-center>
    <v-row v-if="selectItems.length" justify="center">
      <v-col v-for="selectItem in selectItems" :key="selectItem.title">
        <v-img
          :src="'http://image.tmdb.org/t/p/w300/' + selectItem.poster_path"
          max-width="264"
        />
        <v-card-actions @click="removeSelectItems(selectItem)">
          <v-btn>
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    <v-row align-content="center">
      <v-text-field
        prepend-icon="mdi-movie-search"
        type="text"
        label="映画検索"
        v-model="query"
        placeholder="検索したい映画を入力"
        solo
        height="30"
        rounded
        @keypress.enter="getSearch"
      />
      <v-btn
        class="mx-2"
        fab
        dark
        color="orange"
        elevation="1"
        @click="getSearch"
      >
        <v-icon dark>mdi-magnify</v-icon>
      </v-btn>
      <v-label class="my-auto">詳細表示</v-label>
      <v-switch v-model="toggle" />
    </v-row>
    <v-row>
      <v-col v-for="result in results" :key="result.id" cols="12" sm="3">
        <v-card height="100%" class="black--text white">
          <v-img
            :src="'http://image.tmdb.org/t/p/w300/' + result.poster_path"
          ></v-img>
          <v-card-title>{{ result.title }}</v-card-title>
          <v-card-subtitle class="black--text">
            {{ result.release_date }}
          </v-card-subtitle>
          <v-card-actions @click="pushSelectItems(result)">
            <v-btn>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <v-card-text v-if="toggle" class="black--text">
            {{ result.overview }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "TopIndex",
  data() {
    return {
      query: "",
      results: [],
      toggle: false,
      apiKey: "12377f025c32cc81674e287a08dd942e",
      selectItems: [],
    };
  },
  methods: {
    getSearch() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.query}&language=ja`
        )
        .then((response) => {
          this.results = response.data.results;
        });
    },
    pushSelectItems(item) {
      if (this.selectItems <= 5) this.selectItems.push(item);
    },
    removeSelectItems(item) {
      this.selectItems = this.selectItems.filter(
        (selectItem) => selectItem.id !== item.id
      );
    },
  },
};
</script>

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
</style>
