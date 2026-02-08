import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Code2, Zap } from "lucide-react";
import avatar from '../images/profile.jpg'

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: GraduationCap,
      title: "BS Information Technology",
      description: "Bulacan Agricultural State College",
      delay: 0.2,
    },
    {
      icon: Briefcase,
      title: "6+ Months",
      description: "Professional Experience",
      delay: 0.3,
    },
    {
      icon: Code2,
      title: "React.js",
      description: "Specialization",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Modern Stack",
      description: "Tailwind & Bootstrap",
      delay: 0.5,
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute -right-40 top-20 w-80 h-80 border border-border/30 rounded-full"
      />
      
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-medium text-accent uppercase tracking-wider mb-6">
            About Me
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-light">Who I Am</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo/Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl animate-glow-pulse" />
                
                {/* Main container */}
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-secondary to-background border border-border overflow-hidden">
                  {/* Decorative grid */}
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `radial-gradient(circle at center, hsl(var(--accent)) 1px, transparent 1px)`,
                      backgroundSize: '30px 30px'
                    }}
                  />
                  {/* Avatar placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <img
                          src={avatar}
                          alt="Profile"
                          className="w-full h-full object-cover "
                        />
                    </div>
                  </div>
                </div>
                
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl px-4 py-3 shadow-xl"
                >
                  <p className="text-accent font-bold text-lg">24</p>
                  <p className="text-muted-foreground text-xs">Years Old</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Edrian Christian C. Reyes
                </h3>
                <p className="text-accent font-medium">Front-End Developer</p>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a 24-year-old front-end developer and fresh graduate with a 
                  Bachelor of Science in Information Technology. I was fortunate 
                  to be hired before graduation and now have 6 months of hands-on 
                  experience at a startup company.
                </p>
                <p>
                  I specialize in building responsive and user-friendly interfaces 
                  using HTML, CSS, and React.js. I'm also experienced with Bootstrap 
                  and Tailwind CSS, and I'm always eager to learn new technologies 
                  and improve my craft.
                </p>
              </div>

              {/* Highlight cards */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: item.delay }}
                    whileHover={{ y: -4, borderColor: "hsl(var(--accent) / 0.3)" }}
                    className="card-dark p-5 group cursor-default"
                  >
                    <item.icon className="w-8 h-8 text-accent mb-3 transition-transform group-hover:scale-110" />
                    <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
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
