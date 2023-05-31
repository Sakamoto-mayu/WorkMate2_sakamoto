//uniqueIndex作成
db.users.createIndex({ email: 1 }, { name: 'IX_EMAIL', unique: true })

//index削除
db.users.dropIndex("IX_EMAIL")
