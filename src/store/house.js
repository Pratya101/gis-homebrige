export default {
  namespaced: true,
  state: {
    statusUpdateHouse: {},
    followData: {},
  },
  mutations: {
    setStatusHouse(state, status) {
      state.statusUpdateHouse = status;
    },
    SET_DATA_FOLLOW_DATA(state, data) {
      state.followData = data;
    },
  },
  actions: {
    updateStatusHouse({ commit }, status) {
      commit("setStatusHouse", status);
    },
    updateFollowData({ commit }, data) {
      commit("SET_DATA_FOLLOW_DATA", data);
    },
  },
  getters: {},
};
