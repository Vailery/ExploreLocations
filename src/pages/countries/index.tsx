import type { GetServerSideProps, NextPage } from "next";
import { CountryPage } from "~/src/components/pages/CountryPage";

const Airport: NextPage = () => {
  return <CountryPage />;
};

export default Airport;

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};
