import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Portfolio } from "@/components/sections/portfolio";
import { Stats } from "@/components/sections/stats";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { BlogTeaser } from "@/components/sections/blog-teaser";
import { FAQ } from "@/components/sections/faq";
import { Contact } from "@/components/sections/contact";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";

/**
 * Home Page
 *
 * This is the main landing page for Quezt Labs.
 * All sections are lazy-loaded for optimal performance.
 *
 * Sections:
 * 1. Hero - Primary CTA and value proposition
 * 2. Services - Core offerings
 * 3. Portfolio - Featured case studies
 * 4. Stats - Key metrics
 * 5. Process - Development workflow
 * 6. Testimonials - Client feedback
 * 7. Pricing - Engagement tiers
 * 8. Blog Teaser - Recent articles
 * 9. FAQ - Common questions
 * 10. Contact - Form and info
 */
export default function HomePage() {
  return (
    <>
      <JsonLd />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Services />
        {/* <Portfolio /> */}
        {/* <Stats /> */}
        <Process />
        {/*  <Testimonials /> */}
        <Pricing />
        {/* <BlogTeaser /> */}
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
