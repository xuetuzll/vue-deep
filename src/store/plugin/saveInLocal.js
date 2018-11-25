export default store => {
  if(localStorage.state) store.replaceState(JSON.parse(localStorage.state))
  store.subscribe((mutation, state) => {
    localStorage.state = JSON.stringify(state)
  })
}

//store的东西存在内存中，刷新浏览器会被清除。
//每次刷新页面的时候store被初始化
/*
store.subscribe((mutation, state) => {})
每次点击有修改mutation的时候会能提示
用来本地存储修改过mutation的state
store.state赋值是不允许的，使用store提供的方法store.replaceState
使用本地存储，达到持久化存储的效果
*/
