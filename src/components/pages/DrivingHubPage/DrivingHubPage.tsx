import { Footer } from "../../Footer";
import { Header } from "../../Header";
import { RouterSection } from "./subcomponent/RouterSection";

export const DrivingHubPage = () => {
  return (
    <>
      <Header />
      <main className="mb-5 min-h-screen lg:mb-10">
        <RouterSection />
      </main>
      <Footer />
    </>
  );
};
