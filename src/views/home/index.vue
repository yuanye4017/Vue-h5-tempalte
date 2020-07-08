<template>
  <div class="home">
    <div class="home__title">
      <van-cell-group>
        <van-cell v-for="item in list" :key="item" :title="item" icon="success" />
      </van-cell-group>
    </div>
    <div class="home__logout">
      <van-button type="warning" @click="logout">退出按钮</van-button>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Button, Icon } from 'vant'
export default {
  name: 'Home',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  data() {
    return {
      list: ['@vue/cli 4.x', '配置多环境变量', 'vant-ui按需加载', '移动端适配', 'scss全局变量', 'Vuex状态管理', 'Vuex本地持久化', 'Vue-router', 'Axios封装和接口统一管理', 'vue.config.js自定义配置', 'SvgIcon封装', 'splitChunks实现路由分割', 'PostCss自动增加浏览器后缀', '基于plop自动生成模版']
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style scoped lang="scss">
.home__title {
  .van-cell__title {
    text-align: left;
  }
}
</style>
