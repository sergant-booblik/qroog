import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const s3 = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: process.env.S3_ENDPOINT!,
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export const uploadToS3 = async (file: Express.Multer.File, userId: number): Promise<string> => {
  if (!file) throw new Error('File is required');

  const fileStream = fs.createReadStream(file.path);
  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;
  const key = `uploads/${userId}/${fileName}`;

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
    Body: fileStream,
    ContentType: file.mimetype,
    ACL: ObjectCannedACL.public_read,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `${process.env.S3_STORAGE_URL}${process.env.S3_BUCKET_NAME}/${key}`;
};
