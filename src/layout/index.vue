<template>
  <div class="app-wrapper">
    <van-sticky>
      <van-tabs v-model="active" @click="goPage">
        <van-tab title="首页" name="/home" />
        <van-tab title="图标" name="/icon/index" />
        <van-tab title="图表" name="/echart/index" />
      </van-tabs>
    </van-sticky>
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script>
import { Tab, Tabs, Sticky } from 'vant'

export default {
  name: 'Layout',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sticky.name]: Sticky
  },
  data() {
    return {
      active: '/home'
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.keepAlive.cachedViews
    },
    key() {
      return this.$route.path
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        if (route.fullPath.indexOf(this.active) <= -1) {
          this.active = route.path
        }
      },
      immediate: true
    }
  },
  methods: {
    goPage() {
      this.$router.push(this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}
</style>
