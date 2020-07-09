import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

/**
 * 获取modules下所有的模块
 * require.context函数接受三个参数 1.读取文件的路径 2.是否遍历文件的子目录 3.匹配文件的正则
 * /\.js$/ 以.js结尾的文件
 * 返回是一个函数，是该文件夹下的匹配文件的执行环境
 * 该函数有三个属性
 * 1.resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径
 * 2.keys {Function} -返回匹配成功模块的名字组成的数组
*/
const modulesFiles = require.context('./modules', true, /\.js$/)

Vue.use(Vuex)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app' 将后缀.js 去掉
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 返回这个匹配文件相对于整个工程的相对路径
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters
})

export default store
