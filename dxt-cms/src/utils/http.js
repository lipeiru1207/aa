// import Vue from 'vue'
import axios from 'axios'

let instance=axios.create({
  timeout:3000
})
//请求拦截
instance.interceptors.request.use((config)=>{
  if(process.env.NODE_ENV=='production'){
    config.baseURL='https://eip.btte.net'
  }else{
    config.baseURL='http://localhost:8080'
  }

  return config
},(err)=>{
  return Promise.reject('err')
})
//响应拦截
instance.interceptors.response.use((response)=>{
  if(response.status==200){
    return response.data
  }else{
    return Promise.reject(response)
  }
  return response
},(err)=>{
  return 'ERR'
})
//vue插件
let httpPlugin={
  install(Vue){
    Object.defineProperty(Vue.prototype,'$http',{
      value:instance
    })
  }
}
//挂载  防止$http在将来会被覆盖
// Object.defineProperty(Vue.prototype,'$http',{
//   value:instance
// })
export {instance}   //不是默认抛出用{}抛出
export default httpPlugin
