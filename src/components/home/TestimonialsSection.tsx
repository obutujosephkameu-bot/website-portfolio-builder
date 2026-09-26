import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rose Wasike",
    role: "CEO",
    company: "Waronjambe Traders",
    quote: "Lumex Digital transformed our business with a stunning website that brought us more customers than we ever imagined. Their professionalism is unmatched!",
    rating: 5,
    gradient: "from-[#1e3a8a] to-[#2563eb]",
  },
  {
    name: "Nelson Njogu",
    role: "Business Owner",
    company: "Njogu Enterprises",
    quote: "The mobile app they developed for us has streamlined our operations completely. Our customers love the convenience it offers!",
    rating: 5,
    gradient: "from-[#1e40af] to-[#3b82f6]",
  },
  {
    name: "Raymond Pola",
    role: "Director",
    company: "Kid Schools",
    quote: "From digital marketing to IT support, Lumex Digital has been our go-to partner. They truly understand the needs of educational institutions.",
    rating: 5,
    gradient: "from-[#1d4ed8] to-[#60a5fa]",
  },
  {
    name: "Ben Rasesu",
    role: "Head of Accounts",
    company: "China Village Ltd",
    quote: "Their business systems have revolutionized how we manage our finances. Accurate, efficient, and reliable service!",
    rating: 5,
    gradient: "from-[#172554] to-[#2563eb]",
  },
  {
    name: "Wang Fu",
    role: "CEO",
    company: "China Village",
    quote: "Exceptional work on our brand identity and digital presence. Lumex Digital delivered beyond our expectations!",
    rating: 5,
    gradient: "from-[#0c4a6e] to-[#0284c7]",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-muted">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — hear from the businesses we've helped grow across Kenya and Africa.
          </p>
        </motion.div>

        {/* Scrolling Testimonials */}
        <div className="relative">
          <motion.div className="flex gap-6 overflow-hidden" initial={{ x: 0 }}>
            <motion.div
              animate={{ x: [0, -1920] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
              className="flex gap-6 shrink-0"
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`w-[350px] shrink-0 bg-gradient-to-br ${testimonial.gradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-400/20 group cursor-pointer`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-lg shrink-0 group-hover:scale-110 transition-transform duration-300 border border-white/30">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-blue-100 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-blue-100/80">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-6 h-6 text-white/20" />
                    <p className="text-blue-50/90 text-sm leading-relaxed pl-4">
                      {testimonial.quote}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            ...and many more satisfied clients across Kenya & Africa
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {["300+ Happy Clients", "5-Star Reviews", "100% Satisfaction"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-lumex-sm hover:shadow-lumex-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
