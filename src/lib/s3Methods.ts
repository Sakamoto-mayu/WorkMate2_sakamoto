import AWS from 'aws-sdk'
import s3 from "../awsConfig"
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

// const BucketName = import.meta.env.VITE_BUCKET_NAME
// const bucketRegion = import.meta.env.VITE_REGION
// const IdentityPoolId = import.meta.env.VITE_POOL_ID
// const IdentityId = import.meta.env.VITE_IDENTIFY_ID

// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId,
//     // IdentityId: IdentityId
//   })
// })

// const s3 = new AWS.S3({
//   apiVersion: '2014-06-30',
//   params: { Bucket: BucketName }
// })


async function saveCsvToS3(file: File) {
  try {
    const uploadParams = {
      Bucket: "workmate-s3",
      Key: file.name,
      Body: file,
      ContentType: 'text/csv'
    }

    // const command = new PutObjectCommand({
    //   Bucket: 'workmate-s3',
    //   Key: file.name,
    //   Body: file,
    //   ContentType: 'text/csv'
    // })

    // console.log(uploadParams)

    // client.send(command)
    await s3.upload(uploadParams).promise()
    console.log('CSVファイルがS3に保存されました。')
  } catch (error) {
    console.error('CSVファイルの保存中にエラーが発生しました:', error)
  }
}

export  {saveCsvToS3, s3}
