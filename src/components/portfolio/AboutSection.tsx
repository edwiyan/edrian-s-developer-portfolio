import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Code2 } from "lucide-react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: GraduationCap,
      title: "Fresh Graduate",
      description: "BS Information Technology",
    },
    {
      icon: Briefcase,
      title: "6+ Months",
      description: "Professional Experience",
    },
    {
      icon: Code2,
      title: "React.js",
      description: "Specialization",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="font-display text-5xl font-bold text-primary">
                    ECR
                  </span>
                </div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/20 rounded-2xl -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                Edrian Christian C. Reyes
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I'm a 24-year-old front-end developer and fresh graduate with a 
                Bachelor of Science in Information Technology. I was fortunate 
                to be hired before graduation and now have 6 months of hands-on 
                experience at a startup company.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I specialize in building responsive and user-friendly interfaces 
                using HTML, CSS, and React.js. I'm also experienced with Bootstrap 
                and Tailwind CSS, and I'm always eager to learn new technologies 
                and improve my craft.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-3 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-card card-elevated"
                  >
                    <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="font-semibold text-primary text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
