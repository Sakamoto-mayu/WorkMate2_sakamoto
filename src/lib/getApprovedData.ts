// DynamoDBから承認済み勤怠データを取得する
export const getApprovedData = async () => {
  const response = await fetch(`https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork?admin=true&gm=true`)
  const attendanceData = await response.json();
  console.log(attendanceData)
  const approvedData = attendanceData.filter((data: any) => data.admin === true && data.gm === true);
  return approvedData;
}
