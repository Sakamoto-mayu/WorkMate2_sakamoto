## 前提条件

1. postgreSQL で DB を作成し、起動状態であること。
2. １つ以上のテーブルがあること = tmp.sql ファイルを run して api スキーマと user テーブルを作成できます。

## prisma の設定

1. .env ファイルの「DATABASE_URL="postgresql://postgres:postgres@localhost:5432/workmate?schema=api"」を書き換える
   （例）`postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA`
2. `npx prisma db pull　` posgreDB の情報を schema.prisma に同期させる(逆に schema.prisma の情報を DB へ同期させたい時は`npx prisma db push`→ migrate dev のように migration は生成されない)
3. `npx prisma migrate dev` schema.prisma に記述済みのコードを実行。新しくテーブルが生成される。schema.prisma に変更があったら毎度実行する
4. `npx prisma generate`　 PrismaCLI が使えるようになる。テーブルへのインサートなどの役割。schwma.prisma に変更がったときも毎度実行する。
5. `npx ts-node prisma-cl.ts` テーブルに対して insert などができるファイル。このファイルの中に CRUD の代わりの文を書く。コンソールに[]が表示されれば OK。
6. `npx prisma studio` DB の状態を GUI で確認できる。Insert も可能。

## Express の設定

1. `npm run nodemon` server.ts ファイルを実行する
   コンソールに DB listening on port 8000!と表示されれば OK
