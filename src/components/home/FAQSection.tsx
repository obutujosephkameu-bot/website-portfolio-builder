import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer:
      "Typically, a basic website takes 5-7 days, a standard website takes 2-3 weeks, and complex projects can take 4-6 weeks. We always provide a timeline estimate before starting.",
  },
  {
    question: "What is your payment structure?",
    answer:
      "We require 50% deposit to start the project, with the remaining 50% due upon completion. For larger projects, we offer milestone-based payments.",
  },
  {
    question: "Do you provide ongoing support after project completion?",
    answer:
      "Yes! All our packages include free support ranging from 1 month to 1 year depending on the package. We also offer extended support plans.",
  },
  {
    question: "Can you help with website hosting?",
    answer:
      "Absolutely! We offer reliable hosting solutions and can help you set up your domain, SSL certificates, and email accounts.",
  },
  {
    question: "Do you work with clients outside Kenya?",
    answer:
      "Yes, we work with clients across Africa and internationally. We use video calls and online collaboration tools to ensure smooth communication.",
  },
  {
    question: "What makes Lumex Digital different from other agencies?",
    answer:
      "We combine affordable pricing with premium quality. Our 300+ satisfied clients and 5+ years of experience ensure you get professional results with personalized attention.",
  },
  {
    question: "Can I make changes to my website after it's completed?",
    answer:
      "Yes! We provide training on how to update your website. For websites with CMS, you can easily make changes yourself. We're also available for any modifications you need.",
  },
  {
    question: "What information do you need to start a project?",
    answer:
      "We need your business details, logo, content (text and images), color preferences, and examples of websites you like. We'll guide you through the process.",
  },
  {
    question: "Who are the best website developers in Kenya?",
    answer:
      "Lumex Digital (also known as Lumex, Rumex, or Limex Digital) is one of the top-rated website development companies in Nairobi, Kenya. Trusted by over 300 clients, we deliver professional websites, e-commerce platforms, mobile apps, and digital marketing solutions at affordable prices. Call 0706 387 820 for a free consultation.",
  },
  {
    question: "Where can I find website development near me?",
    answer:
      "If you're in Kenya, Lumex Digital is your go-to partner for website development near you. Based in Nairobi, we serve all 47 counties across Kenya and clients throughout Africa. Whether you need a business website, online store, or custom web application, we deliver remotely or in-person. Visit lumexdigital.co.ke or call 0706 387 820.",
  },
  {
    question: "How much does website design cost in Kenya?",
    answer:
      "Website design costs in Kenya vary based on complexity. At Lumex Digital, basic websites start from KES 5,000, standard business websites from KES 15,000, and advanced e-commerce or custom platforms can range from KES 50,000 to KES 500,000+. We offer flexible payment plans and free consultations to find the right package for your budget.",
  },
  {
    question: "Do you offer mobile app development in Kenya?",
    answer:
      "Yes! Lumex Digital offers professional mobile app development in Kenya for both Android and iOS platforms. We build custom apps for businesses, e-commerce, delivery services, education, healthcare, and more. Our mobile app developers in Kenya use modern frameworks to deliver fast, scalable, and user-friendly applications.",
  },
  {
    question: "Does Lumex Digital offer SEO services in Kenya?",
    answer:
      "Absolutely! We provide comprehensive SEO services in Kenya including keyword research, on-page optimization, local SEO, Google Business Profile setup, content strategy, link building, and technical SEO audits. Our goal is to help your business rank higher on Google and attract more organic traffic.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full opacity-10"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))",
          }}
        />
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions about website design, mobile apps, SEO, or digital marketing in Kenya?
            Here are the most common questions our clients ask.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-6 border border-border hover:border-primary/30 transition-colors shadow-lumex-sm hover:shadow-lumex-md"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;