export const state = () => ({
  movies: [],
});

export const actions = {
  addMovies({ commit }, movie) {
    commit("addMovies", movie);
  },
  deleteMovies({ commit }, movie) {
    commit("deleteMovies", movie);
  },
  updateMovies({ commit }, movies) {
    commit("updateMovies", movies);
  },
  deleteAllMovies({ commit }) {
    commit("deleteAllMovies");
  },
};

export const mutations = {
  addMovies(state, movie) {
    state.movies.push(movie);
  },
  deleteMovies(state, movie) {
    state.movies = state.movies.filter((element) => element.id !== movie.id);
  },
  updateMovies(state, movies) {
    state.movies = movies;
  },
  deleteAllMovies(state) {
    state.movies = [];
  },
};
