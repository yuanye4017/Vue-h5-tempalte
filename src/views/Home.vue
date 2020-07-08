<template>
  <div class="home">
    首页
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button } from 'vant'
export default {
  name: 'Home',
  components: {
    [Button.name]: Button
  }
}
</script>

<style scoped lang="scss">
.home {
  font-size: 12px;
}
</style>
