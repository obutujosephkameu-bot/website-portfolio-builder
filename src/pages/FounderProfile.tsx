import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import founderPhoto from "@/assets/founder.png";
import { founderProfile, founderSchema } from "@/lib/founderProfile";

const title = `${founderProfile.name} | C.E.O & Founder — Lumex Digital`;

export default function FounderProfile() {
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={founderProfile.description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={founderProfile.description} />
        <meta property="og:type" content="profile" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={founderProfile.description} />
        <script type="application/ld+json">{JSON.stringify(founderSchema)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="container mx-auto px-4 pt-8 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-primary">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link to="/about" className="hover:text-primary">About</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">Josemaria M. Njeru</li>
        </ol>
      </nav>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] items-center max-w-6xl mx-auto">
          <div className="relative overflow-hidden aspect-[3/4] bg-lumex-dark">
            <img src={founderPhoto} alt="Josemaria M. Njeru, C.E.O and founder of Lumex Digital and Software World" className="founder-zoom-out absolute inset-0 h-full w-full object-cover object-top" />
            <div aria-hidden="true" className="founder-zoom-wrap absolute inset-0 bg-lumex-dark" />
          </div>
          <div className="min-w-0">
            <p className="text-secondary font-semibold mb-4">Leadership · Lumex Digital</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">{founderProfile.name}</h1>
            <p className="text-xl font-semibold text-primary mb-6">{founderProfile.role}</p>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>Josemaria M. Njeru is the founder and Chief Executive Officer of Lumex Digital, the Kenyan digital studio established in 2010. He leads its website, application, software and cybersecurity work.</p>
              <p>Software World is Lumex Digital’s dedicated software-building department and trade name, creating systems for schools, companies and shops under the Lumex Digital umbrella.</p>
              <p>His leadership is animated by an unwavering conviction that thoughtfully engineered technology should enable opportunity, strengthen institutions and make digital transformation accessible.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild><Link to="/contact">Contact Lumex Digital <ArrowRight className="h-4 w-4" /></Link></Button>
              <Button variant="outline" asChild><a href="https://softwareworld.co.ke/" target="_blank" rel="noopener noreferrer">Software World <ExternalLink className="h-4 w-4" /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Business registration & logo copyright</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Registered business name in Kenya</h3>
              <p className="text-muted-foreground leading-relaxed">According to the Certificate of Registration details supplied by Lumex Digital, the business name is registered in Kenya as <strong className="text-foreground">{founderProfile.businessName}</strong>.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Kenya Copyright Board registration</h3>
              <p className="text-muted-foreground leading-relaxed">According to the certificate details supplied by Lumex Digital, the copyright work <strong className="text-foreground">“{founderProfile.copyright.title}”</strong> is registered in the <strong className="text-foreground">{founderProfile.copyright.category}</strong> category with the {founderProfile.copyright.authority}, registration number <strong className="text-foreground">{founderProfile.copyright.registrationNumber}</strong>.</p>
              <p className="mt-3 text-sm text-muted-foreground">This registration concerns the logo’s copyright; it is not a government endorsement of the company or its services.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}