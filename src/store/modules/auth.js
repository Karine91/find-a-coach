let timer

export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
      didAutoLogout: false
    }
  },
  getters: {
    userId(state) {
      return state.userId
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    },
    didAutoLogout(state) {
      return state.didAutoLogout
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token
      state.userId = payload.userId
      state.didAutoLogout = false
    },
    setAutoLogout(state) {
      state.didAutoLogout = true
    }
  },
  actions: {
    async login(context, payload) {
      return context.dispatch('auth', { ...payload, mode: 'login' })
    },
    async signup(context, payload) {
      return context.dispatch('auth', { ...payload, mode: 'signup' })
    },
    logout(context) {
      context.commit('setUser', {
        token: null,
        userId: null
      })
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('tokenExpiration')

      clearTimeout(timer)
    },
    async auth(context, payload) {
      const mode = payload.mode
      let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_FIREBASE_API_KEY}`

      if (mode === 'signup') {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${import.meta.env.VITE_FIREBASE_API_KEY}`
      }

      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      })

      const resData = await res.json()
      if (!res.ok) {
        console.log(resData)
        const error = new Error(resData.message || 'Failed to authenticate.')
        throw error
      }

      const expiresIn = +resData.expiresIn * 1000
      const expirationData = new Date().getTime() + expiresIn

      localStorage.setItem('token', resData.idToken)
      localStorage.setItem('userId', resData.localId)
      localStorage.setItem('tokenExpiration', expirationData)

      timer = setTimeout(function () {
        context.dispatch('autoLogout')
      }, expiresIn)

      context.commit('setUser', {
        token: resData.idToken,
        userId: resData.localId
      })
    },
    tryLogin(context) {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      const tokenExpiration = localStorage.getItem('tokenExpiration')

      const expiresIn = +tokenExpiration - new Date().getTime()

      if (expiresIn < 0) {
        return
      }

      timer = setTimeout(function () {
        context.dispatch('autoLogout')
      }, expiresIn)

      if (token && userId) {
        context.commit('setUser', {
          token,
          userId
        })
      }
    },
    autoLogout(context) {
      context.dispatch('logout')
      context.commit('setAutoLogout')
    }
  }
}
