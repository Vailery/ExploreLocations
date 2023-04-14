import S3 from "aws-sdk/clients/s3";

export const s3 = new S3({
  region: "eu-west-3",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
  },
  signatureVersion: "v4",
});
