// Import required AWS SDK clients and commands for Node.js
// import { QueryCommand } from '@aws-sdk/client-dynamodb'
// import { ddbClient } from './ddbClient'
// import Credentials from '@aws-sdk/types'
import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

// Set the parameters
const params = {
  // TableName: 'workmate-daywork',
  // Key: {"email": 'rakus@example.com' }

  ExpressionAttributeValues: {
    ':e': 'rakus@example.com',
    ':d': '2023-05-25'
  },
  KeyConditionExpression: '#email = :e and #date = :d ',
  ExpressionAttributeNames: {
    '#email': 'email',
    '#date': 'date'
  },
  // FilterExpression: 'contains (Subtitle, :date)',
  TableName: 'workmate-daywork'
}
// export const params = {
//   KeyConditionExpression: 'email = :e and date > :d',
//   //   FilterExpression: 'contains (Subtitle, :topic)',
//   ExpressionAttributeValues: {
//     ':e': { S: 'test@test.com' },
//     ':d': { S: '2023-05-26' },
//     // ':topic': { S: 'SubTitle' }
//   },
//   // ProjectionExpression: 'date',
//   TableName: 'testTable'
// }

export default async function run() {
  // try {
  //   const data = await ddbClient.send(new QueryCommand(params))
  //   if(data.Items?.length)
  //   data.Items.forEach(function (element) {
  //     console.log(element)
  //   })
  //   return data
  // } catch (err) {
  //   console.error(err)
  // }
  // docClient.get(params, function (err, data) {
  //   if (err) {
  //     console.log('Error', err)
  //   } else {
  //     console.log('Success', data.Item)
  //   }
  // })
  docClient.query(params, function (err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Success', data.Items)
    }
  })
}
