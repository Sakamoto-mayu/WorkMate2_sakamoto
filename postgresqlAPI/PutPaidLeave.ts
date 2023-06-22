import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
const express = require('express')
const router = express.Router()
const app = express()

app.use(express.json())
const prisma = new PrismaClient()

// middleware that is specific to this router
router.put('/', async (req: Request, res: Response) => {
  console.log(req.body)
  const { user_email, paid_leave } = req.body
  try {
    const paidLeave = await prisma.leave_balance.update({
      where: { user_email: user_email },
      data: { paid_leave },
    })
    return res.json({ paidLeave })
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
