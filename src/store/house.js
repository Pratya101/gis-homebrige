export default {
  namespaced: true,
  state: {
    statusUpdateHouse: "",
  },
  mutations: {
    setStatusHouse(state, status) {
      state.statusUpdateHouse = status;
      console.log("udpate house update : ", status);
    },
  },
  actions: {
    updateStatusHouse({ commit }, status) {
      commit("setStatusHouse", status);
    },
  },
  getters: {},
};
