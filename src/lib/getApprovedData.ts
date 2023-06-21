// DynamoDBから承認済み勤怠データを取得する
export const getApprovedDataByGM = async () => {
  const response = await fetch(`https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork`, {
    method: 'POST',
    body: JSON.stringify({
      admin: true,
      gm: true
    })
  })
  const approvedData = await response.json();
  console.log(approvedData.Items)
  return approvedData.Items;
}

export const getApprovedDataByGAD = async () => {
  const response = await fetch(`https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork`, {
    method: 'POST',
    body: JSON.stringify({
      admin: true,
      gm: false,
      department: '総務'
    })
  })
  const approvedData = await response.json();
  console.log(approvedData.Items)
  return approvedData.Items;
}

export const getApprovedDataByHRD = async () => {
  const response = await fetch(`https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork`, {
    method: 'POST',
    body: JSON.stringify({
      admin: true,
      gm: false,
      department: '人事'
    })
  })
  const approvedData = await response.json();
  console.log(approvedData.Items)
  return approvedData.Items;
}

export const getApprovedDataByDD = async () => {
  const response = await fetch(`https://td2a0be3bj.execute-api.us-east-2.amazonaws.com/daywork`, {
    method: 'POST',
    body: JSON.stringify({
      admin: true,
      gm: false,
      department: '開発'
    })
  })
  const approvedData = await response.json();
  console.log(approvedData.Items)
  return approvedData.Items;
}
