//評価演算子
db.books.find({
  publisher: { $regex: /社/ }
})

//短縮記法
db.books.find({
  publisher: /社/
})
