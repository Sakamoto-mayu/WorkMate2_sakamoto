//And条件
db.books.find({
  $and: [{ publisher: '講話社' }, { price: { $gt: 300 } }]
})

//or条件
db.books.find({
  $or: [{ publisher: '講話社' }, { publisher: '角河書店' }]
})

//Not条件
db.books.find({
  price: { $not: { $gt: 500 } }
})

//Not条件(正規表現)
db.books.find({
  publisher: { $not: /講話社/ }
})
