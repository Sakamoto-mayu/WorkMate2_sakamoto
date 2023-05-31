//配列内条件一致
db.books.find({
  categories: {
    $elemMatch: { $eq: '日本文学' }
  }
})

db.books.find({
  categories: '日本文学'
})

db.users.find({
  bookshelf: {
    $elemMatch: {
      status: '読了',
      readed: { $gte: ISODate('2018-02-01T00:00:00+09:00') }
    }
  }
})

db.users.find({
  'bookshelf.status': '読了'
})

//配列長さ指定
db.books.find({
  categories: {
    $size: 3
  }
})

//配列長さ指定(アグリゲーション)
db.books.find({
  $expr: {
    $gt: [{ $size: '$categories' }, 1]
  }
})
