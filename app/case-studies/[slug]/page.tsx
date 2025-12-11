import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/lib/data";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all case studies
 * Enables ISR for case study pages
 */
export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.id,
  }));
}

/**
 * Generate dynamic metadata for each case study
 */
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.id === slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.title} | Case Study`,
    description: study.description,
    openGraph: {
      title: `${study.title} - ${study.subtitle}`,
      description: study.description,
      images: [{ url: study.image, width: 1200, height: 630 }],
    },
  };
}

/**
 * Individual Case Study Page
 * Features project details, metrics, and related work
 */
export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = caseStudies.find((s) => s.id === slug);

  if (!study) {
    notFound();
  }

  // Find adjacent case studies for navigation
  const currentIndex = caseStudies.findIndex((s) => s.id === slug);
  const prevStudy = currentIndex > 0 ? caseStudies[currentIndex - 1] : null;
  const nextStudy =
    currentIndex < caseStudies.length - 1
      ? caseStudies[currentIndex + 1]
      : null;

  // JSON-LD for case study
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: study.image,
    author: {
      "@type": "Organization",
      name: "Quezt Labs",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/case-studies"
                className="hover:text-foreground transition-colors"
              >
                Case Studies
              </Link>
              <span>/</span>
              <span className="text-foreground">{study.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  {study.services.map((service) => (
                    <span
                      key={service}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-accent/30 text-foreground"
                    >
                      {service}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                  {study.title}
                </h1>
                <p className="mt-2 text-xl text-muted-foreground">
                  {study.subtitle}
                </p>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  {study.longDescription}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{study.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Industry</p>
                    <p className="font-medium">{study.industry}</p>
                  </div>
                </div>

                <Button className="mt-8" asChild>
                  <Link href="#contact">
                    Start a Similar Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8 text-center">Key Results</h2>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              {study.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="text-4xl lg:text-5xl font-bold">
                    {metric.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
              <h2>The Challenge</h2>
              <p>
                {study.client} came to us with an ambitious vision: create a{" "}
                {study.industry.toLowerCase()} product that would stand out in a
                crowded market. They needed a partner who could not only execute
                on design and development but also bring strategic thinking to
                the table.
              </p>

              <h2>Our Approach</h2>
              <p>
                We began with a deep discovery phase, interviewing stakeholders,
                analyzing competitors, and mapping user journeys. This
                foundation informed every decision that followed.
              </p>
              <ul>
                <li>User research and persona development</li>
                <li>Competitive analysis and market positioning</li>
                <li>Technical architecture planning</li>
                <li>Iterative design with regular feedback loops</li>
                <li>Agile development with bi-weekly releases</li>
              </ul>

              <h2>The Solution</h2>
              <p>
                We delivered a comprehensive{" "}
                {study.services.join(", ").toLowerCase()} solution that exceeded
                initial expectations. The product launched on time and
                immediately began driving measurable results.
              </p>

              <h2>Impact</h2>
              <p>
                The results speak for themselves. Within six months of launch,{" "}
                {study.client} saw significant improvements across all key
                metrics, validating both the strategic direction and execution
                quality.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {prevStudy ? (
                <Link
                  href={`/case-studies/${prevStudy.id}`}
                  className="group flex items-center gap-3"
                >
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Previous</p>
                    <p className="font-medium">{prevStudy.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextStudy ? (
                <Link
                  href={`/case-studies/${nextStudy.id}`}
                  className="group flex items-center gap-3 text-right"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">Next</p>
                    <p className="font-medium">{nextStudy.title}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
