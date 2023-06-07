## AWS 通信の方法

### データ送信
```
URL : https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork
method : PUT
headers : 'Content-Type': 'application/json'
body : JSON.stringify({
      email: String,
      month: String,
      date: String,
      day: String,
      status: String,
      clockIn: String,
      clockOut: String,
      rest: String,
      admin: Boolean,
      gm: Boolean,
      department: String
    })
```
使用するコードは[DayWork.vue]に記載済み

### データ取得方法
```
URL : https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork
method : POST
body : JSON.stringify({
      email: String,
      month: String,
      status: String,
      department: String,
      date : String
    })

bodyが検索項目です。
どの組み合わせでも検索できるので使う項目だけ抜粋して使用してください。
ほかに追加して欲しい場合は対応します。
```
