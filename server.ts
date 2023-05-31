// express実行ファイル。npm run expressで実行。
// localhost:8000使用
// postgresqlAPIフォルダに各APIをモジュール化して使用する想定

import express from 'express'
const app = express()
const port = 8000

// CORS設定
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173') // リクエストを許可するオリジンを指定
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE') // 許可するHTTPメソッドを指定
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type') // 許可するリクエストヘッダーを指定
  next()
})

//リクエストのボディ内のJSONデータを解析し、JavaScriptオブジェクトに変換するためのミドルウェア関数
app.use(express.json())

// 各APIモジュールのインポート
// const PostUserRegister = require('./postgresqlAPI/PostUserRegister')
// const GetUser = require('./postgresqlAPI/GetUser')
const PostDayWork = require('./postgresqlAPI/PostDayWork')
const GetAttendanceData = require('./postgresqlAPI/GetAttendanceData')
const CheckDuplicateData = require('./postgresqlAPI/CheckDuplicateData')

// app.use(/Localhost8000以降のパス指定, importしたモジュール名)
// app.use('/PostUserRegister', PostUserRegister)
// app.use('/GetUser', GetUser)
app.use('/PostDayWork', PostDayWork)
app.use('/GetAttendanceData', GetAttendanceData)
app.use('/CheckDuplicatedata', CheckDuplicateData)

app.listen(port, () => console.log(`DB listening on port ${port}!`))

// app.get('/about', (req: Request, res: Response) => res.send('Hello World!'))
// app.get('/users', (req: Request, res: Response) => console.log('リクエストパラム', req.params))

// app.get('/users', async (req: Request, res: Response) => {
//   const users = await prisma.user.findMany()
//   return res.json(users)
// })

// app.post('/users', async (req: Request, res: Response) => {
//   const { name, email } = req.body
//   try {
//     const user = await prisma.user.create({ data: { name, email } })
//     return res.json({ user })
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       if (e.code === 'P2002') {
//         console.log('emailが重複しています')
//       }
//     }
//     return res.status(400).json(e)
//   }
// })
