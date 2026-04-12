import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ── 24-page wall visual ── */
const PageWallGraphic = () => (
  <div className="my-16">
    <div className="flex items-end gap-[2px] justify-center">
      {Array.from({ length: 36 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.03, duration: 0.3 }}
          className={`w-3 md:w-4 origin-bottom rounded-t-sm ${
            i < 24 ? "bg-muted-foreground/30 h-10" : "bg-primary h-10"
          }`}
        />
      ))}
    </div>
    <div className="flex justify-center mt-4 gap-8 text-xs font-body text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-muted-foreground/30" /> Pages 1–24
      </span>
      <span className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm bg-primary" /> Pages 25–36
      </span>
    </div>
    <p className="text-center text-sm text-muted-foreground font-body mt-3 italic">
      Where many scanner apps begin to fail the real use case.
    </p>
  </div>
);

/* ── Scanner comparison diagram ── */
const ScannerComparison = () => (
  <div className="grid md:grid-cols-2 gap-6 my-16">
    <div className="border border-border rounded-sm p-8 bg-card">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-4">Basic scanner logic</p>
      <div className="relative w-40 h-52 mx-auto mb-6 mt-4">
        <div className="absolute inset-0 border-2 border-muted-foreground/40 rounded-sm" />
        {/* Paper fold triangle */}
        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-background border-r-[40px] border-r-muted-foreground/15" />
          <div className="absolute top-0 left-0 w-[40px] h-[1px] bg-muted-foreground/40 origin-top-left rotate-0" />
          <div className="absolute top-[40px] left-0 w-[56px] h-[1px] bg-destructive/60 origin-top-left -rotate-45" />
        </div>
        <span className="absolute top-12 left-0 text-[10px] text-destructive font-body">↑ Missing corner</span>
        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
          {[1, 2, 3].map((l) => (
            <div key={l} className="h-1 bg-muted-foreground/20 rounded-full" />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-body text-center">
        Looks for 4 visible corners. Fails when one is obscured by a staple or fold.
      </p>
    </div>
    <div className="border border-primary/30 rounded-sm p-8 bg-card">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-4">Smarter scanner logic</p>
      <div className="relative w-40 h-52 mx-auto mb-6 mt-4">
        <div className="absolute inset-0 border-2 border-primary/40 rounded-sm" />
        {/* Paper fold triangle */}
        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[40px] border-t-background border-r-[40px] border-r-primary/15" />
          <div className="absolute top-[40px] left-0 w-[56px] h-[1px] bg-primary/40 origin-top-left -rotate-45" />
        </div>
        {/* Inferred corner dot + dashed lines */}
        <div className="absolute top-0 left-0 w-8 h-8">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary border-dashed" style={{ backgroundImage: 'repeating-linear-gradient(90deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 4px, transparent 4px, transparent 8px)', background: 'none', borderTop: '2px dashed hsl(var(--primary))' }} />
          <div className="absolute top-0 left-0 h-full w-[2px]" style={{ borderLeft: '2px dashed hsl(var(--primary))' }} />
          <div className="absolute top-0 left-0 w-2 h-2 rounded-full bg-primary" />
        </div>
        <span className="absolute top-12 left-0 text-[10px] text-primary font-body">↑ Inferred corner</span>
        <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-1">
          {[1, 2, 3].map((l) => (
            <div key={l} className="h-1 bg-primary/20 rounded-full" />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-body text-center">
        Uses edges to infer where the missing corner should be. Reconstructs a clean rectangle.
      </p>
    </div>
  </div>
);

/* ── Demos vs Reality comparison ── */
const DemosVsReality = () => (
  <div className="grid md:grid-cols-2 gap-6 my-16">
    <div className="border border-border rounded-sm p-8 bg-card">
      <p className="text-muted-foreground text-xs font-body tracking-[0.2em] uppercase mb-6">Built for demos</p>
      <ul className="space-y-3 text-sm text-muted-foreground font-body">
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" /> Flat pages</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" /> Perfect lighting</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" /> Short scan session</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" /> No edge cases</li>
      </ul>
    </div>
    <div className="border border-primary/30 rounded-sm p-8 bg-card">
      <p className="text-primary text-xs font-body tracking-[0.2em] uppercase mb-6">Built for reality</p>
      <ul className="space-y-3 text-sm text-muted-foreground font-body">
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Stapled pages</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Curled corners</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Long legal documents</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Shadow tolerance</li>
        <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary" /> Resilient cropping</li>
      </ul>
    </div>
  </div>
);

/* ── Reusable primitives ── */
const PullQuote = ({ children }: { children: React.ReactNode }) => (
  <motion.blockquote
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="my-16 py-8 border-l-2 border-primary pl-8"
  >
    <p className="font-display text-2xl md:text-3xl italic text-foreground leading-snug">
      {children}
    </p>
  </motion.blockquote>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-6">{children}</p>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-2xl md:text-3xl text-foreground mt-16 mb-6">{children}</h2>
);

const ScannerPost = () => (
  <>
    {/* Hero */}
    <section className="pt-32 pb-16 lg:pl-[260px] transition-all">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-primary text-xs font-body tracking-[0.2em] uppercase">Product Thinking</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-muted-foreground text-xs font-body">6 min read</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
            The 24-Page Wall: What Scanning a 36-Page Agreement Taught Me About{" "}
            <span className="italic text-gradient">Product Design</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed max-w-2xl">
            A simple document scan turned into an unexpected lesson in UX, computer vision, and the difference between building for the happy path versus building for reality.
          </p>
          <div className="flex items-center gap-3 mt-6 text-xs font-body text-muted-foreground/60">
            <span>By <Link to="/" className="hover:text-primary transition-colors">Sambit Samantaray</Link></span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>March 8, 2026</span>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Article */}
    <article className="pb-32 lg:pl-[260px] transition-all">
      <div className="container max-w-3xl">
        <PageWallGraphic />

        <div className="border-t border-border pt-16">
          <P>There are some problems you do not expect to think deeply about.</P>
          <P>Scanning a legal document on your phone is one of them.</P>
          <P>A few days ago, I was trying to scan an Agreement of Sale document on my iPhone. It was 36 pages long. Straightforward task, I thought. Open scanner, point camera, flip pages, export PDF, done.</P>
          <P>Except it was not that simple.</P>
          <P>Very quickly, I ran into something I had never paid attention to before: a surprising number of PDF scanner apps on the iPhone App Store seem to hit a wall at around 24 pages when scanning directly into a single document. I even tried Apple Notes, assuming the built-in option would be the most seamless. Same issue.</P>
          <P>Now, of course, there was an obvious workaround. I could scan the document in two parts, save two PDFs, and merge them later.</P>
          <P>But that was not the point.</P>
          <P>I did not want a workaround.</P>
          <P>I wanted to understand the limitation.</P>
          <P>And more than that, I wanted a single-go solution.</P>
          <P>So I went on a mini mission. I downloaded multiple apps, tested their scanning behavior, compared how they cropped pages, and kept running into the same wall. Some apps felt lightweight. Some felt polished. Some looked promising until they quietly failed at exactly the kind of use case that matters most: a long, important, real-world document.</P>
          <P>Then I tried Adobe Acrobat.</P>
          <P>I had noticed it from the beginning, but I initially ignored it. I assumed it would probably sit behind a paywall or reserve the useful features for a premium plan. But to my surprise, it handled the 36-page scan in one go.</P>
          <P>Problem solved.</P>
          <P>But that was only the first surprise.</P>
          <P>The second surprise was more interesting.</P>
          <P>The scan quality was better too.</P>
          <P>And not in a vague, "this looks nicer" sort of way.</P>
          <P>In a very specific, very practical way.</P>
          <P>If you have ever scanned stapled documents, you probably know this issue well. When pages are stapled at the top-left corner, that corner rarely sits flat. It lifts slightly, bends inward, or gets visually obscured because the page does not form a perfect rectangle anymore. For many scanner apps, this becomes a small but recurring failure point. They struggle to identify the actual page boundary, especially that top-left corner.</P>
          <P>Adobe handled it differently.</P>
          <P>It seemed to infer the missing corner by reading the top edge and left edge of the page and projecting where they should meet, almost as if it was constructing an imaginary corner that the camera could not cleanly see.</P>
          <P>That tiny behavior changed the entire feel of the product.</P>
          <P>Suddenly, this was not just an app that could scan more pages.</P>
          <P>It was an app that seemed to understand documents better.</P>
        </div>

        <H2>The difference between supporting a task and understanding it</H2>
        <P>This experience stayed with me because it reveals a subtle but important distinction in product design.</P>
        <P>Many products technically support a task.</P>
        <P>Fewer products understand the real conditions under which that task happens.</P>
        <P>On paper, every scanner app is doing the same thing: detect a page, crop it, correct the perspective, clean it up, add it to a PDF.</P>
        <P>But in reality, the user is not scanning ideal pages in a lab.</P>
        <P>They are scanning wrinkled pages, stapled pages, shadowed pages, pages with folds, pages that refuse to lie flat, pages from legal agreements, loan files, builder documents, and registration paperwork. They are often doing it quickly, under time pressure, while trying not to misplace anything important.</P>
        <P>That is where product quality reveals itself.</P>
        <P>Not in the clean demo path.</P>
        <P>In the annoying edge case.</P>
        <P>The user does not remember the app because it worked on page 1.</P>
        <P>They remember it because it still worked on page 29.</P>

        <ScannerComparison />

        <H2>The 24-page limit is more than a number</H2>
        <P>At one level, the 24-page wall is just a limit.</P>
        <P>At another level, it is a philosophy.</P>
        <P>A limit like that tells you something about how the product was shaped.</P>
        <P>Maybe the team optimized for lighter use cases. Maybe they made a performance tradeoff. Maybe they wanted to reduce crashes and memory pressure. Maybe they kept heavy-duty usage for a paid plan. Maybe they simply assumed most users would never need more.</P>
        <P>All of those are understandable decisions.</P>
        <P>But from the user's point of view, the interpretation is much simpler.</P>
        <P>"This app is not built for my real problem."</P>
        <P>And that gap matters.</P>
        <P>Because users rarely describe products in terms of architectural constraints.</P>
        <P>They describe them in terms of trust.</P>

        <PullQuote>
          Users do not experience limits as technical decisions. They experience them as trust decisions.
        </PullQuote>

        <P>Can I rely on this when the document is long?</P>
        <P>Can I rely on this when the pages are stapled?</P>
        <P>Can I rely on this when one corner is not visible?</P>
        <P>Can I rely on this when the file actually matters?</P>
        <P>That is the real product test.</P>

        <H2>What Adobe seemed to do better</H2>
        <P>I do not mean this as an ad for Adobe.</P>
        <P>I mean it as an observation about product execution.</P>
        <P>What stood out was not just that Adobe allowed a longer scan session. It was that the app felt more tolerant of messy input.</P>
        <P>That usually means the product is doing more than simple corner detection.</P>
        <P>A basic scanner often behaves like this: find four visible corners, assume the shape is a quadrilateral, crop accordingly.</P>
        <P>That works fine until one corner disappears into a staple bend, a shadow, or a slight curl.</P>
        <P>A more mature scanner likely does something closer to this: detect the dominant edges of the page, infer the missing geometry, estimate where the hidden corner should be, apply perspective correction, clean shadows and improve contrast after capture.</P>
        <P>That difference is enormous.</P>
        <P>One system asks, "Can I clearly see the page?"</P>
        <P>The other asks, "Given the evidence I have, what is this page most likely supposed to be?"</P>
        <P>That is a more intelligent product behavior.</P>
        <P>And more importantly, it feels more human.</P>

        <H2>Good products reduce the need for user discipline</H2>
        <P>One thing I find fascinating about great digital products is that they reduce how much the user has to compensate for the software.</P>
        <P>A weak scanner forces the user to do extra work: flatten the page harder, fix the lighting, re-angle the phone, rescan because the crop failed, split the document into chunks, merge PDFs later.</P>
        <P>A better scanner absorbs more of that burden.</P>
        <P>The user still has to scan the document, of course. But the product takes on more of the responsibility for making the interaction succeed.</P>
        <P>That is what good software feels like.</P>
        <P>Not flashy.</P>
        <P>Respectful.</P>
        <P>It respects the fact that the user has a job to do, and that the software should carry as much of the friction as possible.</P>

        <DemosVsReality />

        <H2>This tiny experience says something bigger about product thinking</H2>
        <P>The more I reflected on this, the more it felt like a product lesson disguised as a document-scanning problem.</P>
        <P>A lot of products look similar when usage is shallow.</P>
        <P>Differences show up under stress.</P>
        <P>That applies to scanner apps. It also applies to dashboards, onboarding flows, checkout systems, support tools, enterprise workflows, and almost any digital product that claims to make work easier.</P>
        <P>The surface promise is often the same.</P>
        <P>The lived experience is not.</P>
        <P>And the lived experience is usually decided by edge-case handling.</P>
        <P>When the user flow breaks slightly, does the product collapse? Or does it adapt?</P>
        <P>When the input is imperfect, does the product demand perfection from the user? Or does it intelligently fill in the gaps?</P>
        <P>When the task extends beyond the assumed average, does the product still hold? Or does it politely reveal that it was only designed for the first half of the problem?</P>
        <P>These questions are bigger than PDF scanners.</P>
        <P>They are really questions about whether a product is designed for demos or for reality.</P>

        <PullQuote>
          The real test of product quality begins where the clean demo path ends.
        </PullQuote>

        <H2>Final thought</H2>
        <P>I started this whole exercise because I wanted to scan a 36-page Agreement of Sale in one go.</P>
        <P>That was it.</P>
        <P>A very ordinary need.</P>
        <P>But it led me to a thought I keep coming back to:</P>
        <P>Users notice when a product understands the messiness of real life.</P>
        <P>Not because they always have the words to explain it.</P>
        <P>But because they can feel the difference immediately.</P>
        <P>Sometimes the most memorable product experiences do not come from big features.</P>
        <P>They come from small moments where the software quietly says,</P>
        <P>"I see what you are trying to do. I can handle it."</P>
        <P>And honestly, that may be one of the strongest forms of UX there is.</P>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-border">
          <p className="text-muted-foreground font-body text-sm italic">
            More essays on product, systems, and the small frictions that reveal bigger truths.
          </p>
          <Link
            to="/"
            className="inline-flex items-center mt-4 text-primary text-sm font-body hover:underline"
          >
            sambitxsamba.com
          </Link>
        </div>
      </div>
    </article>
  </>
);

export default ScannerPost;
