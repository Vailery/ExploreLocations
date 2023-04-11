import { Header } from "../../Header";
import { DescriptionSection } from "./subcomponents/DescriptionSection";
import { MapSection } from "./subcomponents/MapSection";
import { RouterSection } from "./subcomponents/RouterSection";

export const HomePage = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <RouterSection />
        <DescriptionSection />
        <MapSection />
      </main>
    </>
  );
};
