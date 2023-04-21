import { S3 } from "@aws-sdk/client-s3";
import { fromSSO } from "@aws-sdk/credential-providers";
import type { AwsCredentialIdentity, Provider } from "@aws-sdk/types";

const getCredentials = ():
  | AwsCredentialIdentity
  | Provider<AwsCredentialIdentity> => {
  if (
    process.env.AWS_ACCESS_KEY == null &&
    process.env.AWS_SECRET_KEY == null
  ) {
    return fromSSO({
      profile: process.env.AWS_SSO_PROFILE,
    });
  } else {
    return {
      accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
      secretAccessKey: process.env.AWS_SECRET_KEY ?? "",
    };
  }
};

export const s3 = new S3({
  region: process.env.AWS_SSO_REGION,
  credentials: getCredentials(),
});
