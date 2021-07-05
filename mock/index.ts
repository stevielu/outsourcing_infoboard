/*
Copyright (c) 2020 by Stevie. All Rights Reserved.
*/
import path from 'path'
import * as express  from "express";
import * as chalk from 'chalk'
import bodyParser from 'body-parser'
import * as Mock from 'mockjs'
import api, { MockApi } from './modules'

import * as exec from 'child_process'

// 数据接口端口号
export const PORT = 4001
// 前缀
export const PREFIX = '/test'

// 生成API文档
// exec.execSync('apidoc -i ./src/mock/modules -o apidoc/docs/')
// 生成swagger-ui-express数据文件swagger.json
// exec.execSync('apidoc-swagger -i ./src/mock/modules -o apidoc/swagger/')

const app: express.Application = express()
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

// 静态资源拦截
// apiDoc
// app.use('/api-docs', express.static(path.join(__dirname, '../apidoc/docs/')))

// 拦截器
app.use('/', (req, res, next) => {
  const { token } = req.headers
  next()
})

api.forEach((item: MockApi) => {
  app[item.type](
    typeof item.url === 'string'
      ? `${PREFIX}${item.url}`
      : new RegExp(`${PREFIX}${item.url.source}`, 'gi'),
    (req, res) => {
      res.json(Mock.mock(item.data instanceof Function ? item.data(req, res) : item.data))
    }
  )
})

app.listen(PORT, () => {
  console.clear()
  console.log(chalk.gray('\n---------------------------------------------'))
  console.log(
    chalk.gray('\n-'),
    chalk.green(`模拟接口服务已启动，端口号：${PORT}`),
    chalk.gray('         -\n')
  )
  console.log(
    chalk.gray('-'),
    chalk.blue.underline(`http://127.0.0.1:${PORT}/api-docs/index.html`),
    chalk.gray('-\n\n---------------------------------------------\n')
  )
})
