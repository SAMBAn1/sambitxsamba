import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
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

  if (!slug || !blogPosts.find((p) => p.slug === slug)) {
    return <Navigate to="/blog" replace />;
  }

  const PostContent = postComponents[slug];

  if (!PostContent) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
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
