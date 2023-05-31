// prismaから直接DBの編集を加えるときに使用する

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // この関数の中に編集を記載する。以下コメントアウトはチュートリアル文。参考に残しています。
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
  // INSERT文
  //   await prisma.user.create({
  //     data: {
  //       name: 'Alice',
  //       email: 'alice@prisma.io',
  //       posts: {
  //         create: { title: 'Hello World' }
  //       },
  //       profile: {
  //         create: { bio: 'I like turtles' }
  //       }
  //     }
  //   })
  // FIND文
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true
  //   }
  // })
  // UPDATE文
  //   console.dir(allUsers, { depth: null })
  // const post = await prisma.post.update({
  //   where: { id: 1 },
  //   data: { published: true }
  // })
  // console.log(post)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
