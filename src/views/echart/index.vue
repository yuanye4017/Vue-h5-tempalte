<template>
  <div class="chart-container">
    <div class="chart-container__item">
      <bar-echart height="100%" width="100%" />
    </div>
    <div class="chart-container__item">
      <line-echart id="bar" height="100%" width="100%" />
    </div>
  </div>
</template>

<script>
import BarEchart from '@/components/Echart/BarEchart'
import LineEchart from '@/components/Echart/LineEchart'
export default {
  name: 'Echart',
  components: { BarEchart, LineEchart },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .chart-container__item {
    height: 48%;
    width: 100%;
  }
}
</style>
