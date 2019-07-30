import Mock from 'mockjs'
const Random = Mock.Random

// 登录
export const Login = req => {
  req = JSON.parse(req.body)
  if (req.name == 'admin') {
    return {
      code: '0',
      data: {
        token: 'spAdmin'
      },
      message: '响应成功'
    }
  } else {
    return {
      code: '0',
      data: {
        name: '管理员',
        token: 'admin'
      },
      message: '响应成功'
    }
  }
}

// 获取用户信息
export const GetUserInfo = req => {
  req = JSON.parse(req.body)
  if (req.token == 'spAdmin') {
    return {
      code: 0,
      data: {
        name: '超级管理员',
        roles: 'spAdmin'
      },
      message: '响应成功'
    }
  } else {
    return {
      code: 0,
      data: {
        name: '管理员',
        roles: 'admin'
      },
      message: '响应成功'
    }
  }
}