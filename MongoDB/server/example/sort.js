//昇順asc
db.books.find().sort({ price: 1 })

//降順desc
db.books.find().sort({ price: -1 })

//条件付きソート
db.books.find({ publisher: '新朝社' }).sort({ launch: -1 })



