import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import { version } from '../../package.json'

const adapter = new LocalStorage(`careyshop-${version}`)
const db = low(adapter)

// 初始化数据库
db.defaults({
  themeActiveName: [],
  pageOpenedList: [],
  userInfo: [],
  isMenuAsideCollapse: [],
  database: [],
  databasePublic: {}
}).write()

export default db
