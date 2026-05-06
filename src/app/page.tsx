import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <Resume />
      <Contact />
    </main>
  );
}
