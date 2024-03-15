export default {
  namespaced: true,
  state: () => ({
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
    }
  },
  actions: {
    registerCoach(context, data) {
      const coachData = {
        firstName: data.first,
        lastName: data.last,
        description: data.desc,
        hourlyRate: data.rate,
        areas: data.areas,
        id: context.rootGetters.userId
      }
      context.commit('registerCoach', coachData)
    }
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.push(payload)
    }
  }
}
