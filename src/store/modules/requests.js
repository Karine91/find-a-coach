export default {
  namespaced: true,
  getters: {},
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload)
    }
  },
  state() {
    return {
      requests: []
    }
  },
  actions: {
    contactCoach(context, { email, message, coachId }) {
      const newReq = {
        userEmail: email,
        message,
        coachId,
        id: new Date().toISOString()
      }
      context.commit('addRequest', newReq)
    }
  }
}
