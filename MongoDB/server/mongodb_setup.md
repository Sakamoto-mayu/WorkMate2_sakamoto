## MongoDB 導入・準備

### 導入

それぞれ OS 毎に導入方法が違うので、下記のサイトを参照して導入してください

Mac
https://reffect.co.jp/windows/mac-mongodb-install

Windows
http://web.sfc.wide.ad.jp/~tinaba/tutorials/mongo-win/index.html

### 準備

WorkMate/server 直下に data フォルダと log フォルダを作成してください。

## MongoDB サーバー起動方法

`mongod --config "MongoDB/server/mongod.cfg"`
URL は絶対パスでもいけるはず

## MongoDB クライアント準備

`mongo` コマンドで起動。

`use userData` で userDataDB を作成・移動。

`db.createCollection('users')` で users コレクションを作成。<br>
`show collections` で作成済みのコレクション一覧を取得できる。

`db.users.createIndex({ email: 1 }, { name: 'IX_EMAIL', unique: true })`<br>
を実行し email をユニークキーに設定。

`db.users.insertMany([{email: "rakus@example.com",password: "rakus123",name: "ラクス太郎",department:"総務",role:"GM"},{email: "admin@example.com",password: "admin123",name: "ラクス次郎",department:"人事",role:"admin"},{email: "member@example.com",password: "member123",name: "ラクス三郎",department:"人事",role:"member"}])`<br>
を実行しサンプルデータを挿入。<br>
`db.users.find().pretty()`でコレクション内のデータを取得できる。

上記の手順で作成後、次回以降の起動時は下記のコマンドで起動、直接 DB にアクセスできます。<br>
`mongo 127.0.0.1:27017/userData`

## アプリと接続する

`npm start`で localhost:3000 で mongoDB との接続が開始されます。
