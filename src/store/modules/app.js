const state = {
  active: 0
}

const mutations = {
  SET_ACTIVE: (state, active) => {
    state.active = active
  }
}

const actions = {
  changeActive({ commit }, active) {
    commit('SET_ACTIVE', active)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
