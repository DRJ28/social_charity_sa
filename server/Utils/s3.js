const aws = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, PutObjectCommand } = aws;
const s3 = new aws.S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
// const BUCKET = process.env.AWS_BUCKET;
const BUCKET = process.env.AWS_BUCKET;
module.exports.GetFileObject = async urlKey => {
  console.log("creating command");
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: urlKey,
  });
  const url = await getSignedUrl(s3, command);
  return url;
};

module.exports.UploadToS3 = async file => {
  console.log(process.env.AWS_BUCKET);
  const key = "uploaded" + file.originalname;
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  try {
    console.log("upload will start");
    await s3.send(command);
    console.log("uplaod dones");
    return { key };
  } catch (error) {
    console.log("upload error");
    console.log(error);
    return { error };
  }
};
