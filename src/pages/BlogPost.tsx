import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import ReadingProgress from "@/components/ReadingProgress";
import BlogSidebar from "@/components/BlogSidebar";
import { blogPosts } from "@/pages/Blog";
import ScannerPost from "@/components/blog/ScannerPost";
import DisplayTechnologyPost from "@/components/blog/DisplayTechnologyPost";
import MarkovChainsPost from "@/components/blog/MarkovChainsPost";

const postComponents: Record<string, React.FC> = {
  "the-24-page-wall-iphone-scanner-apps": ScannerPost,
  "how-display-technologies-actually-work": DisplayTechnologyPost,
  "the-mathematics-of-what-comes-next-markov-chains": MarkovChainsPost,
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!slug || !post) {
    return <Navigate to="/blog" replace />;
  }

  const PostContent = postComponents[slug];

  if (!PostContent) {
    return <Navigate to="/blog" replace />;
  }

  const url = `https://pp-1-profile.lovable.app/blog/${post.slug}`;
  const description = post.subtitle.length > 160 ? post.subtitle.slice(0, 157) + "..." : post.subtitle;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${post.title} — Sambit Samantaray`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          author: { "@type": "Person", name: "Sambit Samantaray" },
          url,
        })}</script>
      </Helmet>
      <ReadingProgress />
      <BlogSidebar />

      {/* Nav bar for blog */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="font-display text-xl text-foreground">
            Sambit<span className="text-primary animate-pulse">.</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center w-8 h-8 text-sm font-body text-destructive hover:bg-destructive/10 transition-colors rounded"
            title="Close and return to home"
          >
            <X className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      <PostContent />
      <ScrollToTop />
    </div>
  );
};

export default BlogPost;
