// const aws = require("aws-sdk/clients/s3");
const aws = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand, PutObjectCommand } = aws;
const s3 = new aws.S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "AKIAW3GVLVR3HYUDEX5C",
    secretAccessKey: "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",
  },
});
// const BUCKET = process.env.AWS_BUCKET;
const BUCKET = "demo-test-hack";
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
  const key = "uploaded" + file.originalname;
  debugger;
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
