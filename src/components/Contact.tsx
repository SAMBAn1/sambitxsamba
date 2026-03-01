import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sambit-samantaray-225434166/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/i_am_a_samba/" },
  { icon: Mail, label: "Email", href: "mailto:sambit.samantaray2000@gmail.com" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            / contact
          </p>
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            Let's work <span className="italic text-gradient">together.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-12">
            Have a project in mind or just want to chat? I'd love to hear from you.
          </p>

          <a
            href="mailto:sambit.samantaray2000@gmail.com"
            className="inline-flex items-center px-10 py-4 bg-primary text-primary-foreground font-body font-medium text-sm tracking-wide rounded-sm hover-lift mb-16"
          >
            Say Hello
          </a>

          <div className="flex justify-center gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-12 h-12 flex items-center justify-center border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
