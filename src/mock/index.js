import Mock from 'mockjs'
import { Login, GetUserInfo } from './data/user'


Mock.mock(/\/login/, Login)
Mock.mock(/\/user\/info/, GetUserInfo)

export default Mock