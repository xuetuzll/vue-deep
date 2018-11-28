import axios from 'axios'
import { baseURL } from '@/config'

class HttpRequest {
  constructor (baseUrl = baseURL){ //默认会添加的构造函数
    this.baseUrl = baseUrl
    this.queue = {} //把每个请求压入栈里面，当队列里面没有请求，把全局的loading关掉。
  }
  getInsideConfig (){ //获取内部配置,定义全局的配置
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  distory (url){
    delete this.queue[url]
    if(!Object.keys(this.queue).length){
      //Spin.hide()
    }
  }
  interceptors (instance, url){ //全局的拦截器
    instance.interceptors.request.use(config => { //请求拦截器
      //添加请求前的控制，比如全局login
      //Spin.show()
      if(!Object.keys(this.queue).length) //Spin.show()
      //如果队列长度不为0,则加载全局动画
      this.queue[url] = true //传入options的url其中一个
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use(res => { //响应拦截器
      this.distory(url) //响应成功失败都需要删掉
      const { data, status } = res //返回需要的数据
      return { data, status }
    }, error => {
      this.distory(url) //响应成功失败都需要删掉
      return Promise.reject(error)
    })
  }
  request (options){
    //创建实例后创建请求
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)//合并两个为一个
    //相同的属性名后面的会覆盖前面的
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest

//把baseUrl基础路径拆出去，拆到config文件内
//baseUrl = baseURL这种写法前面没有this的
