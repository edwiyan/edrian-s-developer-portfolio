import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Front-End Developer",
    company: "RBS Software Solutions",
    location: "Philippines",
    period: "2025 - 2026",
    description:
      "Developing and maintaining front-end components using React.js. Building responsive and user-friendly interfaces with HTML, CSS, Bootstrap, and Tailwind CSS. Collaborating with the team to deliver quality software solutions.",
    isCurrent: true,
    highlights: ["React.js", "Tailwind CSS", "Bootstrap", "API Integration"],
  },
  {
    title: "IT Support Staff",
    company: "Bulacan Agricultural State College",
    location: "MIS Office",
    period: "2025 (2 months)",
    description:
      "Provided technical support and assisted with IT operations. Gained hands-on experience in troubleshooting and maintaining computer systems and networks, as well as in graphic designing projects, creating visual assets and design materials.",
    isCurrent: false,
    highlights: ["Technical Support", "Troubleshooting", "Network Maintenance", "Graphic Designing"],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -left-40 bottom-20 w-80 h-80 border border-border/20 rounded-full"
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
            Career Path
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-light">Work Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-border to-transparent hidden sm:block" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 last:mb-0 sm:pl-20 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                  className={`absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 hidden sm:block ${
                    exp.isCurrent ? "bg-accent glow-accent" : "bg-muted border-2 border-border"
                  }`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-dark p-8 relative group"
                >
                  {/* Current badge */}
                  {exp.isCurrent && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/30 rounded-full text-xs font-medium text-accent mb-4"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Current Position
                    </motion.span>
                  )}

                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {exp.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-accent">
                      <Briefcase size={16} />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-secondary border border-border rounded-full text-xs font-medium text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
