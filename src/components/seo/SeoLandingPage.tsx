import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, Phone, MessageCircle, ExternalLink } from "lucide-react";

export interface SeoSection {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: { h3: string; body: string }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RelatedLink {
  to: string;
  label: string;
}

export interface SeoLandingPageProps {
  /** Browser tab + og title */
  seoTitle: string;
  /** <meta name="description"> */
  metaDescription: string;
  /** Canonical path, e.g. "/web-design-kenya" */
  canonicalPath: string;
  /** H1 of the page */
  h1: string;
  /** Eyebrow/kicker above H1 */
  eyebrow: string;
  /** Hero subheading (short) */
  heroLead: string;
  /** Hero supporting paragraph (longer) */
  heroDescription: string;
  /** Trust / quick-win bullets shown in hero */
  heroBullets?: string[];
  /** Main long-form sections (each gets an H2 + paragraphs/bullets/H3s) */
  sections: SeoSection[];
  /** FAQ list */
  faqs?: FaqItem[];
  /** Internal links shown in a "Related services" block */
  relatedLinks?: RelatedLink[];
  /** Optional JSON-LD object (Service / Article / etc.) */
  jsonLd?: Record<string, unknown>;
  /** CTA heading at the bottom */
  finalCtaHeading?: string;
  /** CTA body at the bottom */
  finalCtaBody?: string;
  /** Optional external CTA button rendered in the hero alongside default buttons */
  externalCta?: { href: string; label: string };
}

/**
 * Long-form, SEO-optimized landing page used for Lumex Digital service pages.
 * Renders unique title/description tags, schema markup, breadcrumbs,
 * multiple H2/H3 sections, internal links and CTAs.
 */
const SeoLandingPage = ({
  seoTitle,
  metaDescription,
  canonicalPath,
  h1,
  eyebrow,
  heroLead,
  heroDescription,
  heroBullets = [],
  sections,
  faqs = [],
  relatedLinks = [],
  jsonLd,
  finalCtaHeading = "Ready to Build Your Website, App or Software System?",
  finalCtaBody = "Contact Lumex Digital today for professional websites, mobile apps, software systems, hosting, domains and digital solutions in Kenya.",
  externalCta,
}: SeoLandingPageProps) => {
  const fullUrl = `https://lumexdigital.co.ke${canonicalPath}`;

  useEffect(() => {
    // Title + meta description
    document.title = seoTitle;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [k, v] = attr.split("=");
        el.setAttribute(k, v.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', 'name="description"', metaDescription);
    setMeta('meta[property="og:title"]', 'property="og:title"', seoTitle);
    setMeta('meta[property="og:description"]', 'property="og:description"', metaDescription);
    setMeta('meta[property="og:url"]', 'property="og:url"', fullUrl);
    setMeta('meta[property="og:type"]', 'property="og:type"', "website");
    setMeta('meta[name="twitter:title"]', 'name="twitter:title"', seoTitle);
    setMeta('meta[name="twitter:description"]', 'name="twitter:description"', metaDescription);

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // JSON-LD (page-specific) + Breadcrumbs
    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://lumexdigital.co.ke/" },
        { "@type": "ListItem", position: 2, name: h1, item: fullUrl },
      ],
    };

    const blocks: Record<string, unknown>[] = [breadcrumb];
    if (jsonLd) blocks.push(jsonLd);
    if (faqs.length > 0) {
      blocks.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }

    const scriptId = `seo-jsonld-${canonicalPath}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(blocks);
    document.head.appendChild(script);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [seoTitle, metaDescription, canonicalPath, fullUrl, h1, jsonLd, faqs]);

  return (
    <Layout>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link to="/" className="hover:text-primary">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium">{h1}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 lumex-page-bg opacity-60" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-6 text-sm font-semibold">
            {eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.05 } }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="lumex-heading">{h1}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
            className="text-lg md:text-2xl text-foreground/80 font-medium mb-4"
          >
            {heroLead}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-3xl"
          >
            {heroDescription}
          </motion.p>
          {heroBullets.length > 0 && (
            <ul className="grid sm:grid-cols-2 gap-2 mb-8 max-w-3xl">
              {heroBullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/contact">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="https://wa.me/254706387820" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Chat on WhatsApp
              </a>
            </Button>
            {externalCta && (
              <Button size="lg" variant="secondary" asChild>
                <a href={externalCta.href} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />{externalCta.label}
                </a>
              </Button>
            )}
            <Button size="lg" variant="ghost" asChild>
              <a href="tel:+254706387820"><Phone className="w-4 h-4 mr-2" />0706 387 820</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Long-form content sections */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {sections.map((s, i) => (
          <section key={s.h2} className="mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="text-2xl md:text-3xl font-bold mb-4"
            >
              {s.h2}
            </motion.h2>
            {s.paragraphs?.map((p, j) => (
              <p key={j} className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="grid sm:grid-cols-2 gap-3 my-6">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 bg-card border border-border rounded-lg p-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.subsections?.map((sub) => (
              <div key={sub.h3} className="mt-6">
                <h3 className="text-xl font-semibold mb-2">{sub.h3}</h3>
                <p className="text-muted-foreground leading-relaxed">{sub.body}</p>
              </div>
            ))}
          </section>
        ))}

        {faqs.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="bg-card border border-border rounded-xl p-5">
                  <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-muted-foreground">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedLinks.length > 0 && (
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Lumex Digital Services</h2>
            <p className="text-muted-foreground mb-6">
              Explore more of our digital solutions for businesses, schools and organizations in Kenya.
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="inline-flex items-center gap-2 bg-card border border-border hover:border-primary rounded-full px-4 py-2 text-sm font-medium transition-colors"
                >
                  {l.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="lumex-gradient-bg rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
            <div className="relative max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{finalCtaHeading}</h2>
              <p className="text-lg md:text-xl mb-8 opacity-90">{finalCtaBody}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20" asChild>
                  <Link to="/services">View Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SeoLandingPage;
