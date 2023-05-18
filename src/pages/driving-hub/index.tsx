import type { GetServerSideProps, NextPage } from "next";
import { DrivingHubPage } from "~/src/components/pages/DrivingHubPage";

const DrivingHub: NextPage = () => {
  return <DrivingHubPage />;
};

export default DrivingHub;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
