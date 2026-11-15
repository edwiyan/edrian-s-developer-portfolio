import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import MoreProjects from "@/components/sections/MoreProjects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <div className="grain" aria-hidden />
      <Header ready={ready} />
      <main>
        <Hero ready={ready} />
        <About />
        <Work />
        <MoreProjects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
