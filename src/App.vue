<template>
  <div id="app" :class="{'hide-aside': isLoginLayout || isAsideCollapsed}">
    <vue-progress-bar></vue-progress-bar>
    <aside class="app-aside">
      <router-link to="/" class="logo">Zainar</router-link>
      <nav class="aside-nav">
        <ul class="aside-nav-list">
          <li v-for="link in routerLinks" :key="link.text">
            <router-link :to="link.to">
              <i :class="['iconfont', 'icon-' + link.icon]"></i>
              {{link.text}}
            </router-link>
          </li>
        </ul>
      </nav>
      
      <div class="aside-bottom">
        &copy; 2021 Zainar.
      </div>
    </aside>
    <main class="app-main">
      <Header v-if="!isLoginLayout"/>
      <router-view class="router-view"></router-view>
    </main>

    <el-dialog
      title="帖子详情"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="50%">
      <el-page-header slot="title" @back="handleBack" content="帖子详情">
        <div>关闭</div>
      </el-page-header>
      <PostDetail/>
    </el-dialog>
  </div>
</template>

<script>
import Header from '@/components/Header'
import PostDetail from '@/components/PostDetail'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Header,
    PostDetail
  },
  data () {
    return {
      routerLinks: [
        {
          text: '用户管理',
          to: '/user',
          icon: 'user'
        },
        {
          text: '地点管理',
          to: '/location',
          icon: 'location'
        },
        {
          text: '分类管理',
          to: '/category',
          icon: 'category'
        },
        {
          text: '招领管理',
          to: '/list',
          icon: 'sad'
        }
      ]
    }
  },
  computed: {
    ...mapState(['isAsideCollapsed']),
    isLoginLayout () {
      return this.$route.name === 'login'
    },
    dialogVisible () {
      return this.$route.name === 'post' || this.$route.name === 'user-post'
    }
  },
  methods: {
    handleBack () {
      let parentRoute = null
      this.$route.matched.some(route => {
        if (route.name === this.$route.name) {
          return true
        } else {
          parentRoute = route
        }
      })
      this.$router.replace(parentRoute)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-aside {
  position: fixed;
  display: flex;
  flex-direction: column;
  z-index: 9;
  left: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background: rgba($primaryColor, 0.1);
}
.app-main {
  margin-left: 200px;
}
.logo {
  display: block;
  margin: 50px 0;
  font-size: 22px;
  font-weight: bold;
  color: rgba($primaryColor, 1);
  text-align: center;
}
.aside-nav {
  flex: 1 0 auto;
  &-list {
    li {
      line-height: 50px;
    }
    a {
      position: relative;
      line-height: 50px;
      display: block;
      padding-left: 50px;
      transition: all .3s;
      color: #333;
      font-weight: bold;

      &:after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 8px;
          width: 4px;
          height: 4px;
          border-radius: 4px;
          background: $primaryColor;
          opacity: 0;
        }

      &.router-link-exact-active  {
        color: rgba($primaryColor, 1);
        &:after {
          opacity: 1;
        }
      }
    }
  }
}
.aside-bottom {
  padding: 30px 0;
  text-align: center;
}
.router-view {
  max-width: $wrapWidth;
  margin: 30px auto;
}
.hide-aside {
  .app-aside {
    display: none;
  }
  .app-main {
    margin-left: 0;
  }
}
</style>
