import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './common/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    isAsideCollapsed: false
  },
  getters: {
    isLogin (state) {
      return Boolean(Object.keys(state.user).length)
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = {
        id: data.uid,
        nickname: data.nickname,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
        desc: data.desc
      }
    },
    clearUser (state) {
      state.user = {}
    },
    setAsideCollapsed (state, isAsideCollapsed) {
      state.isAsideCollapsed = isAsideCollapsed
    }
  },
  actions: {
    login (context, data) {
      return new Promise((resolve, reject) => {
        api.login(data).then(data => {
          context.commit('setUser', data)
          resolve(data)
        }, reject)
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        api.logout().then(data => {
          commit('clearUser')
          resolve(data)
        }, reject)
      })
    },
    queryUser (context) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(null, {
          notifyType: ''
        }).then(data => {
          context.commit('setUser', data)
          resolve(data)
        }, reject)
      })
    }
  }
})

export default store
