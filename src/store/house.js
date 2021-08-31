export default {
  namespaced: true,
  state: {
    statusUpdateHouse: {},
    followData: {},
    searDataReport: {},
  },
  mutations: {
    SET_SEARCH_DATA_REPORT(state, data) {
      state.searDataReport = data;
    },
    setStatusHouse(state, status) {
      state.statusUpdateHouse = status;
    },
    SET_DATA_FOLLOW_DATA(state, data) {
      state.followData = data;
    },
  },
  actions: {
    updateSearchDataReport({ commit }, data) {
      commit("SET_SEARCH_DATA_REPORT", data);
    },
    updateStatusHouse({ commit }, status) {
      commit("setStatusHouse", status);
    },
    updateFollowData({ commit }, data) {
      commit("SET_DATA_FOLLOW_DATA", data);
    },
  },
  getters: {},
};
