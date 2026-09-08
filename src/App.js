import SmoothScroll from "./components/SmoothScroll/SmoothScroll";
import Navbar from "./components/Navigation/Navbar";
// import JourneyRoute from "./components/JourneyRoute";

import Hero from "./components/Hero/Hero";
import RouteSection from "./components/RouteSection/RouteSection";
// import Services from "./components/Services/Services";
// import AI42 from "./components/AI42/AI42";
// import Packages from "./components/Packages/Packages";
// import FinalCTA from "./components/CTA/FinalCTA";
import ConceptBlueprint from "./components/ConceptBlueprint/ConceptBlueprint";

function App() {
  return (
    <SmoothScroll>
      {/* <JourneyRoute /> */}

      <Navbar />

      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="concept">
          <ConceptBlueprint />
        </section>


        <section id="route">
          <RouteSection />
        </section>

        {/* <Services />

        <section id="ai42">
          <AI42 />
        </section>

        <section id="packages">
          <Packages />
        </section>

        <section id="final">
          <FinalCTA />
        </section> */}
      </main>
    </SmoothScroll>
  );
}

export default App;