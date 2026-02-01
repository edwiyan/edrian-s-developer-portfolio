import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, Download } from "lucide-react";

// ==========================================
// EDIT YOUR RESUME DATA HERE
// ==========================================

const personalInfo = {
  name: "Edrian Christian C. Reyes",
  title: "Front-End Developer",
  email: "edrian.reyes@email.com",
  phone: "+63 912 345 6789",
  location: "Bulacan, Philippines",
};

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Bulacan Agricultural State College",
    year: "2020 - 2024",
    description: "Graduated with focus on web development and software engineering.",
  },
];

const workExperience = [
  {
    title: "Front-End Developer",
    company: "RBS Software Solutions",
    period: "2024 - Present",
    responsibilities: [
      "Develop and maintain responsive web applications using React.js",
      "Implement UI components with Tailwind CSS and Bootstrap",
      "Collaborate with backend developers for API integration",
      "Participate in code reviews and agile development processes",
    ],
  },
  {
    title: "IT Support Staff",
    company: "Bulacan Agricultural State College - MIS Office",
    period: "2024 (2 months)",
    responsibilities: [
      "Provided technical support for computer hardware and software",
      "Assisted with network troubleshooting and maintenance",
      "Managed inventory of IT equipment",
    ],
  },
];

const certifications = [
  {
    name: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2023",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2023",
  },
  // Add more certifications here
];

// ==========================================
// END OF EDITABLE DATA
// ==========================================

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Resume
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            A summary of my education, experience, and certifications.
          </p>
          
          {/* Download Button */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-2 mt-6 bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            <Download size={18} />
            Download CV
          </motion.a>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="bg-card p-5 rounded-xl card-elevated border-l-4 border-blue-500"
                >
                  <h4 className="font-semibold text-primary">{edu.degree}</h4>
                  <p className="text-accent font-medium text-sm mt-1">{edu.school}</p>
                  <p className="text-muted-foreground text-sm mt-1">{edu.year}</p>
                  <p className="text-muted-foreground text-sm mt-2">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-display text-xl font-semibold text-primary">
                Work Experience
              </h3>
            </div>

            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.title + job.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-card p-5 rounded-xl card-elevated border-l-4 border-green-500"
                >
                  <h4 className="font-semibold text-primary">{job.title}</h4>
                  <p className="text-accent font-medium text-sm mt-1">{job.company}</p>
                  <p className="text-muted-foreground text-sm mt-1">{job.period}</p>
                  <ul className="mt-3 space-y-1">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-green-500 mt-1.5">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-4xl mx-auto mt-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="font-display text-xl font-semibold text-primary">
              Certifications
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-card p-4 rounded-xl card-elevated border-l-4 border-amber-500"
              >
                <h4 className="font-semibold text-primary text-sm">{cert.name}</h4>
                <p className="text-muted-foreground text-sm mt-1">{cert.issuer}</p>
                <p className="text-accent text-xs mt-1">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;