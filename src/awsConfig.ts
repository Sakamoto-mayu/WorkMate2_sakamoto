import AWS from 'aws-sdk'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

const BucketName = import.meta.env.VITE_BUCKET_NAME
const bucketRegion = import.meta.env.VITE_REGION
const IdentityPoolId = import.meta.env.VITE_POOL_ID
const IdentityId = import.meta.env.VITE_IDENTIFY_ID

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
    // IdentityId: IdentityId
  })
})

const s3 = new AWS.S3({
  apiVersion: '2014-06-30',
  params: { Bucket: BucketName }
})

export default s3
