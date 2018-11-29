export default {
  functional: true, //注意这个别拼错
  props: {
    number: Number,
    renderFunc: Function
  },
  render: (h, ctx) => {
return ctx.props.renderFunc(h, ctx.props.number)
  }
}

//函数式组件，只给它传入数据不做任何响应式的操作，
//不监听传递给它的状态，没有生命周期的钩子函数，
//只是作为接受参数的函数，
//当functional为true的时候，说明没有状态组件，没有实例，就是普通的对象
//当把这个对象引入到作为组件去用的时候，vue把它做处理
//vue会用render函数逻辑把里面的放回的虚拟节点做一个渲染

//render放回的实际上是用户传过来的render
//第一个参数是函数，第二个参数是实例，函数式组件没有实例，指代整个对象。
//如何把值传出去，就是直接需要的数据放到函数内

//函数式组件的目的是把用户需要的数据，渲染处理（特殊显示处理）。

//它的方式functional：true，props放入需要渲染的数据渲染函数
//render属性导出渲染函数包裹实例的数据。
