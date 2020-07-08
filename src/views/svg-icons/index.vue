<template>
  <div class="icon">
    <div v-for="item in svgIcons" :key="item" class="icon__item">
      <svg-icon :icon-class="item" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvgIcons',
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
  methods: {}
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
