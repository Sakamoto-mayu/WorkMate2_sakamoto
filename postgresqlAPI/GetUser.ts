import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
const express = require('express')
const router = express.Router()
const app = express()

app.use(express.json()) //リクエストのボディ内のJSONデータを解析し、JavaScriptオブジェクトに変換するためのミドルウェア関数
const prisma = new PrismaClient()

// middleware that is specific to this router
router.get('/', async (req: Request, res: Response) => {
  try {
    const userData = await prisma.user.findMany()
    return res.json(userData)
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('エラーが起きています')
      }
    }
    return res.status(400).json(e)
  }
})

module.exports = router
