import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Briefcase, Award, Download, ExternalLink } from "lucide-react";

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
    year: "2021 - 2025",
    description: "Graduated with focus on web development and software engineering.",
  },
   {
    degree: "San Miguel National Highschool",
    school: "San Miguel Bulacan",
    year: "2014 - 2020",
  },
  {
    degree: "San Miguel South Central Elementary School",
    school: "San Miguel Bulacan",
    year: "2008 - 2014",
  }
];

const workExperience = [
  {
    title: "Front-End Developer",
    company: "RBS Software Solutions",
    period: "2025 - 2026",
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
    period: "2025 (2 months)",
    responsibilities: [
      "Provided technical support for computer hardware and software",
      "Assisted with network troubleshooting and maintenance",
      "Managed inventory of IT equipment",
    ],
  },
];

// const certifications = [
//   {
//     name: "Responsive Web Design",
//     issuer: "freeCodeCamp",
//     year: "2023",
//   },
//   {
//     name: "JavaScript Algorithms and Data Structures",
//     issuer: "freeCodeCamp",
//     year: "2023",
//   },
// ];

// ==========================================
// END OF EDITABLE DATA
// ==========================================

const ResumeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resume" className="section-padding relative overflow-hidden bg-secondary/20">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-medium text-accent uppercase tracking-wider mb-6">
            My Background
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-light">Resume</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A summary of my education, experience, and certifications.
          </p>
          
          {/* Download Button */}
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary inline-flex"
          >
            <Download size={18} />
             <a
                href="https://drive.google.com/uc?export=download&id=1vcA9qBdM4eW8iPPK0Ay2IY4Vpz5zgW6B"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download CV
            </a>
          </motion.a>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Education
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="card-dark p-6 border-l-2 border-blue-500"
                >
                  <h4 className="font-semibold text-foreground text-lg mb-1">{edu.degree}</h4>
                  <p className="text-blue-400 font-medium text-sm mb-1">{edu.school}</p>
                  <p className="text-muted-foreground text-sm mb-3">{edu.year}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Work Experience */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Work Experience
              </h3>
            </div>

            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <motion.div
                  key={job.title + job.company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="card-dark p-6 border-l-2 border-green-500"
                >
                  <h4 className="font-semibold text-foreground text-lg mb-1">{job.title}</h4>
                  <p className="text-green-400 font-medium text-sm mb-1">{job.company}</p>
                  <p className="text-muted-foreground text-sm mb-3">{job.period}</p>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-1">›</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-5xl mx-auto mt-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Award className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">
              Certifications
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="card-dark p-5 border-l-2 border-amber-500 group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-1">{cert.name}</h4>
                    <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                    <p className="text-amber-400 text-xs mt-2 font-medium">{cert.year}</p>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-amber-400 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default ResumeSection;
