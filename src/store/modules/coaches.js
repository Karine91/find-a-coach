export default {
  namespaced: true,
  state: () => ({
    lastFetch: null,
    coaches: [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30
      }
    ]
  }),
  getters: {
    coaches(state) {
      return state.coaches
    },
    hasCoaches(state) {
      return !!state.coaches?.length
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches
      const userId = rootGetters.userId
      return coaches.some((coach) => coach.id === userId)
    },
    shouldUpdate(state) {
      if (!state.lastFetch) {
        return true
      } else {
        const currentTs = new Date().getTime()
        return (currentTs - state.lastFetch) / 1000 > 60
      }
    }
  },
  actions: {
    async registerCoach(context, data) {
      const userId = context.rootGetters.userId
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas
      }

      const token = context.rootGetters.token
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/coaches/${userId}.json?auth=${token}`,
        {
          method: 'PUT',
          body: JSON.stringify(coachData)
        }
      )
      // const data = await res.json()
      if (!res.ok) {
        // error
      }

      context.commit('registerCoach', {
        ...coachData,
        id: userId
      })
    },
    async loadCoaches(context, payload) {
      if (!payload.forceRefresh && !context.getters.shouldUpdate) {
        return
      }
      const res = await fetch(`${import.meta.env.VITE_API_URL}/coaches.json`)
      const resData = await res.json()

      if (!res.ok) {
        const error = new Error(resData.message || 'Failed to fetch.')
        throw error
      }

      const coaches = []
      for (const key in resData) {
        const coachData = {
          firstName: resData[key].firstName,
          lastName: resData[key].lastName,
          description: resData[key].description,
          hourlyRate: resData[key].hourlyRate,
          areas: resData[key].areas,
          id: key
        }
        coaches.push(coachData)
      }

      context.commit('setCoaches', coaches)
      context.commit('setFetchTimestamp')
    }
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload)
    },
    setCoaches(state, payload) {
      state.coaches = payload
    },
    setFetchTimestamp(state) {
      state.lastFetch = new Date().getTime()
    }
  }
}
