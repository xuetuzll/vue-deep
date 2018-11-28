export const baseURL = process.env.NODE_ENV === 'production'
   ? 'http://production.com'
   : 'http://localhost:4000'

 //定义基础路径的时候，根据是否是生产环境判断，再根据是否有服务端代理
