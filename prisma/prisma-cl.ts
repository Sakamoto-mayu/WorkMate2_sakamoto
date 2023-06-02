// prismaから直接DBの編集を加えるときに使用する

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // この関数の中に編集を記載する。以下コメントアウトはチュートリアル文。参考に残しています。
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

  // INSERT文
  await prisma.leave_balance.createMany({
    data: [
      { user_email: 'rakus@example.com', paid_leave: 5, harfday_leave: 5, special_leave: 5 },
      { user_email: 'admin@example.com', paid_leave: 5, harfday_leave: 5, special_leave: 5 },
      { user_email: 'member@example.com', paid_leave: 5, harfday_leave: 5, special_leave: 5 }
    ],
    skipDuplicates: true
  })
  await prisma.department.createMany({
    data: [
      { Id: 1, department_name: '人事' },
      { Id: 2, department_name: '総務' },
      { Id: 3, department_name: '開発' }
    ],
    skipDuplicates: true
  })
  await prisma.role.createMany({
    data: [
      { Id: 1, role_name: 'GM' },
      { Id: 2, role_name: 'admin' },
      { Id: 3, role_name: 'member' }
    ],
    skipDuplicates: true
  })
  await prisma.attendance_types.createMany({
    data: [
      { Id: 1, status_name: '出勤' },
      { Id: 2, status_name: '欠勤' },
      { Id: 3, status_name: '有給' },
      { Id: 4, status_name: '半休' },
      { Id: 5, status_name: '特休' }
    ],
    skipDuplicates: true
  })
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
