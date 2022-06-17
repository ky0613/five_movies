export const state = () => {
  movies: [];
};

export const mutations = {
  add(state, movies) {
    state.movies = movies;
  },
};
