<template>
  <div class="login">
    <div class="login__form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="loginForm.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            <span v-if="isShow">提交</span>
            <van-loading v-else />
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Button, Form, Field, Loading, Toast } from 'vant'
export default {
  name: 'Login',
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Field.name]: Field,
    [Loading.name]: Loading
  },
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
      isShow: true,
      loginForm: {
        username: 'admin',
        password: 'admin'
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    onSubmit(values) {
      this.isShow = false
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          this.isShow = true
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        })
        .catch((error) => {
          this.isShow = true
          Toast.fail('登陆失败，请稍后在试')
          console.log(error)
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('../../assets/login/login.jpeg');
  &__form {
    width: 80%;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  }
}
</style>
