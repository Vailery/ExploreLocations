# Database setup

After you have been granted access to aws (root user should add you to dev group), you need to setup aws sso authorization, also you need to set database url from `.env.example` file (for deploy to Versel you need tokens `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

## AWS SSO AUTHORIZATION

### 1. Install AWS CLI

Mac - `brew install awscli`

### 2. Login in AWS CLI using SSO

[Original instruction](https://github.com/awsdocs/aws-cli-user-guide/blob/main/doc_source/cli-configure-sso.md)

1. run `aws configure sso`

   name: whatever you want \
   start url: https://d-906790c849.awsapps.com/start \
   region: us-east-1 \
   the rest: skip \

   copy sso profile and add to `.env` \
   `AWS_SSO_PROFILE` \
   `AWS_SSO_REGION="eu-west-3"`

In VSCode (optional)

1. Install `AWS Toolkit` extension
2. In AWS menu Add Connection and select existing one (the one you added with SSO CLI)
3. VSCode command line : `> AWS: Show or Hide regions`
   make sure `eu-west-3` is checked

---

The next step is to run the docker command `docker-compose up db`.

The next command will be `npx prisma migrate dev` for start migration (if you didn't have any migrations at all before you can view all the nuances about their creation on [this site](https://freddydumont.com/blog/prisma-postgis)).

And now you can download the data by sending this request GET `http://localhost:3000/api/trpc/refreshDatabase.getAwsFile` in postman.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
