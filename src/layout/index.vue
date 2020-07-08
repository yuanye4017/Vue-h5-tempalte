<template>
  <div class="app-wrapper">
    <van-sticky>
      <van-tabs v-model="active" @click="goPage">
        <van-tab title="首页" />
        <van-tab title="图标" />
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
      active: null
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
  created() {
    this.active = this.$store.getters.active
  },
  methods: {
    goPage() {
      this.$store.dispatch('app/changeActive', this.active)
      var path = null
      switch (this.active) {
        case 0 : path = '/home'; break
        case 1 : path = '/icon'; break
        default: path = '/'; break
      }
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
