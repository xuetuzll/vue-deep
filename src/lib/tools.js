//定义几次调用几次
export const doCustomTimes = (times, callback) => {
  let i =- 1
  while (++i <times){
    callback()
  }
}
