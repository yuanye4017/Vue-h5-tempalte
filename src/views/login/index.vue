<template>
  <div>
    <van-button type="default" @click="login">登陆</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'Login',
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
      loginForm: {
        username: '12',
        password: '12'
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
  created() {},
  mounted() {},
  methods: {
    login() {
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
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

</style>
