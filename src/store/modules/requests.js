export default {
  namespaced: true,
  getters: {
    requests(state, getters, rootState, rootGetters) {
      const coachId = rootGetters.userId
      return state.requests.filter((req) => req.coachId === coachId)
    },
    hasRequests(state, getters) {
      return !!getters.requests?.length
    }
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.push(payload)
    },
    setRequests(state, payload) {
      state.requests = payload
    }
  },
  state() {
    return {
      requests: []
    }
  },
  actions: {
    async contactCoach(context, { email, message, coachId }) {
      const newReq = {
        userEmail: email,
        message
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/requests/${coachId}.json`, {
        method: 'POST',
        body: JSON.stringify(newReq)
      })
      const resData = await res.json()

      if (!res.ok) {
        const error = new Error(resData.message || 'Failed to send request.')
        throw error
      }
      newReq.id = resData.name
      newReq.coachId = coachId
      context.commit('addRequest', newReq)
    },
    async fetchRequests(context) {
      const coachId = context.rootGetters.userId
      const token = context.rootGetters.token
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/requests/${coachId}.json?auth=${token}`
      )

      const resData = await res.json()

      if (!res.ok) {
        const error = new Error(resData.message || 'Failed to get requests.')
        throw error
      }

      const requests = []

      for (const key in resData) {
        const request = {
          id: key,
          coachId,
          userEmail: resData[key].userEmail,
          message: resData[key].message
        }
        requests.push(request)
      }
      context.commit('setRequests', requests)
    }
  }
}
