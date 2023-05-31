//index作成
db.users.createIndex({ email: 1 }, { name: 'IX_EMAIL' })

//index確認
db.users.getIndexes()

//index削除
db.users.dropIndex("IX_EMAIL")
