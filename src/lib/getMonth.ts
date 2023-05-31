function getCalendarArray(year: any, month: any) {
  // 指定した月の最初の日を取得
  const firstDay = new Date(year, month - 1, 1)

  // 最初の日から月の最後の日までの日付を生成
  const lastDay = new Date(year, month, 0)
  const daysInMonth = lastDay.getDate()
  const calendarArray = []

  const weekDays = ['日', '月', '火', '水', '木', '金', '土']

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    const monthDigit = date.getMonth() + 1
    const weekDay = weekDays[date.getDay()]
    calendarArray.push({ day, monthDigit, weekDay })
  }

  return calendarArray
}

export default getCalendarArray

//   // 例: 2023年5月のカレンダーを取得
//   const year = 2023;
//   const month = 6;
//   const calendar = getCalendarArray(year, month);

//   console.log(calendar);
