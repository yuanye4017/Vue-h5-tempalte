
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
/**
 * 移动端配置rootValue为37.5，意味着750的图需要扩大两倍
 * 为什么使用37.5而不是75  因为vant-ui的标准为37.5 这样可以保证vant-ui不会变形
 * */
module.exports = ({ file }) => {
  return {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: 37.5,
        propList: ['*'],
        minPixelValue: 2
      })
    ]
  }
}
