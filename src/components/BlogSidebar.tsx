import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, FileText } from "lucide-react";
import { blogPosts } from "@/pages/Blog";
import { useState } from "react";

const BlogSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <AnimatePresence mode="wait">
        {!collapsed ? (
          <motion.aside
            key="open"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed top-16 left-0 bottom-0 z-40 border-r border-border/50 bg-background/95 backdrop-blur-md overflow-hidden"
          >
            <div className="flex flex-col h-full w-[260px]">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-border/50">
                <span className="text-xs font-body tracking-[0.2em] uppercase text-muted-foreground">
                  Blog Index
                </span>
                <button
                  onClick={() => setCollapsed(true)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Post list */}
              <nav className="flex-1 overflow-y-auto py-3 px-3">
                {blogPosts.map((post, i) => {
                  const postPath = `/blog/${post.slug}`;
                  const isActive = location.pathname === postPath;

                  return (
                    <Link
                      key={post.slug}
                      to={postPath}
                      className={`group flex items-start gap-3 px-3 py-3 rounded-sm transition-all mb-1 ${
                        isActive
                          ? "bg-primary/10 border-l-2 border-primary"
                          : "hover:bg-muted/50 border-l-2 border-transparent"
                      }`}
                    >
                      <FileText
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"
                        }`}
                      />
                      <div className="min-w-0">
                        <p
                          className={`text-sm font-body leading-snug line-clamp-2 ${
                            isActive ? "text-primary font-medium" : "text-foreground/80 group-hover:text-foreground"
                          }`}
                        >
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-body text-muted-foreground">
                            {post.tag}
                          </span>
                          <span className="w-0.5 h-0.5 rounded-full bg-muted-foreground/50" />
                          <span className="text-[10px] font-body text-muted-foreground">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </nav>
          </div>
          </motion.aside>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCollapsed(false)}
            className="hidden lg:flex fixed top-20 left-4 z-40 items-center justify-center w-8 h-8 rounded-sm bg-card border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Expand sidebar"
          >
            <FileText className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogSidebar;
