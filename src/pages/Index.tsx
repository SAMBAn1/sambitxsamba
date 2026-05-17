import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sambit Samantaray — Product Manager</title>
        <meta name="description" content="Product Manager building AI-first enterprise SaaS products. Currently shipping autonomous AI agents at HighRadius." />
        <link rel="canonical" href="https://pp-1-profile.lovable.app/" />
        <meta property="og:title" content="Sambit Samantaray — Product Manager" />
        <meta property="og:description" content="Product Manager building AI-first enterprise SaaS products. Currently shipping autonomous AI agents at HighRadius." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pp-1-profile.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sambit Samantaray",
          jobTitle: "Product Manager",
          url: "https://pp-1-profile.lovable.app/",
          worksFor: { "@type": "Organization", name: "HighRadius" }
        })}</script>
      </Helmet>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
