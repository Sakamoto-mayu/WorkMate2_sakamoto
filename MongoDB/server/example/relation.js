//等しい
db.books.find({
    publisher: {$eq: "講話社"}
})

//以外
db.books.find({
    publisher: {$ne: "講話社"}
})

//条件より多い
db.books.find({
    price: {$gt: 454}
})

//条件以上
db.books.find({
    price: {$gte: 454}
})

//条件未満
db.books.find({
    price: {$lt: 454}
})

//条件以下
db.books.find({
    price: {$lte: 454}
})

//条件いずれか
db.books.find({
    publisher: {$in: ["講話社","角河書店"]}
})

//条件日付より新しい
db.books.find({
    launch: {$gt: ISODate("2003-01-01T00:00:00+09:00")}
})
