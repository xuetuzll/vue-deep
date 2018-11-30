import Cookie from 'js-cookie'

export const setTitle = (title) => {
  window.document.title = title || 'admin'
}

export const setToken = (token, tokenName = 'token') => {
  Cookie.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
  return Cookie.get(tokenName)
}

//业务相关的功能，设置title，设置cookie，获取cookie
