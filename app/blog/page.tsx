import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/ui/section-header";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog | Insights & Perspectives",
  description:
    "Thoughts on technology, design, and building great digital products from the Quezt Labs team.",
  openGraph: {
    title: "Blog | Quezt Labs",
    description:
      "Insights and perspectives on building great digital products.",
  },
};

/**
 * Blog Index Page
 * Lists all blog posts with featured articles highlighted
 */
export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured);
  const otherPosts = blogPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              badge="Blog"
              title="Insights & perspectives"
              description="Thoughts on technology, design, and building great products from our team."
            />
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Link href={`/blog/${featuredPost.id}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src={featuredPost.image || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/30 text-foreground mb-4">
                      Featured
                    </span>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span>{featuredPost.category}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                      <span>•</span>
                      <span>
                        {new Date(featuredPost.date).toLocaleDateString(
                          "en-US",
                          { dateStyle: "medium" }
                        )}
                      </span>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold group-hover:underline underline-offset-4">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <Image
                        src={featuredPost.authorAvatar || "/placeholder.svg"}
                        alt={featuredPost.author}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-medium text-sm">
                          {featuredPost.author}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {featuredPost.authorRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <article key={post.id}>
                  <Link href={`/blog/${post.id}`} className="group block">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-4">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <span>{post.category}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                      <Image
                        src={post.authorAvatar || "/placeholder.svg"}
                        alt={post.author}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <p className="text-sm text-muted-foreground">
                        {post.author}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
