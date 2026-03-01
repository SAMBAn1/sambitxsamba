const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} Sambit Samantaray. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground font-body">
          Designed & built with care.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
