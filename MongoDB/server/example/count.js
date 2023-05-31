//件数取得
db.books.count()

//条件付き件数取得
db.books.count({publisher: "新朝社"})

db.books.find({publisher: "新朝社"}).count()
