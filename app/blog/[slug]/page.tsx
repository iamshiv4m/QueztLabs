import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { blogPosts } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all blog posts
 * Enables ISR for blog pages
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.id,
  }));
}

/**
 * Generate dynamic metadata for each blog post
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

/**
 * Individual Blog Post Page
 * Renders markdown content with author info
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  // JSON-LD for blog post
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "Quezt Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://queztlabs.tech/logo.png",
      },
    },
  };

  // Related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="pt-20">
        {/* Article Header */}
        <article>
          <header className="py-12 lg:py-20">
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
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>

              <div className="max-w-3xl mx-auto">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-accent/30 text-foreground mb-4">
                  {post.category}
                </span>
                <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-balance">
                  {post.title}
                </h1>
                <p className="mt-4 text-xl text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.authorAvatar || "/placeholder.svg"}
                      alt={post.author}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        dateStyle: "medium",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="relative aspect-[2/1] max-w-4xl mx-auto rounded-2xl overflow-hidden bg-muted">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
            <div
              className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert 
                         prose-headings:font-bold prose-headings:tracking-tight
                         prose-a:text-foreground prose-a:underline-offset-4
                         prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                         prose-pre:bg-primary prose-pre:text-primary-foreground"
            >
              {/* Simple markdown-like rendering */}
              {post.content.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return (
                    <h1 key={i} className="text-3xl font-bold mt-8 mb-4">
                      {line.slice(2)}
                    </h1>
                  );
                }
                if (line.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                      {line.slice(3)}
                    </h2>
                  );
                }
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-bold mt-6 mb-3">
                      {line.slice(4)}
                    </h3>
                  );
                }
                if (line.startsWith("- ")) {
                  return (
                    <li key={i} className="ml-4">
                      {line.slice(2)}
                    </li>
                  );
                }
                if (line.startsWith("```")) {
                  return null; // Skip code fence markers
                }
                if (line.trim() === "") {
                  return <br key={i} />;
                }
                return (
                  <p key={i} className="mb-4 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Back Link */}
            <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to all articles
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id}>
                    <Link
                      href={`/blog/${relatedPost.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-4">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                        <span>{relatedPost.category}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:underline underline-offset-4">
                        {relatedPost.title}
                      </h3>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
