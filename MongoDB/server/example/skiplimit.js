//先頭から指定件数削除
db.books.find().sort({ launch: -1 }).skip(2)

//指定件数削除＋表示件数制限
db.books.find().sort({ launch: -1 }).skip(2).limit(3)
