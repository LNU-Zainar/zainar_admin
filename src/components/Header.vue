<template>
  <header class="header">
    <div class="header-wrap">
      <div class="collapse-btn" @click="onCollapseBtnClick">
        <i :class="isAsideCollapsed ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
      </div>
      <div class="user-login">
        <i class="iconfont icon-user"></i>
        <template v-if="isLogin">
          <router-link to="/user">{{ user.nickname }}</router-link>
          <a @click="onLogout" class="logout">退出</a>
        </template>
        <template v-else>
          <router-link :to="{
            name: 'login',
            query: {
              from: $route.fullPath
            }
          }">
            登录
          </router-link>
          <span class="sep">/</span>
          <router-link :to="{
            name: 'login',
            query: {
              type: 'signup',
              from: $route.fullPath
            }
          }">
            注册
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['user', 'isAsideCollapsed'])
  },
  data () {
    return {
      routerLinks: [
        {
          to: '/',
          text: '失物招领'
        },
        {
          to: '/map',
          text: '地图查找'
        }
      ]
    }
  },
  methods: {
    onCollapseBtnClick () {
      this.$store.commit('setAsideCollapsed', !this.isAsideCollapsed)
    },
    onLogout () {
      this.$store.dispatch('logout').then(() => {
        const requireAuth = this.$route.matched.some(route => {
          return route.meta.requireAuth
        })
        if (requireAuth) {
          this.$router.push({
            name: 'login',
            query: {
              from: this.$route.fullPath
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  &-wrap {
    display: flex;
    justify-content: space-between;
    height: 50px;
    margin: 0 auto;
    align-items: center;
  }

  a {
    color: rgba($primaryColor, .9);
    transition: color .3s;
    &:hover {
      color: rgba($primaryColor, 1);
    }
  }

  .logo {
    margin-left: 10px;
    font-size: 22px;
    font-weight: bold;
    color: rgba($primaryColor, 1);
  }
}
.collapse-btn {
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background: #eee;
  }
}
.user-login {
  font-size: 14px;
  color: #111;
  a {
    position: relative;
    padding: 0 .3em;
    color: currentColor;
    cursor: pointer;
  }
  .logout {

  }
}
</style>
