import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Award, Users, Zap } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const AboutPreview = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lumex-xl group">
              <img
                src={aboutTeam}
                alt="Lumex Digital Team"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent group-hover:from-foreground/30 transition-all duration-300" />
            </div>
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 3 }}
              className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground px-6 py-4 rounded-xl shadow-lumex-lg cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold">300+</div>
                  <div className="text-sm">Certified Clients</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content - Blue Mesh Background Box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(29,78,216,0.15) 0%, rgba(37,99,235,0.1) 25%, rgba(59,130,246,0.15) 50%, rgba(29,78,216,0.1) 75%, rgba(37,99,235,0.15) 100%)",
            }}
          >
            {/* Blue Mesh Effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 20%, rgba(37,99,235,0.25) 0%, transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(29,78,216,0.2) 0%, transparent 50%),
                  radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15) 0%, transparent 40%),
                  radial-gradient(circle at 10% 80%, rgba(96,165,250,0.2) 0%, transparent 40%),
                  radial-gradient(circle at 90% 20%, rgba(37,99,235,0.18) 0%, transparent 40%)
                `,
              }} />
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    radial-gradient(ellipse at 30% 70%, rgba(59,130,246,0.2) 0%, transparent 60%),
                    radial-gradient(ellipse at 70% 30%, rgba(29,78,216,0.15) 0%, transparent 60%)
                  `,
                }}
              />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Lumex Digital
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Lumex Digital (also known as Lumex or Rumex) is a leading digital solutions provider based in Kenya,
                dedicated to helping businesses and individuals succeed in the
                digital age. Our team of experts delivers professional website design, e-commerce solutions,
                SEO optimization, branding, mobile apps, IT support, and digital marketing services.
                Call us today at <a href="tel:+254706387820" className="text-primary font-semibold hover:underline">0706 387 820</a>.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Award, text: "Professional & Certified Team" },
                  { icon: Users, text: "300+ Happy Clients Across Africa" },
                  { icon: Zap, text: "Fast Delivery & Ongoing Support" },
                ].map((item) => (
                  <motion.div 
                    key={item.text} 
                    className="flex items-center gap-3 group cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div 
                      className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" asChild className="group">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
