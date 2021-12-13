<template>
  <div class="login">
    <header class="header">
      <router-link to="/" class="logo"></router-link>
    </header>
    <main class="main">
      <el-form ref="loginForm" :model="loginForm" label-width="80px" :rules="loginFormRules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="loginForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      loginLoading: false,
      loginForm: {
        account: '',
        password: ''
      },
      loginFormRules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.validateForm('loginForm', () => {
        this.loginLoading = true
        this.$store.dispatch('login', {
          uid: this.loginForm.account,
          password: this.loginForm.password
        })
        .then(this.redirectToBack)
        .finally(() => {
          this.loginLoading = false
        })
      })
    },
    onCancel () {
      this.$router.push({
        name: 'index'
      })
    },
    validateForm(refName, callback) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          callback()
        } else {
          return false
        }
      })
    },
    redirectToBack () {
      const { from } = this.$route.query
      if (from) {
        this.$router.replace(decodeURIComponent(from))
      } else {
        this.$router.replace({
          name: 'index'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  margin: 80px 0;
  text-align: center;
}
.main {
  max-width: 400px;
  margin: 50px auto;
}
.logo {
  display: block;
  margin: auto;
  width: 120px;
  height: 30px;
  background: url('../assets/logo.png') no-repeat center / contain;
}
.captcha-img {
  display: inline-block;
  height: 40px;
  width: 110px;
  vertical-align: middle;
  margin: 0 5px;
  background: #eee;
  cursor: pointer;
}
.captcha-input {
  width: 110px;
}
.refresh-btn {
  width: 90px;
}
</style>
