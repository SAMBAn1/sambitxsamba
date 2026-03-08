import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts } from "@/pages/Blog";
import { useState } from "react";

const BlogSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!collapsed ? (
        <motion.aside
          key="open"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 260, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="hidden lg:block fixed top-16 left-0 bottom-0 z-40 bg-background/90 backdrop-blur-sm overflow-hidden"
          style={{
            borderRight: hovered
              ? "1px solid hsl(var(--border) / 0.5)"
              : "1px solid transparent",
            transition: "border-color 0.3s ease",
          }}
        >
          <div className="flex flex-col h-full w-[260px]">
            <div className="flex items-center justify-between px-4 py-4">
              <span className="text-[10px] font-body tracking-[0.25em] uppercase text-muted-foreground/60">
                Index
              </span>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setCollapsed(true)}
                className="text-muted-foreground/40 hover:text-primary transition-colors"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3">
              {blogPosts.map((post) => {
                const postPath = `/blog/${post.slug}`;
                const isActive = location.pathname === postPath;

                return (
                  <Link
                    key={post.slug}
                    to={postPath}
                    className={`block px-3 py-2.5 rounded-sm transition-colors mb-0.5 ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground/70 hover:text-foreground/90"
                    }`}
                  >
                    <p className="text-xs font-body leading-relaxed">
                      {post.title}
                    </p>
                    <span className="text-[10px] font-body text-muted-foreground/40 mt-1 block">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
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
          className="hidden lg:flex fixed top-20 left-3 z-40 items-center justify-center w-7 h-7 rounded-sm text-primary hover:text-primary-foreground hover:bg-primary transition-colors"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BlogSidebar;
