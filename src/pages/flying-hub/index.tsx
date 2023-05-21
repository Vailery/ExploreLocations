import type { GetServerSideProps, NextPage } from "next";
import { FlyingHubPage } from "~/src/components/pages/FlyingHubPage";

const FlyingHub: NextPage = () => {
  return <FlyingHubPage />;
};

export default FlyingHub;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
