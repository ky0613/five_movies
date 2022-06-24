export const state = () => ({
  ogp: {
    imgUrl: "",
    siteUrl: "",
  },
});

export const actions = {
  addOgp({ commit }, ogp) {
    commit("addImageUrl", ogp);
  },
};

export const mutations = {
  addOgp(state, ogp) {
    state.ogp.imgUrl = ogp.imgUrl;
    state.ogp.siteUrl = ogp.siteUrl;
  },
};
