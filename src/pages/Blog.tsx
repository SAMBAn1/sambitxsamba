import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface BlogMeta {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  readTime: string;
  date: string;
}

export const blogPosts: BlogMeta[] = [
  {
    slug: "the-24-page-wall-iphone-scanner-apps",
    title: "The 24-Page Wall: What Scanning a 36-Page Agreement Taught Me About Product Design",
    subtitle:
      "A simple document scan turned into an unexpected lesson in UX, computer vision, and the difference between building for the happy path versus building for reality.",
    tag: "Product Thinking",
    readTime: "6 min read",
    date: "2025-06-01",
  },
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl text-foreground">
            Sambit<span className="text-primary">.</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      <section className="pt-32 pb-24">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl mb-4">Blog</h1>
            <p className="text-muted-foreground font-body text-lg mb-16">
              Essays on product, systems, and the small frictions that reveal bigger truths.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block border border-border hover:border-primary/40 rounded-sm p-8 transition-colors bg-card"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary text-xs font-body tracking-[0.2em] uppercase">
                      {post.tag}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-muted-foreground text-xs font-body">{post.readTime}</span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors mb-3 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-6">
                    {post.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-body">
                    Read essay <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
