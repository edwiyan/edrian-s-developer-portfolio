import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Front-End Developer",
    company: "RBS Software Solutions",
    period: "2024 - Present",
    description:
      "Developing and maintaining front-end components using React.js. Building responsive and user-friendly interfaces with HTML, CSS, Bootstrap, and Tailwind CSS. Collaborating with the team to deliver quality software solutions.",
    isCurrent: true,
  },
  {
    title: "IT Support Staff",
    company: "Bulacan Agricultural State College - MIS Office",
    period: "2024 (2 months)",
    description:
      "Provided technical support and assisted with IT operations. Gained hands-on experience in troubleshooting and maintaining computer systems and networks.",
    isCurrent: false,
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-8 w-4 h-4 bg-accent rounded-full -translate-x-1/2 hidden md:block ring-4 ring-background" />

                <div className="md:ml-20 bg-card p-6 rounded-xl card-elevated">
                  {exp.isCurrent && (
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full mb-3">
                      Current Position
                    </span>
                  )}
                  <h3 className="font-display text-xl font-semibold text-primary mb-1">
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase size={16} />
                      <span className="text-sm">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
