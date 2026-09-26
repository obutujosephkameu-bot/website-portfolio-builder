import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

const POSTS = [
  {
    slug: "why-every-business-in-kenya-needs-a-website",
    title: "Why Every Business in Kenya Needs a Website",
    excerpt: "A professional website is no longer optional for Kenyan businesses. Discover how a well-designed site builds trust, attracts customers and drives sales — even for small shops and service providers.",
    date: "2025-01-12",
  },
  {
    slug: "how-a-school-management-system-helps-schools",
    title: "How a School Management System Helps Schools",
    excerpt: "From fee management to exam results and parent communication, a modern school management system removes hours of paperwork and improves transparency for parents, teachers and administrators.",
    date: "2025-01-22",
  },
  {
    slug: "website-design-tips-for-small-businesses",
    title: "Website Design Tips for Small Businesses",
    excerpt: "Simple, practical website design tips that help Kenyan small businesses look more professional, load faster on mobile and convert more visitors into paying customers.",
    date: "2025-02-04",
  },
  {
    slug: "why-seo-matters-for-kenyan-businesses",
    title: "Why SEO Matters for Kenyan Businesses",
    excerpt: "If your business isn't showing up on Google, your competitors are getting your customers. Here's how SEO works and why it's essential for businesses operating in Kenya.",
    date: "2025-02-18",
  },
  {
    slug: "how-custom-software-can-improve-business-operations",
    title: "How Custom Software Can Improve Business Operations",
    excerpt: "Off-the-shelf tools force you to adapt. Custom software adapts to your workflow. Learn when it makes sense to invest in a tailor-made business system.",
    date: "2025-03-02",
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Lumex Digital Blog | Websites, Apps, Software and SEO Kenya";
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
    const desc = "Read Lumex Digital articles about website design, mobile apps, software development, hosting, domains, SEO and digital growth in Kenya.";
    setMeta('meta[name="description"]', 'name="description"', desc);
    setMeta('meta[property="og:title"]', 'property="og:title"', "Lumex Digital Blog");
    setMeta('meta[property="og:description"]', 'property="og:description"', desc);
    setMeta('meta[property="og:url"]', 'property="og:url"', "https://lumexdigital.co.ke/blog");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://lumexdigital.co.ke/blog");
  }, []);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16 max-w-5xl">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Blog</span>
        </nav>

        <header className="mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-2 mb-4 text-sm font-semibold">
            Lumex Digital Blog
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 lumex-heading">Lumex Digital Blog</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Insights, guides and tips on website design, mobile apps, custom software, hosting, domains, SEO and digital growth — written for businesses, schools and organizations in Kenya.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6">
          {POSTS.map((p) => (
            <article key={p.slug} className="bg-card border border-border rounded-2xl p-6 hover:border-primary transition-colors">
              <div className="flex items-center text-xs text-muted-foreground gap-2 mb-3">
                <Calendar className="w-3.5 h-3.5" />
                <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}</time>
              </div>
              <h2 className="text-xl font-bold mb-2">{p.title}</h2>
              <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/contact">
                  Read more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center bg-card border border-border rounded-2xl p-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need help with your website, app or software project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Lumex Digital is a Kenyan technology company providing professional website design, mobile app development, custom software, hosting and SEO services.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild><Link to="/contact">Contact Us</Link></Button>
            <Button variant="outline" asChild><Link to="/services">View Services</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
