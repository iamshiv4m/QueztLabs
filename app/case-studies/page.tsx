import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/ui/section-header";
import { caseStudies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Case Studies | Our Work",
  description:
    "Explore our portfolio of mobile apps, web platforms, and digital products built for innovative companies.",
  openGraph: {
    title: "Case Studies | Quezt Labs",
    description:
      "Explore our portfolio of digital products built for innovative companies.",
  },
};

/**
 * Case Studies Index Page
 * Lists all portfolio projects with filtering capability
 */
export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Our Work"
              title="Projects that drive results"
              description="A collection of our work across mobile apps, web platforms, and digital products for ambitious companies."
            />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20 lg:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study) => (
                <Link
                  key={study.id}
                  href={`/case-studies/${study.id}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src={study.image || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        {study.services.slice(0, 2).map((service) => (
                          <span
                            key={service}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {study.title}
                      </h3>
                      <p className="text-white/80 text-sm">{study.subtitle}</p>
                    </div>
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm mb-4">
                      {study.description}
                    </p>
                    <div className="flex gap-6">
                      {study.metrics.slice(0, 3).map((metric) => (
                        <div key={metric.label}>
                          <p className="text-xl font-bold">{metric.value}</p>
                          <p className="text-xs text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
