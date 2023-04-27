import type { GetServerSideProps, NextPage } from "next";

const Airport: NextPage = () => {
  return <></>;
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
