import Mock from 'mockjs'

Mock.mock('http://www.localhost.com:3000/test', {
    message: '这是一段mock和axios的测试文字'
})