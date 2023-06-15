// function getMonthlyDate() {
//   // 今日
//   const today = new Date()

//   // 曜日
//   const days = ['日', '月', '火', '水', '木', '金', '土'];
//   // 月初
//   const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
//   // console.log(firstDay)
//   // 月末
//   const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  

//   // 当月の月初から月末までの日付を取得する
//   const currentDate = firstDay
//   const monthlyDatesArray: any = []
//   while (currentDate <= lastDay) {
//     let monthlyDate =
//       currentDate.getFullYear() +
//       '-' +
//       (currentDate.getMonth() + 1).toString().padStart(2, '0') +
//       '-' +
//       currentDate.getDate().toString().padStart(2, '0') +
//       '(' + days[currentDate.getDay()] + ')';
//     monthlyDate = monthlyDatesArray.push(monthlyDate)
//     currentDate.setDate(currentDate.getDate() + 1)
//   }
//   // console.log(monthlyDatesArray)
//   return monthlyDatesArray;
// }
// export default getMonthlyDate
