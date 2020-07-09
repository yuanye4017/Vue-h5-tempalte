<template>
  <div class="icon">
    <div v-for="item in svgIcons" :key="item" class="icon__item">
      <svg-icon :icon-class="item" />
    </div>
    <div class="icon__logout">
      <van-button type="warning" @click="logout">退出按钮</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'
export default {
  name: 'SvgIcons',
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      svgIcons: null
    }
  },
  created() {
    const req = require.context('../../icons/svg', false, /\.svg$/)
    const re = /\.\/(.*)\.svg/
    this.svgIcons = req.keys().map(i => {
      return i.match(re)[1]
    })
  },
  mounted() {},
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: flex;
  flex-wrap: wrap;
  &__item {
    padding: 8px;
  }
}
</style>
