const state = {
  cachedViews: []
}

const mutations = {
  SET_CASHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    try {
      if (view.meta.cache) {
        state.cachedViews.push(view.name)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const actions = {
  addKeepAlive({ commit }, view) {
    commit('SET_CASHED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
