export default {
  namespaced: true,
  state: {
    statusUpdateHouse: "",
  },
  mutations: {
    setStatusHouse(state, status) {
      state.statusUpdateHouse = status;
    },
  },
  actions: {
    updateStatusHouse({ commit }, status) {
      commit("setStatusHouse", status);
    },
  },
  getters: {},
};
