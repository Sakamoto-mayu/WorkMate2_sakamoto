import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
const express = require('express')
const router = express.Router()
const app = express()

app.use(express.json())
const prisma = new PrismaClient()

// middleware that is specific to this router
router.get('/', async (req: Request, res: Response) => {
  console.log(req.body)
  const { email, date } = req.body
  try {
    const dayWork = await prisma.attendance.create({ data: { email, date } })
    return res.json({ dayWork })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('エラーが発生しました')
      }
    }
    return res.status(400).json(e)
  }
})

module.exports = router
