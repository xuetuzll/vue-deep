var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

//本来是在数据库里拿数据的
const getPasswordByName = (name) => {
  return { password: '123' }
}

router.post('/getUserInfo', function(req, res, next) {
  res.status(200).send({
    code: 200,
    data: {
      name: 'Lison'
    }
  })
});

router.post('/login', function(req, res, next) {
  const { userName, password } = req.body
  if (userName) {
    const userInfo = password ? getPasswordByName(userName) : ''
    if (!userInfo || !password || userInfo.password !== password) {
      res.status(401).send({
        code: 401,
        mes: 'user name or password is wrong',
        data: {}
      })
    } else {
      res.send({
        code: 200,
        mes: 'success',
        data: {
          token: jwt.sign({ name: userName }, 'abcd', {
            expiresIn: 60
          })
        }
      })
    }
  } else {
    res.status(401).send({
      code: 401,
      mes: 'user name is empty',
      data: {}
    })
  }
});

module.exports = router;

//token是通过jsonwebtoken生成token，
//参数1可以传对象，第二个字段加密信息，第三个参数过期时间