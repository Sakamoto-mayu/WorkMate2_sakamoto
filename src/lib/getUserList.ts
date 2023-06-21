// ユーザー情報を取得する(mongoDB)
export const getUserList = async () => {
    try {
        const response = await fetch(`http://localhost:3000/userData?email=*`)
        const userList = await response.json();
        // console.log(userList)
        return userList
    } catch (error) {
        console.log('失敗', error)
    }
}
